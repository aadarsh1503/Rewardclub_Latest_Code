import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '/src/App.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faGear,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

import { clearData } from '../../utils/clearData';
import LogoutConfirmDialog from '../Modal/LogoutConfirmDialog';

function HeaderAdmin({ selected, setSelected }) {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Show logout confirmation dialog
  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  // Confirm logout
  const handleLogoutConfirm = () => {
    clearData();          // Clear token / storage
    setSelected('');      // Optional: reset selection
    setShowLogoutDialog(false);
    navigate('/');        // 🔥 Redirect to homepage
  };

  // Cancel logout
  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
  };

  return (
    <>
    <div className="header-view">
      <div className="header-view-inside">

        {/* =================== LEFT MENU =================== */}
        <div className="div-items-view">

          <div
            className={selected === 'dashboard' ? 'div-tab-selected' : 'div-tab'}
            onClick={() => setSelected('dashboard')}
          >
            Dashboard
          </div>

          <div
            className={selected === 'leads' ? 'div-tab-selected' : 'div-tab'}
            onClick={() => setSelected('leads')}
          >
            Leads
          </div>

          <div
            className={selected === 'wallet' ? 'div-tab-selected' : 'div-tab'}
            onClick={() => setSelected('wallet')}
          >
            Wallet
          </div>

          <div
            className={selected === 'members' ? 'div-tab-selected' : 'div-tab'}
            onClick={() => setSelected('members')}
          >
            Users
          </div>

          <div
            className={selected === 'complaints' ? 'div-tab-selected' : 'div-tab'}
            onClick={() => setSelected('complaints')}
          >
            Complaints
          </div>

          <div
            className={selected === 'card' ? 'div-tab-selected' : 'div-tab'}
            onClick={() => setSelected('card')}
          >
            Card
          </div>

          <div
            className={selected === 'offers' ? 'div-tab-selected' : 'div-tab'}
            onClick={() => setSelected('offers')}
          >
            Products
          </div>

          <div
            className={selected === 'report' ? 'div-tab-selected' : 'div-tab'}
            onClick={() => setSelected('report')}
          >
            Report
          </div>

        </div>

        {/* =================== SETTINGS =================== */}
        <div className="div-setings">
          <div
            className={selected === 'settings' ? 'div-setings-selected' : 'div-setings-non'}
            onClick={() => setSelected('settings')}
          >
            <FontAwesomeIcon icon={faGear} />
            <span style={{ marginLeft: 6, fontWeight: "bold" }}>Settings</span>
          </div>
        </div>

        {/* =================== LOGOUT =================== */}
        <div className="div-profile">
          <div
            className={selected === 'logout' ? 'div-profile-selected' : ''}
            onClick={handleLogoutClick}
            title="Logout"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
        </div>

        {/* =================== NOTIFICATION =================== */}
        <div className="div-profile">
          <div
            className={selected === 'notification' ? 'div-profile-selected' : ''}
            onClick={() => setSelected('notification')}
            title="Notifications"
          >
            <FontAwesomeIcon icon={faBell} />
          </div>
        </div>

        {/* =================== PROFILE =================== */}
        <div className="div-profile">
          <div
            className={selected === 'profile' ? 'div-profile-selected' : ''}
            onClick={() => setSelected('profile')}
            title="Profile"
          >
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>

      </div>
    </div>

    {/* Logout Confirmation Dialog */}
    <LogoutConfirmDialog
      isOpen={showLogoutDialog}
      onConfirm={handleLogoutConfirm}
      onCancel={handleLogoutCancel}
    />
  </>
  )
}

export default HeaderAdmin;
