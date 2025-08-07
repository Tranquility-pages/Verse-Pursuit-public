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
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
      <div className="text-center max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Redirecting you to {APP_CONFIG.appName}</h1>
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p>Detecting your device...</p>
          </div>
        ) : (
          <p>Taking you to the app store...</p>
        )}
      </div>
    </div>
  );
}
