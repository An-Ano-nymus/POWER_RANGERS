import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0f1c3d] to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
          <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full translate-x-1/2"></div>
        </div>
        
        <div className="glass-card rounded-2xl p-8">
          <div className="text-center mb-8">
            <img className="mx-auto h-16 w-16 text-blue-400 animate-float"  src="/Photo/WhatsApp%20Image%202025-04-05%20at%2018.27.46_3c1c8cb3.jpg" alt="Not" />
            {/* <img className="mx-auto h-16 w-16 text-blue-400 animate-float" /> */}
            <h2 className="mt-6 text-4xl font-bold gradient-text">
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-400">Sign in to your account</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-xl relative block w-full pl-10 pr-3 py-3 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-xl relative block w-full pl-10 pr-3 py-3 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}