import streamlit as st
import pandas as pd
import pickle

# Load model and data
with open("inventory_model.pkl", "rb") as f:
    model = pickle.load(f)

data_path = "preprocessed_inventory_data.csv"
unpivoted_data = pd.read_csv(data_path)

# Month mapping
month_mapping = {
    "January": 1, "February": 2, "March": 3, "April": 4,
    "May": 5, "June": 6, "July": 7, "August": 8,
    "September": 9, "October": 10, "November": 11, "December": 12,
}

# Streamlit app
st.title("Inventory Prediction Dashboard")
st.sidebar.header("Select Input")

# Dropdown for month selection (show month names)
selected_month = st.sidebar.selectbox("Select a Month", list(month_mapping.keys()))

if st.sidebar.button("Predict"):
    # Map selected month to its numeric value
    month = month_mapping[selected_month]
    
    # Filter data for the selected month
    future_data = unpivoted_data[unpivoted_data['Month'] == month]
    
    # Predict demand
    future_data['Predicted_Quantity'] = model.predict(
        future_data[['Month'] + [f"Lag_Month_{i}" for i in range(2, 13)]]
    )
    
    # Extract top category and top 3 products
    top_category = future_data.groupby('Product Category Name').agg({'Predicted_Quantity': 'sum'}).idxmax().values[0]
    top_products = (
        future_data[future_data['Product Category Name'] == top_category]
        .nlargest(3, 'Predicted_Quantity')[['ProductName', 'Predicted_Quantity']]
        .reset_index(drop=True)
    )
    
    # Display results
    st.subheader(f"Top Product Category for {selected_month}: **{top_category}**")
    st.write("Top 3 Products:")
    st.table(top_products)
