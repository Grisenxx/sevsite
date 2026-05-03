import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../hooks/useAuth';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const navigate = useNavigate();
  const { login, activate, isLoading, error, isAuthenticated } = useAuthStore();
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/Dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || (isRegister && !licenseKey)) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const res = isRegister 
      ? await activate(licenseKey, username, password)
      : await login(username, password);

    if (res.success) {
      navigate('/Dashboard');
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
            <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-1 flex gap-1">
                <button 
                    onClick={() => setIsRegister(false)}
                    className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${!isRegister ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-white/40 hover:text-white/60'}`}
                >
                    Login
                </button>
                <button 
                    onClick={() => setIsRegister(true)}
                    className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${isRegister ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-white/40 hover:text-white/60'}`}
                >
                    Register
                </button>
            </div>
        </div>

        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
                {isRegister ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-[#8b8b9e] text-sm text-center">
              {isRegister ? 'Enter a license key to get started' : 'Enter your credentials to access the dashboard'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="block text-sm font-medium text-white/70 mb-1.5 ml-1">
                  License Key
                </label>
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] transition-all"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                />
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5 ml-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] transition-all"
                placeholder="Choose a username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5 ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] transition-all"
                placeholder="Choose a password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl px-4 py-3.5 font-medium transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isRegister ? 'Activate License' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-white/40">
            {isRegister ? 'Already have an account?' : 'Forgot password?'} {' '}
            <span 
                onClick={() => isRegister ? setIsRegister(false) : null}
                className="text-red-400 cursor-pointer hover:text-red-300"
            >
                {isRegister ? 'Login here' : 'Contact Support'}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
