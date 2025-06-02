import React from 'react';

const DUMMY_UPI_ID = 'nitishkumar123@upi';

const Payment: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-xl bg-gray-50 text-center">
      <h2 className="text-2xl font-semibold mb-6">Pay via UPI</h2>
      {/* Dummy QR Scanner */}
      <div className="inline-block p-4 bg-white rounded-lg shadow mb-4">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <rect width="180" height="180" rx="16" fill="#e0e0e0" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            fontSize="18"
            fill="#888"
          >
            Dummy QR
          </text>
        </svg>
      </div>
      <div className="mt-6">
        <div className="text-lg font-medium mb-1">UPI ID:</div>
        <div className="text-base bg-gray-100 px-3 py-2 rounded-md inline-block mb-2">
          {DUMMY_UPI_ID}
        </div>
        <div className="text-gray-600 text-sm mt-2">Nitish Kumar -m</div>
      </div>
    </div>
  );
};

export default Payment;
