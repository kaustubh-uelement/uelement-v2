'use client';
import { useState, useEffect } from 'react';
import { ReactIcons } from '@/utils/ReactIcons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { imgUrl } from '@/lib/imageUrl';

const HeroSectionV5 = () => {
  const slides = [
    'Architecting and Optimizing perfect Cloud Solutions.',
    'Empowering Security with Next-Gen Cyber Intelligence.',
    'Scaling AI-driven Innovation for Smarter Enterprises.',
  ];

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isPaused || !isMounted) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length, isPaused, isMounted]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const handleContactus = () => router.push('/contact');
  const handlePauseStart = () => setIsPaused(true);
  const handlePauseEnd = () => setIsPaused(false);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsPaused(false);
      return;
    }
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();
    setTouchStart(0);
    setTouchEnd(0);
    setIsPaused(false);
  };

  return (
    <section className="min-h-svh h-svh md:min-h-[92vh] md:h-[92vh] flex flex-col relative md:rounded-[28px] md:overflow-hidden">
      <div className="absolute -z-10 h-full w-full hidden md:block p-2">
        <div
          className="relative w-full h-full"
          style={{ clipPath: 'inset(0 round 30px)' }}
        >
          <Image
            src={imgUrl('/images/landing/hero_bg1.webp')}
            alt="hero_bg"
            className="object-fill"
            fill
            priority
          />
        </div>
      </div>

      {/* Mobile background */}
      <div className="absolute inset-0 -z-10 block md:hidden p-2">
        <div className="bg-hero-gradient w-full h-full rounded-[28px] relative overflow-hidden">
          <Image
            src={imgUrl('/images/landing/UElement-Mudra.png')}
            alt="Rudra"
            width={320}
            height={320}
            className="absolute bottom-15 right-0 object-contain opacity-80"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-h-0 w-full flex flex-col relative text-white pt-[72px] md:pt-[90px]">
        <div className="w-full flex flex-col md:flex-row flex-1 min-h-0 pb-0 md:pb-[26vh]">
          <div className="w-[80%] md:w-[39%] pl-[40px] md:pl-[70px] flex flex-col justify-center pt-[20vh] md:pt-0">
            <h1 className="fl-main italic tracking-wider leading-[1.2]">
              We are <br /> Digital <br className="md:block" /> Mavericks.
            </h1>
            <p className="mt-4 md:mt-8 fl3 !text-[#ffffff] !text-[12px] md:!text-[18px]">
              Engineering Digital Synapses at the Intersection of Cybersecurity,
              Quantum & AI
            </p>
            {/* Mobile About Us */}
            <button
              onClick={handleContactus}
              className="btn-yellow w-fit mt-6 md:!hidden"
            >
              About Us
            </button>
          </div>
          <div className="flex-1 hidden md:block" />
        </div>

        {/* Desktop bottom row */}
        <div className="absolute bottom-[10vh] right-8 left-0 hidden md:flex items-center justify-between pl-[70px]">
          <button
            onClick={handleContactus}
            className="btn-yellow w-fit flex-shrink-0"
          >
            About Us
          </button>

          <div
            className="w-[65vw] flex items-center bg-[#D4D4D41A] backdrop-blur-2xl rounded-[40px] px-1 py-1 shadow-lg z-50"
            onMouseEnter={handlePauseStart}
            onMouseLeave={handlePauseEnd}
          >
            <button
              onClick={prevSlide}
              className="size-10 bg-white rounded-full text-black text-2xl flex items-center justify-center hover:bg-gray-200 transition"
              aria-label="Previous slide"
            >
              {ReactIcons.leftChev}
            </button>
            <div className="flex-1 overflow-hidden min-h-10 flex items-center justify-center">
              <div
                className="flex transition-transform duration-500 ease-in-out w-full"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {slides.map((text, i) => (
                  <div
                    key={i}
                    className="min-w-full flex items-center justify-center"
                  >
                    <span className="fl4 text-center text-white">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={nextSlide}
              className="size-10 bg-white rounded-full text-black text-2xl flex items-center justify-center hover:bg-gray-200 transition"
              aria-label="Next slide"
            >
              {ReactIcons.rightChev}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slider */}
      <div
        className="absolute z-30 bottom-20 left-4 right-4 flex md:hidden items-center bg-[#D4D4D41A] backdrop-blur-2xl rounded-[40px] px-1 py-1 shadow-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={prevSlide}
          className="size-9 bg-white rounded-full text-black text-xl flex items-center justify-center flex-shrink-0 hover:bg-gray-200 transition"
          aria-label="Previous slide"
        >
          {ReactIcons.leftChev}
        </button>
        <div className="flex-1 overflow-hidden min-h-9 flex items-center justify-center mx-1">
          <div
            className="flex transition-transform duration-500 ease-in-out w-full"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((text, i) => (
              <div
                key={i}
                className="min-w-full flex items-center justify-center"
              >
                <span className="fl4 text-center text-white text-[11px] leading-tight px-1">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={nextSlide}
          className="size-9 bg-white rounded-full text-black text-xl flex items-center justify-center flex-shrink-0 hover:bg-gray-200 transition"
          aria-label="Next slide"
        >
          {ReactIcons.rightChev}
        </button>
      </div>

      {/* Notch — bottom-right, mobile only */}
      <svg
        className="md:hidden absolute pointer-events-none z-10"
        style={{ bottom: '8px', right: '8px' }}
        width="310"
        height="60"
        viewBox="0 0 302 59"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M49.73 0.5H310.5V59.5H0.34C7.72 58.02 12.68 54.97 16.12 50.95C21.03 45.21 22.75 37.58 24.11 30.09C25.47 22.54 26.47 15.16 29.84 9.64C31.51 6.89 33.76 4.62 36.94 3.03C40.12 1.43 44.26 0.5 49.73 0.5Z"
          fill="white"
          stroke="white"
        />
      </svg>
    </section>
  );
};

export default HeroSectionV5;
