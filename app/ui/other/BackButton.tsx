import * as React from 'react';

interface ButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      className="mt-2 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
      onClick={onClick}
    >
      Back
    </button>
  );
};

export default BackButton;
