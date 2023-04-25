import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="https://zenith.eesc.usp.br/">
            <img src="/logo.svg" alt="Logo" className="footer-logo" />
        </a>  
        <p>&copy; 2023 Zenith Aerospace</p>
      </div>
    </footer>
  );
};

export default Footer;