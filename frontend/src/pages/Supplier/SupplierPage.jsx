import React from "react";

const SupplierPage = () => {
  return (
    <main>
      <section className="history-container">
        <h1>Supplier Order History</h1>

        <table className="history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Supplier ID</th>
              <th>Product ID</th>
              <th>Order Date</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="history-entries">
            <tr>
              <td>1</td>
              <td>101</td>
              <td>301</td>
              <td>2024-12-20</td>
              <td>100</td>
              <td className="status-completed">Completed</td>
            </tr>
            <tr>
              <td>2</td>
              <td>102</td>
              <td>302</td>
              <td>2024-12-18</td>
              <td>50</td>
              <td className="status-pending">Pending</td>
            </tr>
            <tr>
              <td>3</td>
              <td>103</td>
              <td>303</td>
              <td>2024-12-10</td>
              <td>200</td>
              <td className="status-overdue">Overdue</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default SupplierPage;
