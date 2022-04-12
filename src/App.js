import DataTable from './pages/dataTable';
import './App.css';
import { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar"
import { RegisterProvider } from "./components/context/register.context"
import { UserProvider } from './components/context/user.context';
import { AuthProvider } from "./components/context/authUser.context";
import { useAuthentication } from "./components/hook/useAuthentication"
import LoginPage from "./pages/loginPage"
import RegisterPage from "./pages/registerPage"
import ForgotPassword from "./pages/forgotPassword";

export const UserDataContext = createContext()

const ProtectedRoute = ({ children }) => {
  const { authData } = useAuthentication()
  if (!authData) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const ProtectedRouteloggedIn = ({ children }) => {
  const { authData } = useAuthentication()
  if (authData) {
    return <Navigate to="/users/list" replace />
  }
  return children
}

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <UserProvider>
          <RegisterProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/forgot/password" element={<ForgotPassword />} />
                <Route
                  path='/users/list'
                  element={
                    <ProtectedRoute>
                      <DataTable />
                    </ProtectedRoute>
                  } />
                <Route
                  path="/login"
                  element={
                    <ProtectedRouteloggedIn>
                      <LoginPage />
                    </ProtectedRouteloggedIn>
                  } />
                <Route
                  path="/register"
                  element={
                    <ProtectedRouteloggedIn>
                      <RegisterPage />
                    </ProtectedRouteloggedIn>
                  } />
                {/* <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                /> */}
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
          </RegisterProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
