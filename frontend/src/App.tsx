import { Routes, Route } from "react-router-dom";
import DemoPage from "./pages/Inventory/InventoryPage";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DemoPage />} />
      </Routes>
    </div>
  );
}

export default App;
