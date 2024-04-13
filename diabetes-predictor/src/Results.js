import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Results() {
  const location = useLocation();
  const [riskLevel, setRiskLevel] = useState("");
  const [riskColor, setRiskColor] = useState("");
  const [prediction, setPrediction] = useState(0);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    if (location.state) {
      const results = location.state["results"];
      console.log(results);
      const probability = results["full_probability_distribution"][1] * 100;
      setConfidence(probability);
      setPrediction(results["prediction"]);

      if (probability > 66) {
        setRiskLevel("High Risk");
        setRiskColor("#ff6347");
      } else if (probability > 33) {
        setRiskLevel("Moderate Risk");
        setRiskColor("#ffd700");
      } else {
        setRiskLevel("Low Risk");
        setRiskColor("#32cd32");
      }
    }
  }, [location.state]);

  const factorExplanations = {
    BMI: "BMI is a key indicator of body fat based on an individual's weight relative to their height. Higher BMI can indicate obesity, significantly increasing the risk for type 2 diabetes.",
    Polyuria:
      "Frequent urination is a common symptom where the body tries to rid excess glucose by producing more urine. This is typical when diabetes is poorly managed.",
    Polydipsia:
      "Excessive thirst, often accompanying frequent urination. As the body loses more fluids, the need to replenish water due to dehydration triggers increased thirst.",
    "Sudden Weight Loss":
      "Unexplained rapid weight loss can be an early sign of diabetes, especially type 1, due to fat and muscle being used for energy.",
    Weakness:
      "Inadequate glucose supply to cells causes fatigue, a common symptom of diabetes.",
    Polyphagia:
      "Increased hunger, particularly after eating, can indicate diabetes. It stems from the body's inability to use glucose effectively.",
    "Visual Blurring":
      "Vision can be temporarily blurred due to high blood sugar levels, which cause fluid levels in the eyes to fluctuate.",
    Itching:
      "Poor blood circulation and dehydration from frequent urination can cause dry skin and itching.",
    Irritability:
      "Glucose level fluctuations can impact mood, leading to irritability and quick temperament changes.",
    "Muscle Stiffness":
      "Diabetes can affect blood flow and nerve function, leading to muscle stiffness.",
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "600px", // max width for the content
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1>Diabetes Risk Prediction Results</h1>
      <div style={{ marginTop: "20px", fontSize: "20px" }}>
        You are at:{" "}
        <span
          style={{
            color: riskColor,
          }}
        >
          <strong>{riskLevel}</strong>
        </span>{" "}
        of having diabetes.
      </div>
      <div style={{ marginTop: "20px", width: "100%" }}>
        <div style={{ fontWeight: "bold" }}>
          Probability: {confidence.toFixed(2)}%
        </div>
        <div
          style={{
            height: "30px",
            width: "100%",
            backgroundColor: "#ddd",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${confidence}%`,
              backgroundColor: riskColor,
              textAlign: "center",
              lineHeight: "30px",
              color: "white",
            }}
          >
            {riskLevel}
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#f7f7f7",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          textAlign: "left", // Align text to the left inside the cards
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333" }}>
          Factors Explained
        </h2>
        {Object.entries(factorExplanations).map(([factor, description]) => (
          <div
            key={factor}
            style={{
              backgroundColor: "white",
              margin: "10px 0",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <strong style={{ color: "#0056b3", fontSize: "16px" }}>
              {factor}:
            </strong>
            <span
              style={{ marginLeft: "10px", fontSize: "14px", color: "#666" }}
            >
              {description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
