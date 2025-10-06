import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <div className="nav-logo">
          <img src="https://msc-srmap.web.app/assets/logo-D0Qzz_Oa.png" alt="MSC Logo" style={{ height: '60px', width: '60px', objectFit: 'contain' }} />
        </div>
        <div className="nav-menu">
          <a href="#events" className="nav-link">Events</a>
          <a href="#about" className="nav-link">About</a>
          <div className="contact-links">
            <a href="https://www.linkedin.com/company/microsoft-student-community-srm-university/" target="_blank" rel="noopener noreferrer" className="contact-link">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/msc.srmap/?igsh=YmEwdnlteHUwNjVs#" target="_blank" rel="noopener noreferrer" className="contact-link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
