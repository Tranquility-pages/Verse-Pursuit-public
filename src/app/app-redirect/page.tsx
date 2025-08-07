"use client";

import { useEffect, useState } from "react";

// Configuration for app links with actual app store URLs
const APP_CONFIG = {
  // Actual iOS App Store link
  iOS: "https://apps.apple.com/ca/app/verse-pursuit/id6743778976",
  // Actual Google Play Store link
  android: "https://play.google.com/store/apps/details?id=com.versepursuit.app&pcampaignid=web_share",
  // Fallback page (if we can't detect the device or it's desktop)
  fallback: "/",
  // App name (displayed while redirecting)
  appName: "Verse Pursuit",
};

export default function AppRedirect() {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Function to detect device type
    const detectDevice = () => {
      // Get the user agent from the browser
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      
      // Check for iOS devices
      if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return "iOS";
      }
      
      // Check for Android devices
      if (/android/i.test(userAgent)) {
        return "android";
      }
      
      // If we can't determine or it's a desktop, use fallback
      return "desktop";
    };

    // Detect device and set redirect URL
    const device = detectDevice();
    
    if (device === "iOS") {
      setRedirectUrl(APP_CONFIG.iOS);
    } else if (device === "android") {
      setRedirectUrl(APP_CONFIG.android);
    } else {
      // Desktop or unknown device
      setRedirectUrl(APP_CONFIG.fallback);
    }
    
    // Small delay to allow for state update and showing the loading message
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Perform the redirect
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [redirectUrl]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="text-center max-w-md bg-white p-8 rounded-lg shadow-lg border border-indigo-100">
        <div className="flex justify-center mb-4">
          <img 
            src="/assets/images/App-Icon-1024x1024@1x.png" 
            alt="Verse Pursuit Logo" 
            className="w-24 h-24 rounded-xl shadow-md" 
          />
        </div>
        <h1 className="text-2xl font-bold mb-3 text-indigo-800">{APP_CONFIG.appName}</h1>
        {isLoading ? (
          <div className="flex flex-col items-center mt-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600 mb-3"></div>
            <p className="text-gray-600">Preparing your download...</p>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-indigo-600 font-medium">Taking you to the App Store...</p>
          </div>
        )}
        <p className="text-sm text-gray-500 mt-4">You'll be redirected automatically in a moment</p>
      </div>
    </div>
  );
}
