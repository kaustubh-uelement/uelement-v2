"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2.8 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2800);

    // Remove from DOM completely after fade out completes
    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 3300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  const textArray = [
    "स", "श", "क्त",
    " ", "·", " ",
    "स", "क्ष", "म",
    " ", "·", " ",
    "सु", "र", "क्षि", "त"
  ];
  
  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050f24] overflow-hidden transition-opacity duration-700 ease-in-out ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background Flower Image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image 
          src="/u92-flower.png"
          alt="Splash Background"
          width={800}
          height={800}
          className="w-[360px] h-[360px] md:w-[630px] md:h-[630px] object-contain opacity-25 animate-[spin_60s_linear_infinite]"
          priority
        />
      </div>

      {/* Main Content Wrapper */}
      <div className="relative flex flex-col items-center justify-center gap-6 md:gap-10 z-10">
        
        {/* Top Glowing Line */}
        <div className="relative flex items-center justify-center w-[250px] md:w-[400px]">
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-500)] to-transparent opacity-60"></div>
          <div className="absolute w-[4px] h-[4px] rounded-full bg-[#ffeba1] shadow-[0_0_12px_3px_var(--gold-500)] animate-pulse"></div>
        </div>

        {/* Text */}
        <div className="text-[var(--gold-500)] text-xl sm:text-2xl md:text-3xl font-medium tracking-[4px] md:tracking-[8px] pl-[4px] md:pl-[8px] text-center translate-x-[6px] md:translate-x-[12px] -translate-y-[6px] md:-translate-y-[8px]">
          {textArray.map((char, index) => (
            <span
              key={index}
              className="inline-block opacity-0 translate-y-2 animate-letter-reveal"
              style={{ 
                animationDelay: `${index * 0.08}s`,
                animationFillMode: 'forwards' 
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Bottom Glowing Line */}
        <div className="relative flex items-center justify-center w-[250px] md:w-[400px]">
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-500)] to-transparent opacity-60"></div>
          <div className="absolute w-[4px] h-[4px] rounded-full bg-[#ffeba1] shadow-[0_0_12px_3px_var(--gold-500)] animate-pulse"></div>
        </div>
      </div>

      
    </div>
  );
}
