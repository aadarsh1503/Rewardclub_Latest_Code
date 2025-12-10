import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaFingerprint } from "react-icons/fa"; // npm install react-icons
import { CgSpinner } from "react-icons/cg";

export default function VerifyEmail() {
  const [status, setStatus] = useState('verifying'); // verifying | success | error
  const [message, setMessage] = useState('Authenticating secure signature...');
  const navigate = useNavigate();
  const location = useLocation();

  // Backend URL
  const API_URL = "/api/admin/email-verification";

  useEffect(() => {
    const verifyToken = async () => {
      // 1. Get Token from URL
      const params = new URLSearchParams(location.search);
      const token = params.get('exp');

      if (!token) {
        setStatus('error');
        setMessage("Security Token Missing. Access Denied.");
        return;
      }

      // 2. Artificial Delay for the "Cool Animation" effect (optional, remove if you want instant)
      await new Promise(r => setTimeout(r, 1500)); 

      try {
        // 3. Call API
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Backend expects Bearer token
          },
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage("Identity Verified. Access Granted.");
          
          // 4. Redirect to Login after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3500);
        } else {
          setStatus('error');
          setMessage(data.error?.[0]?.message || "Verification Failed.");
        }
      } catch (error) {
        console.error("Verification Error:", error);
        setStatus('error');
        setMessage("Network Uplink Failed.");
      }
    };

    verifyToken();
  }, [location, navigate]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black font-sans text-white">
      
      {/* --- CSS ANIMATIONS --- */}
      <style>{`
        @keyframes scanline {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px #0ea5e9, 0 0 10px #0ea5e9 inset; }
          50% { box-shadow: 0 0 40px #0ea5e9, 0 0 20px #0ea5e9 inset; }
        }
        @keyframes success-glow {
          0%, 100% { box-shadow: 0 0 20px #10b981, 0 0 10px #10b981 inset; }
          50% { box-shadow: 0 0 40px #10b981, 0 0 20px #10b981 inset; }
        }
        @keyframes error-glow {
          0%, 100% { box-shadow: 0 0 20px #ef4444, 0 0 10px #ef4444 inset; }
          50% { box-shadow: 0 0 40px #ef4444, 0 0 20px #ef4444 inset; }
        }
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Radial Gradient Spotlights */}
      <div className={`absolute top-0 left-0 h-[500px] w-[500px] rounded-full blur-[120px] opacity-30 transition-colors duration-1000
        ${status === 'verifying' ? 'bg-cyan-600' : status === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
      </div>
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-900 blur-[120px] opacity-20"></div>

      {/* --- MAIN GLASS CARD --- */}
      <div className="relative z-10 w-full max-w-md p-1">
        
        {/* Animated Border Gradient */}
        <div className={`absolute inset-0 rounded-2xl blur-md transition-colors duration-500
          ${status === 'verifying' ? 'bg-cyan-500' : status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
        </div>

        <div className="relative flex flex-col items-center rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 p-10 shadow-2xl">
          
          {/* SCANLINE EFFECT */}
          <div className="absolute inset-0 overflow-hidden rounded-xl opacity-10 pointer-events-none">
            <div className="absolute left-0 right-0 h-1 bg-white blur-sm" style={{ animation: 'scanline 3s linear infinite' }}></div>
          </div>

          {/* --- STATUS ICONS & ANIMATION --- */}
          <div className="mb-8 relative">
            
            {/* 1. VERIFYING STATE */}
            {status === 'verifying' && (
              <div className="relative h-24 w-24 flex items-center justify-center rounded-full border border-cyan-500/50" style={{ animation: 'pulse-glow 2s infinite' }}>
                <CgSpinner className="animate-spin text-5xl text-cyan-400" />
                <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin"></div>
              </div>
            )}

            {/* 2. SUCCESS STATE */}
            {status === 'success' && (
              <div className="relative h-24 w-24 flex items-center justify-center rounded-full border border-green-500/50" style={{ animation: 'success-glow 2s infinite' }}>
                <FaCheckCircle className="text-5xl text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                {/* Particles or Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-green-400 opacity-0 scale-150 transition-all duration-700"></div>
              </div>
            )}

            {/* 3. ERROR STATE */}
            {status === 'error' && (
              <div className="relative h-24 w-24 flex items-center justify-center rounded-full border border-red-500/50" style={{ animation: 'error-glow 2s infinite' }}>
                <FaTimesCircle className="text-5xl text-red-500 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]" />
              </div>
            )}
          </div>

          {/* --- TEXT CONTENT --- */}
          <h2 className={`text-2xl font-bold tracking-widest uppercase mb-2 transition-colors duration-300
             ${status === 'verifying' ? 'text-cyan-400' : status === 'success' ? 'text-green-400' : 'text-red-500'}`}>
             {status === 'verifying' ? 'Processing' : status === 'success' ? 'Confirmed' : 'Error'}
          </h2>
          
          <p className="text-gray-300 text-center font-mono text-sm tracking-wide mb-6">
            {message}
          </p>

          {/* --- FOOTER / REDIRECT HINT --- */}
          {status === 'success' && (
            <div className="mt-4 flex flex-col items-center animate-pulse">
              <span className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Redirecting to System...</span>
              <div className="h-1 w-32 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full origin-left animate-[load_3s_linear]"></div>
              </div>
              <style>{`@keyframes load { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
            </div>
          )}

          {status === 'error' && (
            <button 
              onClick={() => navigate('/login')}
              className="mt-4 px-6 py-2 bg-red-600/20 border border-red-500 text-red-400 font-mono text-sm rounded hover:bg-red-600 hover:text-white transition-all uppercase tracking-wider"
            >
              Return to Login
            </button>
          )}

        </div>
      </div>
    </div>
  );
}