import React from 'react'
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

function HeaderAdmin({ selected, setSelected }) {
  const navigate = useNavigate();

  // ✅ Proper logout handler
  const handleLogout = () => {
    clearData();          // Clear token / storage
    setSelected('');      // Optional: reset selection
    navigate('/');        // 🔥 Redirect to homepage
  };

  return (
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
            onClick={handleLogout}
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
  )
}

export default HeaderAdmin;
