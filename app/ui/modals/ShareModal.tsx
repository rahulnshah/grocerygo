'use client';
import React, { useState } from 'react';
import Search from './Search';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Users from './Users';
interface User {
  name: string;
  role: string;
  avatarUrl?: string; // Optional avatar URL
}

interface ShareModalProps {
  listId: string;
  searchParams?: Promise<{ query?: string }>;
}

const ShareModal: React.FC<ShareModalProps> = async ({ listId, searchParams }) => {
  const sParams = await searchParams;
  const query = sParams?.query || '';

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative w-full max-w-md mx-auto mt-20">
        <div className="bg-white rounded-lg shadow-xl">
          <div className="p-4">
            {/* <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Share</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div> */}

            <Search placeholder="Search for a user" />
            <Users searchQuery={query} />
            <div className="space-y-2">
              {sharedUsers.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Shared with
                  </h3>
                  <div className="space-y-2">
                    {sharedUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                            alt={user.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        {isOwner && (
                          <button
                            onClick={() => handleUnshare(user.id)}
                            className="text-red-500 hover:text-red-600 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
