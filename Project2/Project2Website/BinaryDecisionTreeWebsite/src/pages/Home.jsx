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
  const [errors, setErrors] = useState({});
  const [prediction, setPrediction] = useState(null);

  // Load JSON model and optional data file
  useEffect(() => {
    Promise.all([
      fetch("/model_tree.json").then((r) => r.json()),
      fetch("/emergency_decision_all.json").then((r) => r.json()),
    ])
      .then(([modelJson, stateJson]) => {
        setModel(modelJson);
        setStateDataMap(stateJson);
      })
      .catch((err) => console.error("Error loading JSONs:", err));
  }, []);

  const jurisdictions = model?.states
    ? Object.keys(model.states).sort()
    : stateDataMap
    ? Object.keys(stateDataMap).sort()
    : [];

  const validate = () => {
    const newErrors = {};
    if (!selectedState) newErrors.state = "Please select a state.";
    if (currentDeaths === "" || isNaN(currentDeaths)) {
      newErrors.currentDeaths = "Please enter a valid number of deaths.";
    } else if (Number(currentDeaths) < 0) {
      newErrors.currentDeaths = "Deaths cannot be negative.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const traverseTree = (node, features) => {
    if (!node) return { class: 0 };
    if (node.node_type === "leaf") return { class: node.class };

    const featureValue = Number(features[node.feature] ?? 0);
    return featureValue <= node.threshold
      ? traverseTree(node.left, features)
      : traverseTree(node.right, features);
  };

  const handlePredict = () => {
    if (!validate()) return;
    if (!model) {
      setErrors({ general: "Model not loaded yet. Please wait." });
      return;
    }

    const stateModel = model.states?.[selectedState];
    if (!stateModel) {
      setErrors({
        state: "No model available for this state in model_tree.json.",
      });
      return;
    }

    // Build features and traverse the decision tree
    const features = { "All Cause": Number(currentDeaths) || 0 };
    const result = traverseTree(stateModel.tree, features);
    const predictedClass = Number(result.class);

    // Use the model's threshold directly for display
    const emergencyThreshold = stateModel.tree?.threshold ?? null;

    setPrediction({
      decision: predictedClass === 1 ? "Declare Emergency" : "No Emergency",
      currentDeaths: Number(currentDeaths),
      emergencyThreshold,
    });
  };

  const getChartData = () => {
    if (!prediction) return [];
    return [
      { name: selectedState || "Selected", deaths: prediction.currentDeaths },
    ];
  };

  const yMax = prediction
    ? Math.max(
        (prediction.emergencyThreshold ?? 0) * 1.2,
        prediction.currentDeaths * 1.2,
        100
      )
    : 1000;

  return (
    <div className="page-container p-6">
      <h1 className="text-2xl font-bold mb-2">
        Predict State of Emergency Given Weekly Death Count
      </h1>
      <p className="text-gray-600 mb-6">
        Enter current deaths and the model will be evaluated client-side.
      </p>

      <div className="bg-white rounded-2xl shadow p-6 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Make a Prediction</h2>

        {errors.general && (
          <p className="text-red-600 mb-2">{errors.general}</p>
        )}

        <label className="block font-medium mb-1">State</label>
        <select
          className="w-full border rounded p-2 mb-2"
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
        {errors.state && (
          <p className="text-red-500 text-sm mb-2">{errors.state}</p>
        )}

        <label className="block font-medium mb-1">
          Current Deaths (this week)
        </label>
        <input
          type="number"
          step="1"
          min="0"
          value={currentDeaths}
          onChange={(e) =>
            setCurrentDeaths(e.target.value.replace(/[^0-9.]/g, ""))
          }
          className="w-full border rounded p-2 mb-2"
        />
        {errors.currentDeaths && (
          <p className="text-red-500 text-sm mb-2">{errors.currentDeaths}</p>
        )}

        <button
          onClick={handlePredict}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl"
        >
          Predict
        </button>

        {prediction && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-lg mb-2">Prediction Result</h3>
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
              </span>
            </p>

            <div className="mt-4">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={getChartData()}
                  margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, yMax]} />
                  <Tooltip />
                  <Bar
                    dataKey="deaths"
                    fill={
                      prediction.decision === "Declare Emergency"
                        ? "#ef4444"
                        : "#3b82f6"
                    }
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
                        value: `Emergency Threshold (${Math.round(
                          prediction.emergencyThreshold
                        )})`,
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
              Disclaimer: This tool provides a data-driven illustration only and
              should not be interpreted as medical or public health advice.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;