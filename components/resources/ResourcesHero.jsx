'use client'
import Link from 'next/link';
import React from 'react';
import { imgUrl } from '@/lib/imageUrl';

const ResourcesHero = () => {
  return (
    <div className="container-padding pt-[75px]">
      <div className="py-[var(--section-block-padding)] mt-[var(--section-block-padding)] rounded-[4px] flex flex-col md:flex-row gap-y-6 bg-white">
        <div className="flex-1 flex flex-col justify-between pl-[var(--container-small-padding)]">
          <div>
            <h1 className="fl2 text-primary-blue md:w-[90%] w-full">
              Discover Tools, Insights, and Success Stories
            </h1>
            <p className="text-16 md:text-24 text-primary-blue mt-4 md:mt-8 md:w-[80%] w-full">
              Access whitepapers, case studies, and expert insights designed to
              help your business innovate and scale.
            </p>
          </div>
          <button
            className="btn-arrow block mt-6 mx-auto md:mx-0 "
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
        <div className="flex-1">
          <img
            src={imgUrl('/images/resources/resources_hero.jpg')}
            alt="resources"
            className="max-w-[90%] mx-auto rounded-[4px] shadow-left-down"
          />
        </div>
      </div>
    </div>
  );
};

export default ResourcesHero;
