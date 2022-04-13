import DataTable from "./pages/dataTable";
import "./App.css";
import { createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuthentication } from "./components/hook/useAuthentication";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import ForgotPassword from "./pages/forgotPassword";
import HomePage from "./pages/home";
import AuthContainer from "components/context/authContext/AuthContainer";
import UserProvider from "components/context/userContext/UserContainer";
import RegisterProvider from "components/context/registerContext/RegisterContainer";

export const UserDataContext = createContext([]);

const ProtectedRoute = ({ children }: any) => {
  const { authData } = useAuthentication();
  if (!authData) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const ProtectedRouteloggedIn = ({ children }: any) => {
  const { authData } = useAuthentication();
  if (authData) {
    return <Navigate to="/users/list" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthContainer>
      <RegisterProvider>
        <div className="App">
          <UserProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/forgot/password" element={<ForgotPassword />} />
                <Route
                  path="/users/list"
                  element={
                    <ProtectedRoute>
                      <DataTable />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <ProtectedRouteloggedIn>
                      <LoginPage />
                    </ProtectedRouteloggedIn>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <ProtectedRouteloggedIn>
                      <RegisterPage />
                    </ProtectedRouteloggedIn>
                  }
                />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                {/* <Route
                path="/users/list"
                element={
                  <ProtectedRoute token={token}>
                    <DataTable />
                  </ProtectedRoute>
                }
              /> */}
              </Routes>
            </Router>
          </UserProvider>
        </div>
      </RegisterProvider>
    </AuthContainer>
  );
}

export default App;
