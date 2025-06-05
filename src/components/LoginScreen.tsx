import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import logo from '../assets/logo.png';
import { toast } from "@/components/ui/sonner";
import { useNavigate } from 'react-router-dom';

const LoginScreen: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login request
    setTimeout(() => {
      setIsLoading(false);
      toast("Login successful", {
        duration: 600,
      });
      navigate('/home'); // Redirect to home page
    }, 400);
  };

  const handleSSOLogin = () => {
    toast("SSO login initiated", {
      duration: 600,
    });
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-sm mx-auto px-4 py-8">
      <img src={logo} alt="Logo" className="mb-6 w-20 h-20" />
      
      <h1 className="text-2xl font-bold mb-8">Log in to OneApp</h1>
      
      <form className="w-full space-y-6 pb-4" onSubmit={handleLogin}>
        <div className="space-y-2">
          <label className="text-sm text-gray-600">RIL Email / Phone Number</label>
          <Input
            type="text"
            placeholder="e.g. email@ril.com"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full p-3"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Password</label>
          <Input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3"
            required
          />
          <div className="text-left">
            <a href="#" className="text-sm" style={{ color: 'hsl(var(--primary))' }}>Forgot Password?</a>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
          />
          <label
            htmlFor="remember-me"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
      </form>
      <div className="mt-auto w-full">
        <p className="text-xs text-left text-gray-600 mb-4">
          By continuing, you agree to the{" "}
          <a href="#" className="text-primary underline">Terms of Service</a> &{" "}
          <a href="#" className="text-primary underline">Privacy Policy</a>
        </p>
        <div className="space-y-3 w-full">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full"
            disabled={isLoading}
            onClick={handleLogin}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in
              </span>
            ) : (
              "Login"
            )}
          </Button>
          <Button
            type="button"
            onClick={handleSSOLogin}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-full"
            variant="outline"
          >
            Sign in with SSO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
