import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '/src/App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { clearData } from '../../utils/clearData';
import LogoutConfirmDialog from '../Modal/LogoutConfirmDialog';


function HeaderVendor({ selected, setSelected }) {
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
    navigate('/login');        // 🔥 Redirect to homepage
  };

  // Cancel logout
  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
  };

  return (
    <>
    <div className='header-view'>
        <div className='header-view-inside'> 
            <div className='div-items-view'>
                <div className={selected === 'dashboard' ? 'div-tab-selected' : 'div-tab'}
                    onClick={() => setSelected('dashboard')}>
                    Dashboard
                </div>

                <div className={selected === 'leads' ? 'div-tab-selected' : 'div-tab'}
                    onClick={() => setSelected('leads')}>
                    Leads
                </div>

                <div className={selected === 'transactions' ? 'div-tab-selected' : 'div-tab'}
                    onClick={() => setSelected('transactions')}>
                    Wallet
                </div>

                <div className={selected === 'member' ? 'div-tab-selected' : 'div-tab'}
                    onClick={() => setSelected('member')}>
                    Member
                </div>

                <div className={selected === 'report' ? 'div-tab-selected' : 'div-tab'}
                    onClick={() => setSelected('report')}>
                    Report
                </div>
                
                <div className={selected === 'complaints' ? 'div-tab-selected' : 'div-tab'}
                    onClick={() => setSelected('complaints')}>
                    Complaints
                </div>

                <div className={selected === 'product' ? 'div-tab-selected' : 'div-tab'}
                    onClick={() => setSelected('product')}>
                    Products
                </div>

                <div className={selected === 'offers' ? 'div-tab-selected' : 'div-tab'}
                    onClick={() => setSelected('offers')}>
                    Offers
                </div>

            </div>
                
           <div className='div-setings'>
                         <div className={selected === 'logout' ? 'div-setings-selected' : 'div-setings-non'}
                       onClick={handleLogoutClick}>
                           <FontAwesomeIcon icon={faGear} style={{ color: "black" }} />
                           <span style={{ color: "black", marginLeft: 4, fontWeight: "bold" }} >Logout</span>
                         </div>
                         </div>

            <div className='div-profile'>
                <div className={selected === 'notification' ? 'div-profile-selected' : ''}
                    onClick={() => setSelected('notification')}>
                    <FontAwesomeIcon icon={faBell} style={{ color: "black" }} />
                </div>
            </div>

            <div className='div-profile'>
                <div className={selected === 'profile' ? 'div-profile-selected' : ''}
                    onClick={() => setSelected('profile')}>
                    <FontAwesomeIcon icon={faUser} style={{ color: "black" }} />
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

export default HeaderVendor
