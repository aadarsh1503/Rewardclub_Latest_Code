import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faTimes, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const LogoutConfirmDialog = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onCancel}
      />
      
      {/* Dialog Container */}
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl max-w-md w-full mx-4 sm:mx-6 transform transition-all duration-300 scale-100 animate-slideIn border border-gray-100">
        
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
        >
          <FontAwesomeIcon 
            icon={faTimes} 
            className="text-gray-500 group-hover:text-gray-700 text-sm" 
          />
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8 text-center">
          
          {/* Icon */}
          <div className="mb-6 relative">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center animate-pulse">
              <FontAwesomeIcon 
                icon={faExclamationTriangle} 
                className="text-3xl text-orange-500 animate-bounce" 
              />
            </div>
            <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-200/30 to-orange-200/30 animate-ping" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Confirm Logout
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            Are you sure you want to logout? You'll need to sign in again to access your dashboard.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            
            {/* Cancel Button */}
            <button
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:ring-4 focus:ring-gray-200"
            >
              Cancel
            </button>

            {/* Logout Button */}
            <button
              onClick={onConfirm}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 focus:ring-4 focus:ring-red-200"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="text-sm" />
              Logout
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-red-400 to-orange-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-40 animate-pulse delay-300" />
      </div>
    </div>
  );
};

export default LogoutConfirmDialog;