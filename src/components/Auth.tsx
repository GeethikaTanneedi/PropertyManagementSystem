import React, { useState } from "react";
import { AuthService } from "../api/services";

interface AuthProps {
  onLogin: (user: { id: number; name: string; email: string }) => void;
  onSignup: (user: { id: number; name: string; email: string }) => void;
}

export function Auth({ onLogin, onSignup }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      console.log('Attempting:', isLogin ? 'Login' : 'Signup');
      
      const response = isLogin 
        ? await AuthService.login(email, password)
        : await AuthService.signup(name, email, password);
      
      console.log('Auth response:', response);
      
      const data = response.data as any;
      
      if (data.user) {
        const user = data.user as { id: number; name: string; email: string };
        if (isLogin) {
          onLogin(user);
        } else {
          onSignup(user);
        }
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          console.log('Token stored successfully');
        }
      } else {
        setError(`${isLogin ? 'Login' : 'Signup'} failed: No user data received`);
      }
      
      setEmail("");
      setName("");
      setPassword("");
    } catch (err: any) {
      console.error("Auth error details:", err);
      
      if (err.code === 'ECONNREFUSED' || err.message === 'Network Error') {
        setError("Cannot connect to server. Please make sure the backend is running on http://localhost:3000");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 disabled:opacity-50"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-4 py-2 rounded-lg transition-colors flex justify-center items-center"
        >
          {loading ? (
            <span>Loading...</span>
          ) : (
            <span>{isLogin ? "Login" : "Sign Up"}</span>
          )}
        </button>

        <p className="text-sm text-gray-600 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
            className="text-orange-500 font-medium hover:underline disabled:opacity-50"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}