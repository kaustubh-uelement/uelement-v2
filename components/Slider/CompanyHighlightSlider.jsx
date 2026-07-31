'use client';

import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CompanyHighlightSlider = ({ data }) => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getDotSize = (dotIndex) => {
    const distance = Math.abs(activeIndex - dotIndex);
    if (distance === 0) return 16;
    if (distance === 1) return 12;
    if (distance === 2) return 8;
    return 5;
  };

  const settings = {
    dots: false, // manual dots outside slider
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: false,
    fade: true,
    speed: 600,
    beforeChange: (_, next) => setActiveIndex(next),
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="relative px-0 md:px-2 pb-2 pt-1 ">
      {data[activeIndex]?.date && (
        <p className="absolute top-0 right-4 md:right-0 font-reddit-sans text-13 md:text-14 text-primary-blue font-bold z-10">
          Date:{' '}
          <span className="text-primary-blue font-bold">
            {data[activeIndex].date}
          </span>
        </p>
      )}
      <Slider ref={sliderRef} {...settings}>
        {data.map((item) => (
          <div key={item.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
              {/* Left — Image */}
              <div
                className="relative rounded-[18px] overflow-visible"
                style={{ marginTop: '62px' }}
              >
                <p
                  className="absolute left-0 right-0 z-10 text-center select-none pointer-events-none font-semibold font-noto-sans text-[#36363622] text-[44px] sm:text-[28px] md:text-[38px] lg:text-[56px] xl:text-[68px] leading-none tracking-wider"
                  style={{ bottom: '100%', transform: 'translateY(12%)' }}
                >
                  HIGHLIGHTS
                </p>
                <img
                  src={item.image}
                  alt={item.title}
                  className="relative z-0 w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[360px] object-cover rounded-[18px]"
                />
              </div>

              {/* Right — Content */}
              <div className="flex flex-col justify-between items-center md:items-start h-[220px] sm:h-[280px] md:h-[340px] lg:h-[360px] mt-6 sm:mt-8 md:mt-[62px]">
                <div className="flex flex-col gap-4 md:gap-6">
                  <h2 className="fl1 !text-[#232223] text-center md:text-start leading-snug">
                    {item.title}
                  </h2>
                  <p className="fl3 text-[#555555] text-center md:text-start leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div>
                  <button
                    className="btn-arrow mt-4 !hidden lg:!block"
                    onClick={() => router.push('/contact')}
                  >
                    <span
                      className="btn-arrow-circle bg-hero-gradient"
                      aria-hidden="true"
                    >
                      <span className="btn-arrow-icon" />
                    </span>
                    <span className="btn-arrow-text">Learn More</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Dots OUTSIDE Slider */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-4">
        <div className="flex justify-center items-center gap-2">
          {data.map((_, i) => {
            const size = getDotSize(i);
            return (
              <div
                key={i}
                onClick={() => sliderRef.current?.slickGoTo(i)}
                className="cursor-pointer flex items-center justify-center flex-shrink-0"
                style={{ width: '20px', height: '20px' }}
              >
                <div
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    backgroundColor: i === activeIndex ? '#0C142D' : '#ABABAB',
                    transition: 'all 0.3s ease',
                    flexShrink: 0,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div></div>
      </div> */}
    </div>
  );
};

export default CompanyHighlightSlider;
