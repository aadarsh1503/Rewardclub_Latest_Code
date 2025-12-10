import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SSOHandler() {
  const navigate = useNavigate();
  const hasRun = useRef(false);
  const [status, setStatus] = useState("Establishing Secure Connection...");

  // In production (same domain), use relative path. In dev, use full URL.
  const API_EXCHANGE_URL = "/api/admin/exchange-token"; 
  // OR: const API_EXCHANGE_URL = "http://localhost:8005/api/admin/exchange-token";

  useEffect(() => {
    if (hasRun.current) return;

    // 🟢 1. Retrieve Code from Hidden Window Storage
    const code = window.name;

    if (code && code.length > 10) { 
      hasRun.current = true;
      setStatus("Exchanging secure keys...");

      // 🟢 2. Security: Clear storage immediately
      window.name = ""; 

      // 3. Call Backend
      fetch(API_EXCHANGE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code })
      })
      .then(res => res.json())
      .then(data => {
        if (data.result && data.result.token) {
          const { token, data: user } = data.result;

          // 4. Save Session
          localStorage.setItem("authToken", token);
          localStorage.setItem("userId", user.id);
          localStorage.setItem("userType", user.user_type);

          setStatus("Access Granted.");

          // 5. AUTOMATIC ROUTING (The handler decides where to go)
          const type = parseInt(user.user_type, 10);
          
          setTimeout(() => {
             if (type === 1) navigate("/admin-dashboard", { replace: true });
             else if (type === 2) navigate("/member-dashboard", { replace: true });
             else if (type === 3) navigate("/vendor-dashboard", { replace: true });
             else navigate("/home", { replace: true });
          }, 100);
          
        } else {
          console.error("SSO Failed");
          setStatus("Session Expired.");
          setTimeout(() => navigate("/login"), 2000);
        }
      })
      .catch(err => {
        console.error("Network Error", err);
        setStatus("Connection Failed.");
      });

    } else {
      // Direct access protection
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 flex-col">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-700">{status}</h2>
    </div>
  );
}