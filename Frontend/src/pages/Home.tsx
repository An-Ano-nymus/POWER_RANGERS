import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Upload,
  AlertTriangle,
  CheckCircle,
  Zap,
  Lock,
  FileSearch
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0f1c3d] to-black">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
            <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full translate-x-1/2"></div>
          </div>
          <img
            className="w-24 h-24 mx-auto mb-8 text-blue-400 animate-float"
            src="/Photo/WhatsApp%20Image%202025-04-05%20at%2018.27.46_3c1c8cb3.jpg"
            alt="Not"
          />
          <h1 className="text-6xl font-bold mb-6 gradient-text">
            Welcome to SecureShield
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience next-generation security with our advanced AI-powered malware detection system.
            Protect your digital assets with real-time analysis of images and GIFs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="glass-card rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
              <img
                className="w-16 h-16 text-blue-400 mx-auto relative"
                src="/Photo/WhatsApp%20Image%202025-04-05%20at%2018.27.46_3c1c8cb3.jpg"
                alt="Not"
              />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Advanced Protection
            </h3>
            <p className="text-gray-300 leading-relaxed">
              State-of-the-art AI detection system that identifies malicious content
              with unprecedented accuracy.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
              <Zap className="w-16 h-16 text-green-400 mx-auto relative" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Real-Time Analysis
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Get instant results with our lightning-fast scanning engine.
              Protection that keeps pace with threats.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full"></div>
              <Lock className="w-16 h-16 text-purple-400 mx-auto relative" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Secure & Private
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Your security is our priority. All scans are private and
              data is handled with the utmost confidentiality.
            </p>
          </div>
        </div>

        <div className="text-center relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full"></div>
          </div>

          <div className="flex justify-center gap-6 flex-wrap">
            <Link
              to="/scanner"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transform hover:scale-105"
            >
              <FileSearch className="w-6 h-6 mr-2" />
              Start Scanning Now
            </Link>

            <Link
              to="/verification"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transform hover:scale-105"
            >
              <CheckCircle className="w-6 h-6 mr-2" />
              Verify
            </Link>
          </div>

          <p className="mt-4 text-gray-400">
            Secure your digital content with confidence
          </p>
        </div>
      </div>
    </div>
  );
}
