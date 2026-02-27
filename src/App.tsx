{/* Gateway Page Section */}
<div className="relative z-10 text-center px-6">
  {/* Blue top banner */}
  <div className="absolute top-0 left-0 w-full bg-microsoft-blue/10 py-2 border-b border-microsoft-blue/20 flex justify-center items-center gap-2">
    <ShieldCheck className="w-3 h-3 text-microsoft-blue" />
    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-microsoft-blue">Bank-Level 256-Bit AES Encryption Active</span>
  </div>

  <div className="bg-zinc-800/40 border border-zinc-700/50 px-4 py-1 rounded-full inline-flex items-center gap-2 mb-8 mt-20">
    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-300">System Status: Operational</span>
  </div>

  <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6">
    SecureVault <span className="text-microsoft-blue">Pro</span>
  </h1>
  
  <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
    Enterprise-grade document governance and secure distribution. Access restricted to authorized corporate personnel only.
  </p>

  {/* Button Styling: Large White Pill + Side Link */}
  <div className="flex flex-col md:flex-row items-center justify-center gap-8">
    <button onClick={() => setPage('auth')} className="bg-white text-black px-12 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl">
      Access Secure Portal <ArrowRight className="w-5 h-5" />
    </button>
    
    <button className="text-white/80 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
      <FileLock2 className="w-4 h-4" />
      Compliance Docs
    </button>
  </div>
</div>

{/* Footer Trust Badges: Scaled with icons */}
<div className="absolute bottom-16 w-full px-6 flex justify-center gap-8 md:gap-16 opacity-60">
  <div className="flex flex-col items-center gap-2">
    <ShieldCheck className="w-5 h-5 text-microsoft-blue" />
    <span className="text-[9px] text-white uppercase tracking-widest font-bold">ISO 27001 Certified</span>
  </div>
  <div className="flex flex-col items-center gap-2">
    <Lock className="w-5 h-5 text-microsoft-blue" />
    <span className="text-[9px] text-white uppercase tracking-widest font-bold">Zero-Trust Architecture</span>
  </div>
  <div className="flex flex-col items-center gap-2">
    <Globe className="w-5 h-5 text-microsoft-blue" />
    <span className="text-[9px] text-white uppercase tracking-widest font-bold">Global Compliance</span>
  </div>
  <div className="flex flex-col items-center gap-2">
    <ShieldAlert className="w-5 h-5 text-microsoft-blue" />
    <span className="text-[9px] text-white uppercase tracking-widest font-bold">Real-Time Monitoring</span>
  </div>
</div>