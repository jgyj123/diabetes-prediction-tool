from datetime import datetime
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from pgmpy.models import BayesianNetwork
from pgmpy.estimators import MaximumLikelihoodEstimator
from pgmpy.inference import VariableElimination

app = Flask(__name__)

# Define your Bayesian Network structure
model_structure = BayesianNetwork([
    ('Polyuria', 'class'), ('Polyuria', 'Polydipsia'), ('Polydipsia', 'weakness'),
    ('sudden weight loss', 'Obesity'), ('weakness', 'sudden weight loss'),
    ('Polyphagia', 'Polyuria'), ('Polyphagia', 'Age >= 60'), ('visual blurring', 'Itching'),
    ('visual blurring', 'Age >= 60'), ('visual blurring', 'Polydipsia'), ('Itching', 'weakness'),
    ('Irritability', 'Obesity'), ('muscle stiffness', 'visual blurring'), ('muscle stiffness', 'Polyphagia'),
    ('class', 'Polydipsia'), ('class', 'sudden weight loss'), ('class', 'Gender'),
    ('class', 'visual blurring'), ('class', 'Irritability'), ('class', 'Itching'),
    ('Age >= 60', 'Irritability')
])

train_data = pd.read_csv("diabetes_data_new_features.csv")
model = model_structure
model.fit(train_data, estimator=MaximumLikelihoodEstimator)
inference = VariableElimination(model)

def map_binary(input_value):
    return 1 if input_value.lower() == 'yes' else 0

def preprocess_input(data):
    processed_data = {}
    # Mapping the input data with the correct capitalization
    field_mappings = {
        'gender': 'Gender',
        'polyuria': 'Polyuria',
        'polydipsia': 'Polydipsia',
        'suddenweightloss': 'sudden weight loss',
        'weakness': 'weakness',
        'polyphagia': 'Polyphagia',
        'visualblurring': 'visual blurring',
        'itching': 'Itching',
        'irritability': 'Irritability',
        'musclestiffness': 'muscle stiffness',
        'age': 'Age',
        'bmi': 'Obesity'
    }

    # Convert all keys and values as needed
    for key, value in data.items():
        normalized_key = key.replace(" ", "").lower()
        if normalized_key in field_mappings:
            new_key = field_mappings[normalized_key]
            if isinstance(value, str) and value.lower() in ['yes', 'no']:
                processed_data[new_key] = map_binary(value)
            elif new_key == 'Gender':
                processed_data[new_key] = 1 if value.lower() == 'male' else 0
            elif new_key == 'Age':
                processed_data['Age >= 60'] = 1 if int(value) >= 60 else 0
            elif new_key == 'Obesity':
                processed_data['Obesity'] = 1 if float(value) >= 30 else 0
            else:
                processed_data[new_key] = value

    return processed_data

@app.route('/predict', methods=['POST'])

def predict():
    data = request.get_json()
    data = preprocess_input(data)

    df = pd.DataFrame([data])
    evidence = df.iloc[0].to_dict()

    try:
        # Using query to obtain probability distribution for the 'class'
        query_result = inference.query(variables=['class'], evidence=evidence)
        
        # Extracting probability values and associated class labels
        class_labels = query_result.state_names['class']
        probabilities = query_result.values
        
        # Ensure class labels are Python native data types (not numpy types)
        class_labels = [str(label) if isinstance(label, np.generic) else label for label in class_labels]

        # Ensure probabilities are Python native floats
        probabilities = [float(prob) if isinstance(prob, np.generic) else prob for prob in probabilities.flatten()]

        # Constructing a dictionary with class labels and their corresponding probabilities
        probability_distribution = dict(zip(class_labels, probabilities))
        
        # Find the class with the maximum probability
        predicted_class = max(probability_distribution, key=probability_distribution.get)
        max_probability = probability_distribution[predicted_class]

        return jsonify({
            'prediction': predicted_class,
            'confidence': max_probability,
            'full_probability_distribution': probability_distribution
        })
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
