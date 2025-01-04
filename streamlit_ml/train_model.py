import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np
import pickle

# Load data
file_path = 'Inventory_DataSet.xlsx'
data = pd.ExcelFile(file_path)
df = data.parse('Sheet1')

# Preprocessing
df['Order Date'] = pd.to_datetime(df['Order Date'], errors='coerce')
df['Month'] = df['Order Date'].dt.month

# Aggregate monthly demand
monthly_demand = (
    df.groupby(['Month', 'Product Category Name', 'ProductName'])
    .agg({'Quantity': 'sum'})
    .reset_index()
)

# Pivot data to create a time-series structure
pivoted_demand = monthly_demand.pivot_table(
    index=['Product Category Name', 'ProductName'],
    columns='Month',
    values='Quantity',
    fill_value=0
).reset_index()

pivoted_demand.columns.name = None
pivoted_demand.rename(columns=lambda x: f"Month_{int(x)}" if isinstance(x, (int, float)) else x, inplace=True)

# Add lag features
for month in range(2, 13):
    pivoted_demand[f"Lag_Month_{month}"] = pivoted_demand.get(f"Month_{month - 1}", 0)

# Prepare data for training
unpivoted_data = pivoted_demand.melt(
    id_vars=['Product Category Name', 'ProductName'],
    value_vars=[col for col in pivoted_demand.columns if col.startswith('Month_') and not col.startswith('Lag_')],
    var_name="Month",
    value_name="Quantity"
)

for month in range(2, 13):
    lag_col = f"Lag_Month_{month}"
    unpivoted_data[lag_col] = unpivoted_data.apply(
        lambda x: pivoted_demand.loc[
            (pivoted_demand['Product Category Name'] == x['Product Category Name']) &
            (pivoted_demand['ProductName'] == x['ProductName']),
            lag_col
        ].values[0] if lag_col in pivoted_demand.columns else 0,
        axis=1
    )

unpivoted_data.dropna(inplace=True)
unpivoted_data['Month'] = unpivoted_data['Month'].str.extract(r'(\d+)').astype(int)

X = unpivoted_data[['Month'] + [f"Lag_Month_{i}" for i in range(2, 13)]]
y = unpivoted_data['Quantity']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
print(f"Mean Absolute Error: {mae}")
print(f"Root Mean Squared Error: {rmse}")

# Save the model
with open("inventory_model.pkl", "wb") as f:
    pickle.dump(model, f)

# Save preprocessed data
unpivoted_data.to_csv("preprocessed_inventory_data.csv", index=False)
print("Model and data saved successfully!")
