import React, { useState } from 'react';

const SignIn = () => {
  const [activeTab, setActiveTab] = useState('signup');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center mt-6">
            <div className="flex">
              <button
                onClick={() => handleTabClick('signup')}
                className={`${
                  activeTab === 'signup' ? 'bg-green-500 text-white' : 'bg-green-300 text-gray-700'
                } py-2 px-4 rounded-l-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                Sign Up
              </button>
              <button
                onClick={() => handleTabClick('login')}
                className={`${
                  activeTab === 'login' ? 'bg-green-500 text-white' : 'bg-green-300 text-gray-700'
                } py-2 px-4 rounded-r-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8">
          <div id="signup" className={activeTab === 'signup' ? 'block' : 'hidden'}>
            <h1 className="text-3xl text-center text-green-600 mb-6">Sign Up for Free</h1>

            <form action="/" method="post" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Set A Password<span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Get Started
              </button>
            </form>
          </div>

          <div id="login" className={activeTab === 'login' ? 'block' : 'hidden'}>
            <h1 className="text-3xl text-center text-green-600 mb-6">Welcome Back!</h1>

            <form action="/" method="post" className="space-y-4">
              <div>
                <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  id="loginEmail"
                  name="loginEmail"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">
                  Password<span className="text-red-500">*</span>
                </label>
                <input
                  id="loginPassword"
                  name="loginPassword"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              <p className="mt-2 text-right">
                <a href="#" className="text-sm text-green-600 hover:text-green-800">
                  Forgot Password?
                </a>
              </p>

              <button
                type="submit"
                className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
