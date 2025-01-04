import { Route, Routes } from "react-router-dom";
import Inventory from "./pages/Inventory";
import History from "./pages/History.jsx";
import Product from "./pages/Product.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Supplier from "./pages/Supplier.jsx";
import Users from "./pages/Users.jsx";
import "./App.css";

function App() {
  return (
    <div className="p-2">
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/history" element={<History />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
