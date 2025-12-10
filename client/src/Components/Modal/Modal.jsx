import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { FaXmark } from "react-icons/fa6";

const Modal = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const isLoginPage = location.pathname === '/login';

  // --- SCROLL LOCK LOGIC ---
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // --- NEW CLOSE LOGIC ---
  const handleClose = () => {
    // Check if we have state (came from link navigation)
    if (location.state && location.state.background) {
      navigate(-1); // Go back to previous page
    } else {
      navigate('/'); // Go to Home if accessed directly
    }
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      onClick={closeModal}
      className="fixed inset-0 z-[900] flex items-start justify-center bg-black/60 backdrop-blur-md overflow-y-auto overscroll-none pt-32 pb-10 px-4"
    >
      <div className="relative w-full max-w-4xl bg-transparent my-auto">
        
        {!isLoginPage && (
          <button 
            onClick={handleClose} 
            className="absolute top-0 right-0 lg:right-4 lg:top-0 z-50 p-2 bg-white text-gray-600 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-md mb-2"
            title="Close"
          >
            <FaXmark size={20} />
          </button>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;