import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import SupplierPage from "./pages/Supplier/SupplierPage";
import React from "react";
import { Navigate } from "react-router-dom";

import DemoPage from "./pages/Inventory/InventoryPage";
// @ts-expect-error tserror
import LoginPage from "./pages/login/LoginPage";
// @ts-expect-error tserror
import Product from "./pages/Product/Product";
import "./App.css";

// const AuthContext = createContext();

// export const AuthProvider = ({
//   children,
// }: {
//   children: React.ReactElement;
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = () => setIsAuthenticated(true);
//   const logout = () => setIsAuthenticated(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              // <PrivateRoute>
              <DemoPage />
              // </PrivateRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="product" element={<Product />} />
          <Route path="supplier" element={<SupplierPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
