import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  LabelList,
} from "recharts";

function Home() {
  const [model, setModel] = useState(null);
  const [stateDataMap, setStateDataMap] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [currentDeaths, setCurrentDeaths] = useState("");
  const [categoryDeaths, setCategoryDeaths] = useState({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errors, setErrors] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [modelRes, stateRes] = await Promise.all([
          fetch("/model_tree.json"),
          fetch("/emergency_decision_all.json"),
        ]);

        if (!modelRes.ok || !stateRes.ok) {
          throw new Error("One or more JSON files failed to load");
        }

        const modelJson = await modelRes.json();
        const stateJson = await stateRes.json();

        setModel(modelJson);
        setStateDataMap(stateJson.Emergency_decion_all || stateJson);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const jurisdictions = model?.states ? Object.keys(model.states).sort() : [];

  const traverseTree = (node, features) => {
    if (!node) return { class: 0, prob: [1, 0] };
    if (node.node_type === "leaf") return { class: node.class, prob: node.prob || [1, 0] };
    const featureValue = Number(features[node.feature] ?? 0);
    return featureValue <= node.threshold ? traverseTree(node.left, features) : traverseTree(node.right, features);
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedState) newErrors.state = "Please select a state.";
    if (!showAdvanced) {
      if (currentDeaths === "" || isNaN(currentDeaths)) {
        newErrors.currentDeaths = "Please enter a valid number of deaths.";
      } else if (Number(currentDeaths) < 0) {
        newErrors.currentDeaths = "Deaths cannot be negative.";
      }
    } else {
      const stateModel = model?.states?.[selectedState];
      const catNames = stateModel?.multi_category?.feature_names || [];
      const missing = catNames.some(
        (name) =>
          categoryDeaths[name] === "" ||
          categoryDeaths[name] === undefined ||
          isNaN(Number(categoryDeaths[name]))
      );
      if (missing) newErrors.advanced = "Please fill in all advanced fields.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePredict = () => {
    if (!validate()) return;
    if (!model?.states?.[selectedState]) {
      setErrors({ general: "Model not loaded or state unavailable." });
      return;
    }

    const stateModel = model.states[selectedState];
    const stateStats = stateDataMap?.[selectedState] || {};

    const useAdvanced = showAdvanced;

    const activeModel = useAdvanced ? stateModel.multi_category : stateModel.total_only;

    const features = {};
    if (useAdvanced) {
      activeModel.feature_names.forEach((name) => {
        features[name] = Number(categoryDeaths[name] || 0);
      });
    } else {
      features["All Cause"] = Number(currentDeaths) || 0;
    }

    const result = traverseTree(activeModel.tree, features);
    const modelPredClass = Number(result.class);
    const modelProb = result.prob && result.prob[modelPredClass] ? result.prob[modelPredClass] * 100 : 100;

    const mean = stateStats["All Cause_mean"] ?? 0;
    const std = stateStats["All Cause_std"] ?? 1;
    const thresholdPercent = stateStats.threshold_percent ?? 0.2;
    const emergencyThreshold = mean + std * thresholdPercent;

    let totalDeathsForChart = Number(currentDeaths) || 0;
    if (useAdvanced) {
      totalDeathsForChart = Object.values(features).reduce((acc, v) => acc + Number(v || 0), 0);
    }

    const modelPredictsEmergency = modelPredClass === 1;
    const totalPredictsEmergency = totalDeathsForChart > emergencyThreshold;

    const z = std > 0 ? (totalDeathsForChart - emergencyThreshold) / std : totalDeathsForChart - emergencyThreshold;
    const totalProbFromTotal =
      Math.round((1 / (1 + Math.exp(-z))) * 100);

    const finalDecisionIsEmergency = modelPredictsEmergency || totalPredictsEmergency;
    const finalProbability = Math.max(Math.round(modelProb), totalProbFromTotal);

    const modelTypeLabel = useAdvanced
      ? modelPredictsEmergency
        ? "multi_category"
        : totalPredictsEmergency
        ? "multi_category (total override)"
        : "multi_category"
      : "total_only";

    setPrediction({
      decision: finalDecisionIsEmergency ? "Declare Emergency" : "No Emergency",
      currentDeaths: totalDeathsForChart,
      emergencyThreshold,
      modelType: modelTypeLabel,
      probability: finalProbability,
    });
  };

  const getChartData = () => {
    if (!prediction) return [];
    return [{ name: selectedState || "Selected", deaths: prediction.currentDeaths }];
  };

  const yMax = prediction
    ? Math.max((prediction.emergencyThreshold ?? 0) * 1.2, prediction.currentDeaths * 1.2, 100)
    : 1000;

  const renderAdvancedInputs = () => {
    if (!selectedState || !model?.states?.[selectedState]?.multi_category) return null;

    const catNames = model.states[selectedState].multi_category.feature_names || [];

    return (
      <div className="mt-4 border-t pt-3">
        <h3 className="font-semibold mb-2">Category Deaths</h3>
        <p className="text-sm text-red-600 mb-2">All fields are required for advanced prediction.</p>
        {catNames.map((name) => (
          <div key={name} className="mb-2">
            <label className="block text-sm">{name}</label>
            <input
              type="number"
              step="1"
              min="0"
              value={categoryDeaths[name] || ""}
              onChange={(e) =>
                setCategoryDeaths({
                  ...categoryDeaths,
                  [name]: e.target.value.replace(/[^0-9.]/g, ""),
                })
              }
              className="w-full border rounded p-1"
            />
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="p-6 text-gray-600">Loading model data...</div>;
  }

  return (
    <div className="page-container p-6">
      <h1 className="text-2xl font-bold mb-2">Predict State of Emergency Given Weekly Death Count</h1>
      <p className="text-gray-600 mb-6">Enter current deaths and the model will be evaluated client-side.</p>

      <div className="bg-white rounded-2xl shadow p-6 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Make a Prediction</h2>

        {errors.general && <p className="text-red-600 mb-2">{errors.general}</p>}

        <label>State</label>
        <div className="flex items-center mb-2">
          <select
            className="flex-grow border rounded p-2 mr-2"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value.trim())}
          >
            <option value="">-- Select a state --</option>
            {jurisdictions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button onClick={() => setShowAdvanced(!showAdvanced)} className="text-sm text-blue-600 underline">
            {showAdvanced ? "Hide Advanced Settings" : "Show Advanced Settings"}
          </button>
        </div>

        {errors.state && <p className="text-red-500 text-sm mb-2">{errors.state}</p>}

        {!showAdvanced && (
          <>
            <label>Current Deaths (this week)</label>
            <input
              type="number"
              step="1"
              min="0"
              value={currentDeaths}
              onChange={(e) => setCurrentDeaths(e.target.value.replace(/[^0-9.]/g, ""))}
              className="w-full border rounded p-2 mb-2"
            />
            {errors.currentDeaths && <p className="text-red-500 text-sm mb-2">{errors.currentDeaths}</p>}
          </>
        )}

        {showAdvanced && selectedState && model?.states?.[selectedState] ? renderAdvancedInputs() : showAdvanced && (
          <p className="text-sm text-gray-500 mt-2">Please select a state first to load category inputs.</p>
        )}

        {errors.advanced && <p className="text-red-500 text-sm mb-2">{errors.advanced}</p>}

        <button
          onClick={handlePredict}
          className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg py-3 rounded-2xl shadow-lg transition-transform transform hover:scale-[1.02]"
        >
          Predict
        </button>

        {prediction && (
          <div className="mt-6 border-t pt-4">
            <h3>Prediction Result</h3>
            <p>
              <strong>Decision:</strong>{" "}
              <span
                className={
                  prediction.decision === "Declare Emergency"
                    ? "text-red-600 font-semibold"
                    : "text-green-600 font-semibold"
                }
              >
                {prediction.decision}
              </span>{" "}
              <span className="text-sm text-gray-500">
                ({prediction.modelType === "multi_category" ? "Multi-Category Model" : "Total-Only Model"})
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-1">Probability: {prediction.probability}% confidence</p>

            <div className="mt-4">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={getChartData()} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, yMax]} />
                  <Tooltip />
                  <Bar
                    dataKey="deaths"
                    fill={prediction.decision === "Declare Emergency" ? "#ef4444" : "#3b82f6"}
                    radius={[8, 8, 0, 0]}
                  >
                    <LabelList dataKey="deaths" position="top" />
                  </Bar>
                  {prediction.emergencyThreshold && (
                    <ReferenceLine
                      y={prediction.emergencyThreshold}
                      stroke="red"
                      strokeDasharray="4 4"
                      label={{
                        value: `Emergency Threshold (${Math.round(prediction.emergencyThreshold)})`,
                        position: "right",
                        fill: "red",
                        fontSize: 12,
                      }}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-gray-500 text-sm mt-3">
              Disclaimer: This tool provides a data-driven illustration only and should not be interpreted as medical or public health advice.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;