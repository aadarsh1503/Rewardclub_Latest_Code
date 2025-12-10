
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// --- Imports from Code 1 (Public Components) ---
import LifestyleRewards from './Components/Hero/Hero';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import AuraStarCard from './Components/AuraStarCard/AuraStarCard';
import BrandFilter from './Components/BrandFilter/BrandFilter';
import ProductSection from './Components/ProductSection/ProductSection';
import SupportSection from './Components/SupportSection/SupportSection';
import TermsAndConditions from './Components/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy';
import MobileNavbar from './Components/MobileNavbar/MobileNavbar';
import { DirectionProvider } from './Components/DirectionContext';
import FAQ from './Components/Faq/Faq';
import About from './Components/About/About';
import MemberRegister from './Components/MemberRegister/MemberRegister';
import ChatWidget from './Components/ChatWidget/ChatWidget';
import LoginPage from './Components/Login/Login';
import VendorRegister from './Components/VendorRegister/VendorRegister';
import Modal from './Components/Modal/Modal';
import VerifyEmail from './Components/Login/VerifyEmail'; // Code 1 Verify Email

// --- Imports from Code 2 (Dashboard & Auth Components) ---
// Note: Ensure these paths are correct relative to App.js location
import LoginLayoutAdmin from "./layout/admin/LoginLayoutAdmin";
import DashboardLayoutAdmin from "./layout/admin/DashboardLayoutAdmin";
import Authgard from "./hooks/Authgard";
import VendorDashboardLayout from "./layout/vendor/VendorDashboardLayout";
import MemberDashboardLayout from "./layout/member/MemberDashboardLayout";
import SSOHandler from "./layout/main/SSOHandler";
// import VerifyEmail from "../layout/main/VerifyEmail"; // Duplicate import removed, using Code 1's or ensure they are the same component

function AppContent() {
  const location = useLocation();

  const modalPaths = ['/login', '/member-register', '/vendor-register', '/verify-email'];
 
  let background = location.state && location.state.background;

  // If we reload the page on a modal route, treat it as a direct visit (no background)
  if (!background && modalPaths.includes(location.pathname)) {
    background = { pathname: '/' };
  }

  // --- Logic to hide Public Navbar/Footer on Dashboard pages ---
  // If the user is on a dashboard path, we don't want the standard website header/footer
  const dashboardPaths = ['/admin-dashboard', '/vendor-dashboard', '/member-dashboard', '/sso-handler', '/login-admin'];
  const isDashboardRoute = dashboardPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {/* Only show Public Navbar, MobileNav, and Chat on non-dashboard pages */}
      {!isDashboardRoute && <Navbar />}
      {!isDashboardRoute && <MobileNavbar />}
      {!isDashboardRoute && <ChatWidget supportNumber="+966553800550" />}

      {/* 
         MAIN ROUTES 
      */}
      <Routes location={background || location}>
        {/* --- Public Routes (Code 1) --- */}
        <Route path="/" element={<LifestyleRewards />} />
        <Route path="/home" element={<LifestyleRewards />} /> {/* Mapped /home to main Hero */}
        <Route path="/tiers-benefits" element={<AuraStarCard />} />
        <Route path="/brands" element={<BrandFilter />} />
        <Route path="/offers-rewards" element={<ProductSection />} />
        <Route path="/contact-us" element={<SupportSection />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-statement" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about-us" element={<About />} />
        
        {/* --- Public Auth Routes (Code 1) --- */}
        <Route path="/member-register" element={<MemberRegister />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/vendor-register" element={<VendorRegister />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* --- Dashboard & Admin Routes (Merged from Code 2) --- */}
        
        <Route path="/sso-handler" element={<SSOHandler/>} />
        
        {/* Admin Login - Renamed to avoid conflict with public modal login if necessary, 
            or keep as /login-admin to distinguish from public user login */}
        <Route path="/login-admin" element={<LoginLayoutAdmin/>} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <Authgard>
              <DashboardLayoutAdmin/> 
            </Authgard>
          } 
        />
        <Route 
          path="/vendor-dashboard" 
          element={
            <Authgard> 
              <VendorDashboardLayout/> 
            </Authgard>
          } 
        />
        <Route 
          path="/member-dashboard" 
          element={
            <Authgard> 
              <MemberDashboardLayout/> 
            </Authgard>
          } 
        />
      </Routes>

      {/* --- MODAL ROUTES (Overlays from Code 1) --- */}
      {background && (
        <Routes>
          <Route path="/login" element={<Modal><LoginPage /></Modal>} />
          <Route path="/verify-email" element={<Modal><VerifyEmail /></Modal>} />
          <Route path="/member-register" element={<Modal><MemberRegister /></Modal>} />
          <Route path="/vendor-register" element={<Modal><VendorRegister /></Modal>} />
        </Routes>
      )}

      {/* Only show Footer on non-dashboard pages */}
      {!isDashboardRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <DirectionProvider />
      <AppContent />
    </Router>
  );
}

export default App;