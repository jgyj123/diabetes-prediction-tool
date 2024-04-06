import React, { useState } from "react";
import "./App.css";

function App() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [polyuria, setPolyuria] = useState("");
  const [suddenWeightLoss, setSuddenWeightLoss] = useState("");
  const [visualBlurring, setVisualBlurring] = useState("");
  const [itching, setItching] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const bmi =
      weight && height ? (weight / (height / 100) ** 2).toFixed(2) : "";
    // Process form data here, including BMI calculation
    console.log({
      age,
      gender,
      bmi,
      polyuria,
      suddenWeightLoss,
      visualBlurring,
      itching,
    });
    // Place logic to submit these details for prediction
  };

  return (
    <div className="App">
      <h1>Diabetes Risk Prediction Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
          />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Height (in cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height in cm"
          />
        </div>
        <div>
          <label>Weight (in kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight in kg"
          />
        </div>
        <div>
          <label>Polyuria:</label>
          <select
            value={polyuria}
            onChange={(e) => setPolyuria(e.target.value)}
          >
            <option value="">Have you experienced frequent urination?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Sudden Weight Loss:</label>
          <select
            value={suddenWeightLoss}
            onChange={(e) => setSuddenWeightLoss(e.target.value)}
          >
            <option value="">Have you experienced sudden weight loss?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Visual Blurring:</label>
          <select
            value={visualBlurring}
            onChange={(e) => setVisualBlurring(e.target.value)}
          >
            <option value="">Have you experienced visual blurring?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Itching:</label>
          <select value={itching} onChange={(e) => setItching(e.target.value)}>
            <option value="">Have you experienced itching?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
