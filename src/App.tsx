import React from 'react';
import SignUp from './components/SignUp';
import './styles/Reset.scss';
import './styles/App.scss';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import NotFound404 from './components/NotFound404';
import PrivateRoute from './hoc/PrivateRoute';
import UpdateProfile from './components/UpdateProfile';
import PublicRoute from './hoc/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Root goes to dashboard  */}
            {/* <Route path="/" element={
              //https://ui.dev/react-router-protected-routes-authentication/
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } /> */}
            <Route path="/dashboard" element={
              //https://ui.dev/react-router-protected-routes-authentication/
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/update-profile" element={
              //https://ui.dev/react-router-protected-routes-authentication/
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/forgot-password" element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            } />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
