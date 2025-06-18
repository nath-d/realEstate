import React from 'react';
import PropertyManagement from './PropertyManagement';

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-full mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <PropertyManagement />
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 