import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthDebug() {
  const { user, token, isLoading, isAuthenticated, refreshAuth } = useAuth();

//   if (process.env.NODE_ENV !== 'development') {
//     return null;
//   }

  const savedToken = localStorage.getItem('admin_token');

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-xs max-w-xs z-50">
      <div className="font-bold mb-2">Auth Debug</div>
      <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
      <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
      <div>Context Token: {token ? 'Present' : 'None'}</div>
      <div>Storage Token: {savedToken ? 'Present' : 'None'}</div>
      <div>User: {user ? `${user.firstName} ${user.lastName}` : 'None'}</div>
      <div>Role: {user?.role || 'None'}</div>
      <div className="mt-2 space-y-1">
        <button 
          onClick={refreshAuth}
          className="w-full px-2 py-1 bg-blue-600 rounded text-xs hover:bg-blue-700"
        >
          Refresh Auth
        </button>
        <button 
          onClick={() => {
            localStorage.removeItem('admin_token');
            window.location.reload();
          }}
          className="w-full px-2 py-1 bg-red-600 rounded text-xs hover:bg-red-700"
        >
          Clear & Reload
        </button>
        <button 
          onClick={() => {
            console.log('=== AUTH DEBUG ===');
            console.log('Context state:', { user, token: !!token, isLoading, isAuthenticated });
            console.log('LocalStorage token:', savedToken);
            console.log('==================');
          }}
          className="w-full px-2 py-1 bg-green-600 rounded text-xs hover:bg-green-700"
        >
          Log State
        </button>
      </div>
    </div>
  );
}
