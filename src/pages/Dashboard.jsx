import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { signOut } from '../store/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to Dashboard, {user?.name || 'User'}!
          </h1>
          <Button
            variant="secondary"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Dashboard Content
          </h2>
          <p className="text-gray-600">
            This is your dashboard. You are successfully authenticated!
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">User Information:</h3>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>ID:</strong> {user?.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
