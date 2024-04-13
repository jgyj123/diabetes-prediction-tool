import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [polyuria, setPolyuria] = useState("");
  const [polydipsia, setPolydipsia] = useState("");
  const [suddenWeightLoss, setSuddenWeightLoss] = useState("");
  const [weakness, setWeakness] = useState("");
  const [polyphagia, setPolyphagia] = useState("");
  const [visualBlurring, setVisualBlurring] = useState("");
  const [itching, setItching] = useState("");
  const [irritability, setIrritability] = useState("");
  const [muscleStiffness, setMuscleStiffness] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bmi =
      weight && height ? (weight / (height / 100) ** 2).toFixed(2) : "";

    const formData = {
      age,
      gender,
      bmi,
      polyuria,
      polydipsia,
      suddenWeightLoss,
      weakness,
      polyphagia,
      visualBlurring,
      itching,
      irritability,
      muscleStiffness,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/results", {
          state: {
            results: data,
          },
        });
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
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
          <label>Do you urinate more than 8 times per day?</label>
          <select
            value={polyuria}
            onChange={(e) => setPolyuria(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Do you feel more thirsty than usual?</label>
          <select
            value={polydipsia}
            onChange={(e) => setPolydipsia(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>
            Have you experienced any unexplained weight loss recently?
          </label>
          <select
            value={suddenWeightLoss}
            onChange={(e) => setSuddenWeightLoss(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Do you feel more tired/weak than usual?</label>
          <select
            value={weakness}
            onChange={(e) => setWeakness(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>
            Do you find yourself feeling hungry more often than usual?
          </label>
          <select
            value={polyphagia}
            onChange={(e) => setPolyphagia(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>
            Have you noticed any sudden changes in your vision, such as
            blurring?
          </label>
          <select
            value={visualBlurring}
            onChange={(e) => setVisualBlurring(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>
            Do you often find yourself itching without an apparent cause?
          </label>
          <select value={itching} onChange={(e) => setItching(e.target.value)}>
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Do you find yourself getting more irritated than usual?</label>
          <select
            value={irritability}
            onChange={(e) => setIrritability(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Are you experiencing muscle stiffness?</label>
          <select
            value={muscleStiffness}
            onChange={(e) => setMuscleStiffness(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
