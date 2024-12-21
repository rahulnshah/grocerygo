"use client";
import * as React from 'react';
import Navbar from '../ui/home/NavBar';
import { createUserAndRedirectToLogin, UserState } from '../lib/actions';
import { useActionState } from 'react';

function SignUpPage() {
  const initialState: UserState = { message: null, errors: {} };
  const [state, action] = useActionState(createUserAndRedirectToLogin, initialState);

  return (
    <>
      <Navbar />
      <form action={action} className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col w-1/2 bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-xl font-semibold mb-6 text-center">Welcome to GroceryGo</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className={`block w-full border ${
                  state.errors?.name ? 'border-red-500' : 'border-gray-300'
                } rounded-md px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {state.errors?.name && (
                <p className="text-sm text-red-500 mt-1">{state.errors?.name[0]}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`block w-full border ${
                  state.errors?.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {state.errors?.email && (
                <p className="text-sm text-red-500 mt-1">{state.errors?.email[0]}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className={`block w-full border ${
                  state.errors?.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {state.errors?.password && (
                <p className="text-sm text-red-500 mt-1">{state.errors?.password[0]}</p>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              - At least 8 characters <br />
              - One uppercase character <br />
              - One lowercase character <br />
              - One special character <br />
              - One number
            </p>
            <div className="flex items-center mt-3">
              <input
                id="checkbox"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="checkbox" className="ml-2 block text-sm text-gray-700">
                I agree to the Terms and Privacy Policy.
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
            >
              Create an account
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <button type="button" className="text-indigo-600 hover:underline">
                Login
              </button>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUpPage;
