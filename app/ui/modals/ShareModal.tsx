'use client';
import React, { useState } from 'react';

interface User {
  name: string;
  role: string;
  avatarUrl?: string; // Optional avatar URL
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, users }) => {
  const [email, setEmail] = useState('');

  const handleClose = () => {
    onClose();
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleInviteEdit = (index: number) => {
    // Handle editing logic for invited users
    console.log('Editing user at index:', index);
  };

  const handleInviteRemove = (index: number) => {
    // Handle removing an invited user
    console.log('Removing user at index:', index);
  };

  const handleInviteAdd = () => {
    // Handle adding a new invited user
    console.log('Adding new user');
    setEmail(''); // Reset the email input
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <h2 className="text-lg font-semibold mb-4 text-center">Invite Users</h2>

        <div className="mb-4">
          <input
            type="email"
            className="w-full p-2 border rounded-md mb-2"
            placeholder="Enter email to invite"
            value={email}
            onChange={handleEmailChange}
          />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={handleInviteAdd}
          >
            Send Invite
          </button>
        </div>

        <Typography variant="body2" className="mb-2">
          Invited Users:
        </Typography>

        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  src={user.avatarUrl || 'https://via.placeholder.com/40'}
                  alt={user.name}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="text-yellow-500"
                  onClick={() => handleInviteEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleInviteRemove(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No users invited yet.</p>
        )}

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

export default ShareModal;
