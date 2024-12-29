'use client';
import React, { useState } from 'react';

const EmailModal = ({ isOpen }: { isOpen: boolean }) => {
  const [email, setEmail] = useState('');

  const handleClose = () => {
    // handle close logic here
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    // Handle sending email logic here
    console.log('Email:', email);
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className="bg-white p-6 rounded-lg w-80 text-center relative">
        <h2 className="text-lg font-semibold mb-2">Email &quot;Grocery Shopping List&quot;</h2>
        <p className="text-sm text-gray-600 mb-4">Join thousands getting emails in their inbox.</p>
        <input
          type="email"
          className="w-full p-2 border rounded-md mb-4"
          placeholder="To"
          value={email}
          onChange={handleEmailChange}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Send it!
        </button>
        <button
          className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M6 18L18 6M6 6l12 12"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EmailModal;
