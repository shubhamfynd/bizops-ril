import React from "react";
import LoginScreen from "@/components/LoginScreen";
import PreloadLogo from "@/components/PreloadLogo";

const Index: React.FC = () => (
  <div className="app-container bg-white">
    <PreloadLogo>
      <LoginScreen />
    </PreloadLogo>
  </div>
);

export default Index;
