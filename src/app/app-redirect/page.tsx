"use client";

import { useEffect, useState } from "react";

const APP_CONFIG = {
  iOS: "https://apps.apple.com/ca/app/verse-pursuit/id6743778976",
  android: "https://play.google.com/store/apps/details?id=com.versepursuit.app",
  appName: "Verse Pursuit",
  tagline: "Pursue. Learn. Grow.",
};

type DeviceType = "iOS" | "android" | "desktop" | null;

export default function AppRedirect() {
  const [device, setDevice] = useState<DeviceType>(null);
  
  useEffect(() => {
    const detectDevice = (): DeviceType => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      
      if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return "iOS";
      }
      if (/android/i.test(userAgent)) {
        return "android";
      }
      return "desktop";
    };

    const detectedDevice = detectDevice();
    setDevice(detectedDevice);
    
    // Immediately redirect mobile users to the appropriate store
    // Universal Links will intercept this and open the app if installed
    if (detectedDevice === "iOS") {
      window.location.href = APP_CONFIG.iOS;
    } else if (detectedDevice === "android") {
      window.location.href = APP_CONFIG.android;
    }
  }, []);

  // Show loading state while detecting device
  if (device === null) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: `linear-gradient(135deg, #8B4513 0%, #D2691E 25%, #DEB887 50%, #F5DEB3 75%, #FAEBD7 100%)`,
        }}
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white text-lg font-medium drop-shadow-lg">
            Redirecting...
          </p>
        </div>
      </div>
    );
  }

  // Mobile users should be redirected, but show fallback just in case
  if (device === "iOS" || device === "android") {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: `linear-gradient(135deg, #8B4513 0%, #D2691E 25%, #DEB887 50%, #F5DEB3 75%, #FAEBD7 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white text-lg font-medium drop-shadow-lg">
            Taking you to the {device === "iOS" ? "App Store" : "Play Store"}...
          </p>
          <a 
            href={device === "iOS" ? APP_CONFIG.iOS : APP_CONFIG.android}
            className="text-yellow-300 underline mt-4 block"
          >
            Click here if not redirected
          </a>
        </div>
      </div>
    );
  }

  // Desktop: Show both store options
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(135deg, #8B4513 0%, #D2691E 25%, #DEB887 50%, #F5DEB3 75%, #FAEBD7 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
      
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/assets/backgrounds/game_background_desktop.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply'
        }}
      ></div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border-2 border-yellow-400/30 shadow-2xl">
          
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/40 rounded-2xl blur-xl scale-110"></div>
              <img 
                src="/assets/images/App-Icon-1024x1024@1x.png" 
                alt="Verse Pursuit" 
                className="relative w-28 h-28 rounded-2xl shadow-2xl border-2 border-yellow-400/50" 
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-2xl mb-2">
              {APP_CONFIG.appName}
            </h1>
            <p className="text-yellow-300 font-medium tracking-wide drop-shadow-lg">
              {APP_CONFIG.tagline}
            </p>
          </div>

          <p className="text-white/90 text-center mb-6 drop-shadow-lg">
            Download the app to start your Scripture journey
          </p>
          
          <div className="space-y-4">
            <a
              href={APP_CONFIG.iOS}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black py-4 px-6 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-xl border-2 border-yellow-300/50 font-bold"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>Download on App Store</span>
            </a>

            <a
              href={APP_CONFIG.android}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-black/70 hover:bg-black/90 text-white py-4 px-6 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-xl border border-white/20 font-bold"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <span>Get it on Google Play</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-yellow-400/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl mb-1">📖</div>
                <div className="text-white/80 text-xs">Learn Scripture</div>
              </div>
              <div>
                <div className="text-2xl mb-1">🎮</div>
                <div className="text-white/80 text-xs">Fun Gameplay</div>
              </div>
              <div>
                <div className="text-2xl mb-1">👥</div>
                <div className="text-white/80 text-xs">Play Together</div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-white/70 text-sm mt-6 drop-shadow-lg italic">
          "Thy word have I hid in mine heart" — Psalm 119:11
        </p>
      </div>
    </div>
  );
}
