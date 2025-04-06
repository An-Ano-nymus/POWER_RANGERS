import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-card border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
            <img className="w-8 h-8 text-blue-400 mr-2 group-hover:text-blue-300 transition-colors"   src="/Photo/WhatsApp%20Image%202025-04-05%20at%2018.27.46_3c1c8cb3.jpg" alt="Not" />
              {/* <Shield className="w-8 h-8 text-blue-400 mr-2 group-hover:text-blue-300 transition-colors" /> */}
              <span className="text-white text-xl font-bold group-hover:text-blue-300 transition-colors">
                SecureShield
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-gray-300">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}