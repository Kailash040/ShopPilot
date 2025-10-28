import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthStatus } from './store/authSlice';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Order from './pages/Order';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  useEffect(() => {
    store.dispatch(checkAuthStatus());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              } 
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/signin" replace />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
