
import React, { useState, useEffect } from "react";
import logo from '../assets/logo.png';

const MIN_SPLASH_TIME = 200; // Reduced from 400ms to 200ms for faster loading

const PreloadLogo: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    // Pre-load the logo image
    const img = new window.Image();
    img.src = logo;
    img.onload = () => setLoaded(true);
    
    // Set minimum display time for splash screen
    const timer = setTimeout(() => setMinTimePassed(true), MIN_SPLASH_TIME);
    return () => clearTimeout(timer);
  }, []);

  // Show splash screen until both conditions are met
  if (!loaded || !minTimePassed) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <img src={logo} alt="Logo" className="w-24 h-24" />
      </div>
    );
  }

  // Render children once loading is complete
  return <>{children}</>;
};

export default PreloadLogo;
