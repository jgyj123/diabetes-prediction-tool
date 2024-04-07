import numpy as np
import pandas as pd

from sklearn.preprocessing import LabelEncoder

df = pd.read_csv("diabetes_data.csv")
df.drop(columns=['Polydipsia', 'weakness', 'Polyphagia', 'Genital thrush', 'Irritability', 'delayed healing', 'partial paresis', 'muscle stiffness', 'Alopecia'], inplace=True)

df['Age > 45'] = df['Age'] > 45
df.drop(columns=['Age'], inplace=True)

label_encoder = LabelEncoder()

df['Age > 45'] = label_encoder.fit_transform(df['Age > 45'])
df['Gender'] = label_encoder.fit_transform(df['Gender'])
df['Polyuria'] = label_encoder.fit_transform(df['Polyuria'])
df['sudden weight loss'] = label_encoder.fit_transform(df['sudden weight loss'])
df['visual blurring'] = label_encoder.fit_transform(df['visual blurring'])
df['Itching'] = label_encoder.fit_transform(df['Itching'])
df['Obesity'] = label_encoder.fit_transform(df['Obesity'])
df['class'] = label_encoder.fit_transform(df['class'])

df.columns = ['Age > 45', 'Gender', 'Polyuria', 'sudden weight loss', 'visual blurring', 'Itching', 'Obesity', 'class']

df.to_csv("diabetes_data_cleaned.csv", index=False)