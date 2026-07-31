'use client';
import { useRouter } from 'next/navigation';
import { imgUrl } from '@/lib/imageUrl';

const UelementRoot = () => {
  const router = useRouter();
  return (
    <div className="container-small py-10 xl:py-16">
      <img
        src={imgUrl('/icons/global/dark-logo.svg')}
        alt="logo"
        className="h-[75px] md:w-[300px] 2xl:w-[450px] mb-5 md:mb-10 mx-auto"
      />
      <div className="flex flex-col md:flex-row gap-10 md:gap-[50px] 2xl:gap-[65px]">
        <div className="flex-1">
          <h4 className="fl2 !font-medium mt-5 mb-4">
            Identity and Core Focus
          </h4>
          <p className="fl3 mb-3 md:w-[100%] w-full">
            UElement Technologies is built by technologists and system
            architects driven by a single purpose solving complex digital
            challenges with clarity precision and scale. Operating at the
            convergence of Cybersecurity Cloud and AI we design integrated
            technology ecosystems that are secure intelligent and future ready.
            As a full stack technology partner we remove the friction of
            managing multiple vendors by delivering seamless end to end
            solutions under one unified strategy. Beyond strengthening today’s
            digital foundations our focus extends toward shaping what’s next
            actively advancing capabilities in Quantum Computing and emerging
            technologies to help organizations stay resilient in an ever
            evolving digital landscape.
          </p>
          <h4 className="fl2 !font-medium mb-4 mt-8">
            The Action-Driven Approach
          </h4>
          <p className="fl3 mb-3 md:w-[100%] w-full">
            Execution proves strategy's value with a builder's outcome-focused
            mindset. Unifying Cybersecurity, Cloud, and AI simplifies
            complexity, speeds decisions, ensures accountability—driving faster
            deployments, stronger security, and scalable growth. We strengthen
            operations today and prepare for tomorrow with Quantum Computing
          </p>
        </div>
        <div className="flex-1 bg-[#f3f3f3] p-6 rounded-[4px]">
          <img
            src={imgUrl('/images/company/behind-idea.jpg')}
            alt="image"
            className="w-full rounded-[4px]"
          />

          <button
            className="btn-arrow block mt-6 mx-auto "
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
  );
};

export default UelementRoot;
