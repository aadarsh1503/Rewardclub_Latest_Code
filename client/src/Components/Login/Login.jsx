import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaXmark, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6"; 
import il from "./il.jpg";
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  // View State
  const [view, setView] = useState('login'); 
  
  // Login States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Forgot/Reset States
  const [forgotEmail, setForgotEmail] = useState(''); 
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showResetPass, setShowResetPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Global UI States
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isModal = location.state?.background;

  // Configuration
  const API_BASE = "/api/admin"; 

  // --- 1. DETECT EMAIL LINK (Reset Password Mode) ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('exp');
    const type = params.get('type');

    if (token && type === '3') {
      setResetToken(token);
      setView('reset');
      window.history.replaceState({}, document.title, "/login"); 
    }
  }, [location]);


  // --- 2. LOGIN LOGIC (DIRECT REDIRECT) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setSuccessMsg(""); setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password: password }),
      });

      const data = await response.json();

      if (response.ok && data.result && data.result.token) {
        
        // 1. Extract Data from Response
        const { token, data: userData } = data.result;
        const userType = userData.user_type;

        console.log("Login Success. User Type:", userType);

        // 2. Store Credentials in LocalStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userType", userType);

        setSuccessMsg("Login successful! Redirecting...");

        // 3. Direct Redirect based on User Type (DB Check logic)
        // Use window.location for full page navigation to ensure proper route loading
        setTimeout(() => {
            if (userType === 1) {
                // Admin
                window.location.href = "/admin-dashboard";
            } 
            else if (userType === 2) {
                // Member
                window.location.href = "/member-dashboard";
            } 
            else if (userType === 3) {
                // Vendor
                window.location.href = "/vendor-dashboard";
            } 
            else {
                // Fallback / Unknown Role
                window.location.href = "/";
            }
        }, 500); // Small delay for smooth UX

      } else if (response.status === 403) {
        setError(data.error?.[0]?.message || "Account not verified. Email sent.");
      } else {
        setError(data.error?.[0]?.message || t("Login Failed"));
      }
    } catch (err) {
      console.error("Login catch error:", err);
      setError(t("Something went wrong."));
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. FORGOT PASSWORD REQUEST LOGIC ---
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(""); setSuccessMsg(""); setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/send_email_reset_password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(data.result?.message || "Reset link sent! Check your email.");
      } else if (response.status === 403) {
        setError(data.error?.[0]?.message || "Please verify your email first.");
      } else {
        setError(data.error?.[0]?.message || "Request failed.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  // --- 4. SET NEW PASSWORD LOGIC ---
  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    setError(""); setSuccessMsg("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/reset_password`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resetToken}`
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg("Password updated successfully! You can now login.");
        setTimeout(() => {
          setView('login');
          setSuccessMsg(""); 
          setError("");
        }, 2000);
      } else {
        setError(data.error?.[0]?.message || "Failed to reset password. Link might be expired.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  // --- RENDER ---
  return (
    <div className=''>
      <div className="inset-0 flex font-sans items-center justify-center z-50">
        <div className="relative w-full max-w-md bg-white rounded-lg p-8">
          
          {/* CROSS BUTTON */}
          {isModal && (
            <button 
              onClick={() => navigate(-1)} 
              className="absolute top-6 right-0 mr-4 z-50 text-gray-500 hover:bg-red-600 hover:text-white transition-colors bg-white/50 rounded-full p-1"
              title="Close"
            >
              <FaXmark size={24} />
            </button>
          )}

          <img src={il} alt={t('background')} className="absolute inset-0 w-full h-full object-cover rounded-lg z-0" />

          {/* GLOBAL MESSAGES */}
          <div className="relative z-10">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm text-center">
                {successMsg}
              </div>
            )}
          </div>

          {/* ======================= VIEW 1: LOGIN ======================= */}
          {view === 'login' && (
            <>
              <h2 className="relative text-3xl font-bold text-center mb-8 z-10">{t('login')}</h2>

              <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                <input
                  type="text"
                  placeholder={t('enterUsername')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 text-gray-900 placeholder-gray-500 bg-white"
                  required
                />

                <div className="relative">
                  <input
                    type={showLoginPass ? "text" : "password"}
                    placeholder={t('enterPassword')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 pr-10 text-gray-900 placeholder-gray-500 bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPass(!showLoginPass)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-black cursor-pointer"
                  >
                    {showLoginPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div 
                  className="text-sm text-gray-600 hover:underline cursor-pointer"
                  onClick={() => { setView('forgot'); setError(''); setSuccessMsg(''); }} 
                >
                  {t('forgotPassword')}
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`w-full p-3 text-white font-semibold rounded-md transition-all
                    ${isLoading 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-Green hover:bg-white hover:text-Green hover:outline hover:outline-Green cursor-pointer"
                    }`}
                >
                  {isLoading ? t("Logging in...") : t('loginButton')}
                </button>

                <div className="flex items-center justify-center my-6">
                  <div className="border-t w-full"></div>
                  <div className="mx-4 text-gray-500">{t('or')}</div>
                  <div className="border-t w-full"></div>
                </div>

                <button 
                   type="button" 
                   onClick={() => navigate('/member-register', { state: { background: location.state?.background || location } })}
                   className="w-full p-3 bg-gray-800 cursor-pointer text-white hover:bg-white outline hover:outline-black font-semibold rounded-md hover:opacity-90"
                >
                    {t('registerNow')}
                </button>
              </form>
            </>
          )}

          {/* ======================= VIEW 2: FORGOT PASSWORD ======================= */}
          {view === 'forgot' && (
            <>
              <div className="relative z-10 mb-4">
                <button 
                  onClick={() => { setView('login'); setError(''); setSuccessMsg(''); }}
                  className="flex items-center text-gray-600 hover:text-black"
                >
                  <FaArrowLeft className="mr-2" /> Back to Login
                </button>
              </div>

              <h2 className="relative text-3xl font-bold text-center mb-2 z-10">Reset Password</h2>
              <p className="relative text-center text-gray-600 mb-6 z-10 text-sm">
                Enter your email address to receive reset instructions.
              </p>

              <form onSubmit={handleForgotPassword} className="space-y-6 relative z-10">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 text-gray-900 placeholder-gray-500 bg-white"
                  required
                />

                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`w-full p-3 text-white font-semibold rounded-md transition-all
                    ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-Green hover:bg-white hover:text-Green cursor-pointer"}`}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          )}

          {/* ======================= VIEW 3: SET NEW PASSWORD (RESET) ======================= */}
          {view === 'reset' && (
            <>
              <div className="relative z-10 mb-4">
                <button 
                  onClick={() => { setView('login'); setError(''); setSuccessMsg(''); }}
                  className="flex items-center text-gray-600 hover:text-black"
                >
                  <FaArrowLeft className="mr-2" /> Cancel
                </button>
              </div>

              <h2 className="relative text-3xl font-bold text-center mb-6 z-10">Set New Password</h2>

              <form onSubmit={handleSetNewPassword} className="space-y-6 relative z-10">
                
                {/* New Password */}
                <div className="relative">
                  <input
                    type={showResetPass ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 pr-10 text-gray-900 placeholder-gray-500 bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowResetPass(!showResetPass)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-black cursor-pointer"
                  >
                    {showResetPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 pr-10 text-gray-900 placeholder-gray-500 bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-black cursor-pointer"
                  >
                    {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`w-full p-3 text-white font-semibold rounded-md transition-all
                    ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-Green hover:bg-white hover:text-Green cursor-pointer"}`}
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}