import React from 'react';

interface ItemCountNotificationProps {
  itemCount: number;
  onDismiss: () => void;
}

const ItemCountNotification: React.FC<ItemCountNotificationProps> = ({
  itemCount,
  onDismiss,
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-orange-500 text-white rounded-xl p-4 shadow-md">
      <p className="text-base">
        {itemCount} items assigned to You
      </p>
      <button
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        onClick={onDismiss}
      >
        Dismiss
      </button>
    </div>
  );
};

export default ItemCountNotification;
