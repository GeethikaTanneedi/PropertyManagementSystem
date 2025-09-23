import React, { useState } from 'react';
import { Building2, Mail, Lock, User } from 'lucide-react';

interface AuthProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
}

export function Auth({ onLogin, onSignup }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(formData.email, formData.password);
    } else {
      onSignup(formData.name, formData.email, formData.password);
    }
  };

  return (
    <div className="auth-container min-h-screen bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center p-4">
      <div className="auth-card bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="auth-header bg-orange-600 text-white p-8 text-center">
          <div className="logo-container flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-12 w-12" />
            <span className="text-2xl font-bold">PropManager</span>
          </div>
          <p className="text-orange-100">Property Management Made Easy</p>
        </div>

        <div className="auth-form p-8">
          <div className="tab-switches flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`tab-btn flex-1 py-2 px-4 text-center font-medium rounded-lg transition-colors ${
                isLogin
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`tab-btn flex-1 py-2 px-4 text-center font-medium rounded-lg transition-colors ${
                !isLogin
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="input-container relative">
                  <User className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="input-container relative">
                <Mail className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="input-container relative">
                <Lock className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="form-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="switch-btn text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
}