'use client';

import { useState } from "react";

interface Props {
  count: number;
}

export default function AssignedItemsNotification({ count }: Props) {
    const [dismissed, setDismissed] = useState(false);
  
    return (
      !dismissed && count > 0 ? (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50">
          <div className="text-gray-800">
            {count} items assigned to You
          </div>
          <button 
            onClick={() => setDismissed(true)} 
            className="mt-2 w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Dismiss
          </button>
        </div>
      ) : null
    );
  }
  