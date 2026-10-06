'use client';
import { ReactIcons } from '@/utils/ReactIcons';
import Link from 'next/link';
import Checkbox from '../formElements/Checkbox/Checkbox';
import InputField from '../formElements/InputField/InputField';
import Icon from '../resources/Icon';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import useWeb3Forms from '@web3forms/react';
import { imgUrl } from '@/lib/imageUrl';

const Footer = () => {
  const pathname = usePathname();
  if (pathname === '/contact-us') return null;

  return (
    <div>
      <ContactUs />
      <FooterContent />
      <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-primary-blue container-padding py-8 lg:py-12">
        <div className="flex flex-wrap gap-3 sm:gap-5 lg:gap-8 justify-center sm:justify-start text-center">
          <Link
            href="/company"
            className="font-reddit-sans text-[#808080] text-13 sm:text-16 hover:text-white transition-colors"
          >
            About us
          </Link>
          <Link
            href="/contact"
            className="font-reddit-sans text-[#808080] text-13 sm:text-16 hover:text-white transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/legal?page=privacy"
            className="font-reddit-sans text-[#808080] text-13 sm:text-16 hover:text-white transition-colors"
          >
            Privacy policy
          </Link>
          <Link
            href="/legal?page=sitemap"
            className="font-reddit-sans text-[#808080] text-13 sm:text-16 hover:text-white transition-colors"
          >
            Sitemap
          </Link>
          <Link
            href="/legal?page=terms"
            className="font-reddit-sans text-[#808080] text-13 sm:text-16 hover:text-white transition-colors"
          >
            Terms of Use
          </Link>
        </div>
        <p className="font-reddit-sans text-[#808080] text-13 sm:text-16">
          © 2025, All Rights Reserved
        </p>
      </div>
    </div>
  );
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    subjects: {
      cyberSecurity: false,
      enterpriseCloud: false,
      artificialIntelligence: false,
      digitalTransformation: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Web3Forms Integration
  const { submit } = useWeb3Forms({
    access_key: '5f0b55f8-1ed0-46cd-a518-c13ca9686c6f',
    settings: {
      from_name: 'UElement Contact Form',
      subject: 'New Contact Form Submission from Website',
    },
    onSuccess: (message) => {
      console.log('Success:', message);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.',
      });
      setIsSubmitting(false);

      // Reset form after 3 second
      setTimeout(() => {
        resetForm();
        setSubmitStatus({ type: '', message: '' });
      }, 3000);
    },
    onError: (message) => {
      console.log('Error:', message);
      setSubmitStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again.',
      });
      setIsSubmitting(false);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [id]: checked,
      },
    }));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      subjects: {
        cyberSecurity: false,
        enterpriseCloud: false,
        artificialIntelligence: false,
        digitalTransformation: false,
      },
    });
  };

  const contactFormHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // Get selected subjects as a comma-separated string
    const selectedSubjects = Object.keys(formData.subjects)
      .filter((key) => formData.subjects[key])
      .map((key) => key.replace(/([A-Z])/g, ' $1').trim())
      .join(', ');

    // Prepare data for Web3Forms
    const submissionData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      subjects: selectedSubjects || 'None selected',
    };

    await submit(submissionData);
  };

  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="h-[60%] bg-[#F3F3F3] mx-2"></div>
        <div className="h-[40%] bg-primary-blue"></div>
      </div>

      <div className="container-padding py-10 sm:py-12 lg:py-16">
        <div className="title-div text-primary-blue text-center mb-8 sm:mb-10 lg:mb-12">
          <p className="kicker">/ Contact Us</p>
          <h4 className="fl1 leading-tight mb-10 md:mb-14">
            Ready to Transform Your Enterprise Security?
          </h4>
          <p className="fl3 md:max-w-1/2 mx-auto leading-relaxed">
            Empower your enterprise with smarter, scalable security that adapts
            to new threats—keeping your business safe, agile, and resilient.
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto bg-white rounded-[4px] p-[8px] sm:p-[10px] grid grid-cols-1 lg:grid-cols-[40%_60%] shadow-[0px_4px_72.2px_0px_rgba(0,0,0,0.25)]">
          <div className="bg-red-900 rounded-[4px] p-6 sm:p-8 lg:p-10 xl:p-12 text-white flex flex-col justify-start gap-8 lg:gap-16 relative overflow-hidden min-h-[350px]">
            <div className="absolute -bottom-8 -right-3 text-[160px] sm:text-[180px] lg:text-[200px] xl:text-[250px] font-bold text-[#111f3f] select-none pointer-events-none leading-none">
              92
            </div>

            <div className="relative z-10">
              <h5 className="fl1 !text-white">Contact Information</h5>
              <p className="text-[#C9C9C9] font-reddit-sans font-medium md:text-[18px] text-14 mt-2">
                Say something to start a live chat!
              </p>
            </div>

            <div className="flex flex-col gap-5 lg:gap-6 xl:gap-9 text-14 lg:text-16 relative z-10">
              <div className="flex items-center justify-start font-reddit-sans gap-3 lg:gap-4">
                <Icon name="phone" />
                <span>+91 762 069 0561</span>
              </div>
              <div className="flex items-center justify-start font-reddit-sans gap-3 lg:gap-4">
                <Icon name="email" />
                <span>contact@uelement.co</span>
              </div>
              <div className="flex items-start justify-start font-reddit-sans gap-3 lg:gap-4">
                <Icon name="location" />
                <span className="text-left leading-relaxed">
                  UElement Technologies Pvt. Ltd. 9th Floor, Pride Gateway, Sr.
                  No. 112, Baner, Pune,
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
            {/* Success/Error Message */}
            {submitStatus.message && (
              <div
                className={`mb-6 p-4 rounded-[4px] ${submitStatus.type === 'success'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-red-100 text-red-700 border border-red-300'
                  }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form
              autoComplete="off"
              className="flex flex-col gap-5 lg:gap-7"
              onSubmit={contactFormHandler}
            >
              <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
                <div>
                  <InputField
                    label="First Name"
                    placeholder="John"
                    name="firstName"
                    value={formData.firstName}
                    onChangeHandler={handleInputChange}
                  />
                </div>
                <div>
                  <InputField
                    label="Last Name"
                    placeholder="Doe"
                    name="lastName"
                    value={formData.lastName}
                    onChangeHandler={handleInputChange}
                  />
                </div>
                <div>
                  <InputField
                    label="Email"
                    placeholder="john@example.com"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChangeHandler={handleInputChange}
                  />
                </div>
                <div>
                  <InputField
                    label="Phone Number"
                    placeholder="+1 012 3456 789"
                    name="phone"
                    value={formData.phone}
                    onChangeHandler={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <h6 className="font-reddit-sans font-semibold text-13 sm:text-14 text-black mb-3">
                  Select Subject?
                </h6>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Checkbox
                    label="Cyber security"
                    id="cyberSecurity"
                    checked={formData.subjects.cyberSecurity}
                    onChange={handleCheckboxChange}
                  />
                  <Checkbox
                    label="Enterprise Cloud"
                    id="enterpriseCloud"
                    checked={formData.subjects.enterpriseCloud}
                    onChange={handleCheckboxChange}
                  />
                  <Checkbox
                    label="Artificial Intelligence"
                    id="artificialIntelligence"
                    checked={formData.subjects.artificialIntelligence}
                    onChange={handleCheckboxChange}
                  />
                  <Checkbox
                    label="Digital Transformation"
                    id="digitalTransformation"
                    checked={formData.subjects.digitalTransformation}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>

              <div>
                <label className="font-reddit-sans text-12 sm:text-13 font-medium text-black block mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message.."
                  rows="1"
                  className="w-full placeholder:text-gray-8080 border-b border-b-[#D7D7D7] font-reddit-sans text-14 py-2 resize-none focus:border-primary-blue transition-colors"
                ></textarea>
              </div>

              <div className="flex justify-center sm:justify-end">
                <button
                  className="btn-yellow hover:scale-101 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Request a meeting'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const FooterContent = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState({
    type: '',
    message: '',
  });

  // Web3Forms hook for newsletter
  const { submit: submitNewsletter } = useWeb3Forms({
    access_key: '5f0b55f8-1ed0-46cd-a518-c13ca9686c6f',
    settings: {
      from_name: 'UElement Newsletter',
      subject: 'New Newsletter Subscription from Website',
    },
    onSuccess: (message, data) => {
      console.log('Newsletter success:', message, data);
      setNewsletterStatus({
        type: 'success',
        message: 'Thanks for subscribing to our newsletter.',
      });
      setNewsletterSubmitting(false);
      setNewsletterEmail('');
      setTimeout(() => {
        setNewsletterStatus({ type: '', message: '' });
      }, 3000);
    },
    onError: (message, data) => {
      console.log('Newsletter error:', message, data);
      setNewsletterStatus({
        type: 'error',
        message: 'Subscription failed. Please try again.',
      });
      setNewsletterSubmitting(false);
    },
  });

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterSubmitting(true);
    setNewsletterStatus({ type: '', message: '' });

    const data = {
      email: newsletterEmail,
      form_type: 'Newsletter Subscription',
    };

    await submitNewsletter(data);
  };
  return (
    <footer className="bg-primary-blue pt-2 lg:pt-4 pb-6 container-padding">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 pb-8 sm:pb-10 lg:pb-12">
          {/* Company Details */}
          <div className="company-details">
            <img
              src={imgUrl('/icons/global/UElement_Logo_White 3.svg')}
              alt="UElement logo"
              className="h-[35px] sm:h-[48px] w-auto mb-4 mb-20"
            />
            <p className="text-[#808080] font-reddit-sans text-[14px] mb-6 sm:mb-8 ">
              Empowering Secure Digital Transformation
            </p>

            <div className="flex items-center justify-start gap-6">
              <Link
                href="https://www.linkedin.com/company/uelement-technologies/posts/?feedView=all"
                className=" hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
              >
                <Icon name="linkedin" size={35} />
              </Link>
              {/* <Link
                href="#"
                className="  hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
              >
                <Icon name="facebook" size={35} />
              </Link> */}
              <Link
                href="https://www.instagram.com/u_element_india?igsh=MTZtejZ4djB4MHdqbw=="
                className="  hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
              >
                <Icon name="instagram" size={35} />
              </Link>
              {/* <Link
                href="#"
                className="  hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
              >
                <Icon name="twitter" size={35} />
              </Link> */}
              {/* <Link
                href="#"
                className="  hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
              >
                <Icon name="youtube" size={35} />
              </Link> */}
              {/* <Link
                href="#"
                className="  hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
              >
                <Icon name="github" size={35} />
              </Link> */}
            </div>
          </div>

          <div className="flex flex-row md-flex-col justify-center gap-32 md:gap-20 my-6 md:my-0">
            {/* Company Links */}
            <div className="company-links">
              <h6 className=" font-semibold text-14 sm:text-22 font-reddit-sans text-white uppercase mb-4 sm:mb-5">
                COMPANY
              </h6>
              <div className="flex flex-col gap-3 sm:gap-4 font-reddit-sans font-light">
                <Link
                  href="/company"
                  className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                >
                  Partnerships
                </Link>
                {/* <Link
                  href="/our-partners"
                  className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                >
                  Partners
                </Link> */}
              </div>
            </div>

            {/* Resources Links */}
            <div className="resources-links">
              <h6 className=" font-semibold text-14 sm:text-22 font-reddit-sans text-white uppercase mb-4 sm:mb-5">
                RESOURCES
              </h6>
              <div className="flex flex-col gap-3 sm:gap-4 font-reddit-sans font-light">
                <Link
                  href="/resources"
                  className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                >
                  Free eBooks
                </Link>
                <Link
                  href="/resources"
                  className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                >
                  Development Tutorial
                </Link>
                <Link
                  href="/resources"
                  className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                >
                  How to - Blog
                </Link>
                <Link
                  href="/resources"
                  className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                >
                  Youtube Playlist
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="newsletter ml-auto">
            <h6 className=" font-semibold text-14 sm:text-22 font-reddit-sans text-white uppercase mb-4 sm:mb-5">
              NEWSLETTER
            </h6>

            {newsletterStatus.message && (
              <div
                className={`mb-3 rounded-[4px] px-3 py-2 text-13 sm:text-14 ${newsletterStatus.type === 'success'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-red-100 text-red-700 border border-red-300'
                  }`}
              >
                {newsletterStatus.message}
              </div>
            )}

            <form
              className="w-[350px] space-y-3"
              onSubmit={handleNewsletterSubmit}
            >
              <div className="relative bg-white rounded-[4px] px-4 py-3 flex items-center gap-2">
                <span className="text-gray-400 text-16">
                  {ReactIcons.email}
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Email Address"
                  className="font-reddit-sans text-13 sm:text-14 text-gray-700 w-full placeholder:text-gray-400 outline-none"
                />
              </div>
              <button
                className="btn-yellow w-full hover:scale-101 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={newsletterSubmitting}
              >
                {newsletterSubmitting ? 'Submitting...' : 'Submit Now'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
