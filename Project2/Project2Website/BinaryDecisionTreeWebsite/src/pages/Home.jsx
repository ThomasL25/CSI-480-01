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


function findMatchingStateKey(featureName, stateData) {
  if (!stateData) return null;
  if (featureName in stateData) return featureName;

  const normFeature = featureName.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const key of Object.keys(stateData)) {
    const normKey = String(key).toLowerCase().replace(/[^a-z0-9]/g, "");
    if (normKey === normFeature) return key;
  }
  return null;
}

function Home() {
  const [model, setModel] = useState(null);
  const [stateDataMap, setStateDataMap] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [currentDeaths, setCurrentDeaths] = useState("");
  const [errors, setErrors] = useState({});
  const [prediction, setPrediction] = useState(null);

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

  const jurisPrefix = "Jurisdiction of Occurrence_";
  const jurisdictions = model
    ? model.feature_names
        .filter((f) => f.startsWith(jurisPrefix))
        .map((f) => f.replace(jurisPrefix, ""))
        .sort()
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
    if (!model || !stateDataMap) {
      setErrors({ general: "Model or state data not loaded yet. Please wait." });
      return;
    }

    const stateRecord = stateDataMap[selectedState];
    if (!stateRecord) {
      setErrors({ state: "Selected state not found in dataset." });
      return;
    }

    // Build features
    const features = {};
    model.feature_names.forEach((f) => {
      features[f] = 0;
    });

    model.feature_names.forEach((f) => {
      if (f.startsWith(jurisPrefix)) {
        const stateName = f.replace(jurisPrefix, "");
        features[f] = stateName === selectedState ? 1 : 0;
      } else if (f.toLowerCase().includes("all cause")) {
        features[f] = Number(currentDeaths) || 0;
      } else {
        const key = f in stateRecord ? f : findMatchingStateKey(f, stateRecord);
        features[f] = key ? Number(stateRecord[key]) || 0 : 0;
      }
    });

    const result = traverseTree(model.tree, features);
    let predictedClass = Number(result.class);

    // Emergency threshold calculation
    let emergencyLevel = 0;
    if (stateRecord?.baseline?.mean && stateRecord?.baseline?.std) {
      const mean = Number(stateRecord.baseline.mean);
      const std = Number(stateRecord.baseline.std);
      const th = Number(stateRecord.threshold_std ?? 2.0);
      emergencyLevel = mean + th * std;
    } else if (stateRecord?.baseline_mean && stateRecord?.baseline_std) {
      emergencyLevel = stateRecord.baseline_mean + (stateRecord.threshold_std ?? 2.0) * stateRecord.baseline_std;
    } else {
      emergencyLevel = Math.max(Number(currentDeaths) * 2, 100);
    }

    // Override becuase tree is being funky, remove later
    if (Number(currentDeaths) >= emergencyLevel) predictedClass = 1;

    setPrediction({
      decision: predictedClass === 1 ? "Declare Emergency" : "No Emergency",
      currentDeaths: Number(currentDeaths),
      emergencyLevel,
    });
  };

  const getChartData = () => {
    if (!prediction) return [];
    return [{ name: selectedState || "Selected", deaths: prediction.currentDeaths }];
  };

  const yMax = prediction
    ? Math.max(prediction.emergencyLevel * 1.2, prediction.currentDeaths * 1.2, 100)
    : 1000;

  return (
    <div className="page-container p-6">
      <h1 className="text-2xl font-bold mb-2">Predict State of Emergency Given Weekly Death Count</h1>
      <p className="text-gray-600 mb-6">Enter current deaths and the model will be evaluated client-side.</p>

      <div className="bg-white rounded-2xl shadow p-6 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Make a Prediction</h2>

        {errors.general && <p className="text-red-600 mb-2">{errors.general}</p>}

        <label className="block font-medium mb-1">State</label>
        <select
          className="w-full border rounded p-2 mb-2"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value.trim())}
        >
          <option value="">-- Select a state --</option>
          {jurisdictions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.state && <p className="text-red-500 text-sm mb-2">{errors.state}</p>}

        <label className="block font-medium mb-1">Current Deaths (this week)</label>
        <input
          type="number"
          step="1"
          min="0"
          value={currentDeaths}
          onChange={(e) => setCurrentDeaths(e.target.value.replace(/[^0-9.]/g, ""))}
          className="w-full border rounded p-2 mb-2"
        />
        {errors.currentDeaths && <p className="text-red-500 text-sm mb-2">{errors.currentDeaths}</p>}

        <button onClick={handlePredict} className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl">
          Predict
        </button>

        {prediction && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-lg mb-2">Prediction Result</h3>
            <p>
              <strong>Decision:</strong>{" "}
              <span className={prediction.decision === "Declare Emergency" ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
                {prediction.decision}
              </span>
            </p>

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
                  <ReferenceLine
                    y={prediction.emergencyLevel}
                    stroke="red"
                    strokeDasharray="4 4"
                    label={{
                      value: `Emergency Threshold (${Math.round(prediction.emergencyLevel)})`,
                      position: "right",
                      fill: "red",
                      fontSize: 12,
                    }}
                  />
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