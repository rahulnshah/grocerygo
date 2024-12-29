import React from 'react';

const HistoryItem = ({ headline }: { headline: string }) => {
  return (
    <div className="flex items-center p-4 rounded-lg shadow-lg bg-white mt-2">
      <div className="flex-1">
        <p className="text-sm text-gray-500">30 mins ago</p>
        <h3 className="text-lg font-semibold">{headline}</h3>
      </div>
      <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
        Add
      </button>
    </div>
  );
};

export default HistoryItem;
