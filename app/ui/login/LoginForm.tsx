'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../home/NavBar';
import Link from 'next/link';
import { useActionState } from 'react';
import { authenticate } from '../../lib/actions';
function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  useEffect(() => {
    if(!errorMessage){
      setIsSubmitting(false);
    }
  }, [errorMessage]);
  
  return (
        <form action={formAction} className="w-full space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="button-primary w-full py-2 mt-4"
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </button>

          <p className="text-center mt-4 text-sm text-black">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
          {errorMessage && (
            <div className="flex items-center space-x-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white">
                <span className="text-xs font-bold">!</span>
              </div>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
        </form>
  );
}

export default LoginForm;
