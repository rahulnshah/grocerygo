"use client";
import React, { useState } from 'react';
import Navbar from '../ui/home/NavBar';
import Link from 'next/link';
import SignInWithGithub from '../ui/login/SignInWithGithub';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Errors:', errors);
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-white shadow-md p-8 rounded-md w-full max-w-sm mx-auto">
        <h2 className="text-2xl font-semibold text-black mb-6">Log in to GroceryGo</h2>
        
        <div className="w-full space-y-4">
          {/* Social login buttons */}
          <SignInWithGithub />
        </div>
        
        <p className="text-sm text-center my-4 text-black">OR</p>
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
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
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">Your password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-400 disabled:bg-blue-300 transition"
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </button>
          
          <p className="text-center mt-4 text-sm text-black">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-blue-500 hover:text-blue-400">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
