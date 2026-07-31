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

const FooterV2 = () => {
  const pathname = usePathname();
  if (pathname === '/contact-us/') return null;

  return (
    <div className="relative overflow-hidden footer-outer">
      <div className="footer-flower">
        <img src="/u92-flower.png" alt="" aria-hidden="true" />
      </div>

      <ContactUs />
      <FooterContent />

      <div
        className="bg-hero-gradient container-padding py-3 sm:py-4"
        style={{
          borderTop: '1px solid transparent',
          borderImage:
            'linear-gradient(90deg, transparent, rgba(224, 167, 105, 0.4), transparent) 1',
        }}
      >
        <div className="max-w-[1100px] mx-auto w-full grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-14 items-center relative z-10">
          <p className="sm:col-span-3 font-heading text-[#808080] text-[14px] text-center sm:text-left">
            &copy; {new Date().getFullYear()} UElement Technologies Private
            Limited&nbsp; |&nbsp; All Rights Reserved.
          </p>
          <p
            className="sm:col-start-4 text-[15px] font-medium tracking-wider text-center sm:text-left sm:ml-3"
            style={{ color: 'var(--gold-500)' }}
          >
            सशक्त · सक्षम · सुरक्षित
          </p>
        </div>
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

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Accepts: +1234567890, 1234567890, (123) 456-7890, 123-456-7890
    const phoneRegex =
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          error = 'First name is required';
        } else if (value.trim().length < 2) {
          error = 'First name must be at least 2 characters';
        }
        break;

      case 'lastName':
        if (!value.trim()) {
          error = 'Last name is required';
        } else if (value.trim().length < 2) {
          error = 'Last name must be at least 2 characters';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!validatePhone(value)) {
          error = 'Please enter a valid phone number';
        }
        break;

      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 4) {
          error = 'Message must be at least 4 characters';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);

    // Return true if no errors
    return !Object.values(newErrors).some((error) => error !== '');
  };

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

      // Reset form after 3 seconds
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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
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
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const contactFormHandler = async (e) => {
    e.preventDefault();

    // Validate form
    const isValid = validateForm();

    if (!isValid) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill all required fields before submitting.',
      });
      return;
    }

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
        <div className="h-[60%] bg-[#F3F3F3]"></div>
        <div className="h-[40%] bg-hero-gradient"></div>
      </div>

      <div className="container-padding py-10 sm:py-12 lg:py-16">
        <div className="title-div text-primary-blue text-center mb-8 sm:mb-10 lg:mb-12">
          <p className="font-family-[--font-heading] text-center text-xl mb-2">
            {' '}
            / Contact Us
          </p>
          <h4 className="fl1 leading-tight mb-10 md:mb-14">
            Ready to Transform Your Enterprise?
          </h4>
          <p className="fl3 md:max-w-1/2 mx-auto leading-relaxed">
            Empower your enterprise with smarter, scalable security that adapts
            to new threats keeping your business safe, agile, and resilient.
          </p>
        </div>

        <div className="max-w-[1100px] mx-auto bg-white rounded-[20px] p-[8px] sm:p-[10px] grid grid-cols-1 lg:grid-cols-[40%_60%] shadow-[0px_4px_72.2px_0px_rgba(0,0,0,0.25)]">
          <div className="bg-[linear-gradient(154.11deg,#0C142D_20%,#274193_100%)] rounded-[18px] p-6 sm:p-8 lg:p-10 xl:p-12 text-white flex flex-col justify-start gap-8 lg:gap-16 relative overflow-hidden min-h-[350px]">
            <div className="absolute -bottom-8 -right-3 text-[160px] sm:text-[180px] lg:text-[200px] xl:text-[250px] font-bold text-[#488bf0]/8 select-none pointer-events-none leading-none font-heading!">
              92
            </div>

            <div className="relative z-10">
              <h5 className="fl1 !text-white">Contact Information</h5>
              <p className="text-[#C9C9C9] font-heading font-medium md:text-[18px] text-14 mt-2">
                Say something to start a live chat!
              </p>
            </div>

            <div className="flex flex-col gap-5 lg:gap-6 xl:gap-9 text-14 lg:text-16 relative z-10">
              <div className="flex items-center justify-start font-heading gap-3 lg:gap-4">
                <Icon name="phone" />
                <span>+91 762 069 0561</span>
              </div>
              <div className="flex items-center justify-start font-heading gap-3 lg:gap-4">
                <Icon name="email" />
                <span>contact@uelement.in</span>
              </div>
              <div className="flex items-start justify-start font-heading gap-3 lg:gap-4">
                <Icon name="location" />
                <span className="text-left leading-relaxed">
                  UElement Technologies Pvt. Ltd. 9th Floor, Pride Gateway, Sr.
                  No. 112, Baner, Pune.
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="p-4 sm:p-6 lg:p-8 xl:p-10 md:!pb-36 text-black">
            {/* Success/Error Message */}
            {submitStatus.message && (
              <div
                className={`mb-6 p-4 rounded-[4px] ${
                  submitStatus.type === 'success'
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
                    onBlur={handleBlur}
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-12 mt-1 font-heading">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <InputField
                    label="Last Name"
                    placeholder="Doe"
                    name="lastName"
                    value={formData.lastName}
                    onChangeHandler={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-12 mt-1 font-heading">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <InputField
                    label="Email"
                    placeholder="john@example.com"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChangeHandler={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-12 mt-1 font-heading">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <InputField
                    label="Phone Number"
                    placeholder="+1 012 3456 789"
                    name="phone"
                    type="number"
                    value={formData.phone}
                    onChangeHandler={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-12 mt-1 font-heading">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h6 className="font-heading text-[15px] font-semibold text-[#232223] mb-3">
                  Select Subject?{' '}
                  <span className="text-[#808080] font-normal">(Optional)</span>
                </h6>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Checkbox
                    label="OT Observability"
                    id="digitalTransformation"
                    checked={formData.subjects.digitalTransformation}
                    onChange={handleCheckboxChange}
                  />
                  <Checkbox
                    label="Quantum Security"
                    id="digitalTransformation"
                    checked={formData.subjects.digitalTransformation}
                    onChange={handleCheckboxChange}
                  />
                  <Checkbox
                    label="Enterprise Resilience"
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

              <div className="flex flex-col gap-2">
                <label className="font-heading text-[15px] font-semibold text-[#232223]">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Write your message.."
                  rows="1"
                  className={`w-full bg-transparent placeholder:text-[#808080] border-b outline-none focus:border-black font-heading text-[14px] text-[#232223] py-2 px-0 resize-none transition-colors ${
                    errors.message ? 'border-b-red-600' : 'border-b-[#D7D7D7]'
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-600 text-12 mt-1 font-heading">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center sm:justify-end items-center">
                {/* items-center prevents stretch */}
                <button
                  className="btn btn-gold"
                  onClick={() => router.push('/ai-ml')}
                >
                  Request a meeting
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
    <>
      <footer className="hidden md:block bg-hero-gradient pt-2 lg:pt-4 pb-4 md:pb-6 container-padding -mt-px">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-10">
          {/* 4 Columns spanning full width in 1 row */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-14">
            <div className="footer-links-group">
              <h6 className="font-semibold text-13 sm:text-14 font-heading text-[var(--gold-500)] mb-4 sm:mb-5 tracking-wider uppercase">
                MainSTAY
              </h6>
              <div className="flex flex-col gap-3 sm:gap-4 font-heading font-light">
                <Link
                  href="/mainstay"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:!text-white transition-colors"
                >
                  Program overview
                </Link>
                <Link
                  href="/mainstay#nexus"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">Nexus</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    The Enterprise Digital Fabric
                  </span>
                </Link>
                <Link
                  href="/mainstay#vizor"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">Vizor</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Observability · Security · GRC
                  </span>
                </Link>
                <Link
                  href="/mainstay#kayak"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">Kayak</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Everything as a Service
                  </span>
                </Link>
              </div>
            </div>

            <div className="footer-links-group">
              <h6 className="font-semibold text-13 sm:text-14 font-heading text-[var(--gold-500)] mb-4 sm:mb-5 tracking-wider uppercase">
                MainSPAR
              </h6>
              <div className="flex flex-col gap-3 sm:gap-4 font-heading font-light">
                <Link
                  href="/mainspar"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:!text-white transition-colors"
                >
                  Program overview
                </Link>
                <Link
                  href="/mainspar#merlinos"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">MerlinOS</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Sovereign edge AI OS
                  </span>
                </Link>
                <Link
                  href="/mainspar#mustangc3"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">MustangC3</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Agentic command & control
                  </span>
                </Link>
                <Link
                  href="/mainspar#mesogrid"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">MesoGRID</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Resilient decentralised mesh
                  </span>
                </Link>
              </div>
            </div>

            <div className="footer-links-group">
              <h6 className="font-semibold text-13 sm:text-14 font-heading text-[var(--gold-500)] mb-4 sm:mb-5 tracking-wider uppercase">
                U92 Quantum
              </h6>
              <div className="flex flex-col gap-3 sm:gap-4 font-heading font-light">
                <Link
                  href="/u92"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:!text-white transition-colors"
                >
                  Practice overview
                </Link>
                <Link
                  href="/u92#pqc"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">PQC</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Post-quantum cryptography
                  </span>
                </Link>
                <Link
                  href="/u92#qkd"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">QKD</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Quantum key distribution
                  </span>
                </Link>
                <Link
                  href="/u92#crypto-agility"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">
                    Crypto-Agility
                  </span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Axis · Codex · Crucible
                  </span>
                </Link>
              </div>
            </div>

            <div className="footer-links-group">
              <h6 className="font-semibold text-13 sm:text-14 font-heading text-[var(--gold-500)] uppercase mb-4 sm:mb-5 tracking-wider">
                COMPANY
              </h6>
              <div className="flex flex-col gap-3 sm:gap-4 font-heading font-light">
                <Link
                  href="/company"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/news"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  News Room
                </Link>
                <Link
                  href="/success-stories"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  Success Stories
                </Link>
                <Link
                  href="/our-partners"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  Partnerships
                </Link>
                <Link
                  href="/blogs"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  Blogs
                </Link>
                <Link
                  href="/investor-relations"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  Investor Relations
                </Link>
                <Link
                  href="/industries"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  Industries
                </Link>
                <Link
                  href="/careers"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  Careers
                </Link>
                <Link
                  href="/contact-us"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom section: Logo, Text & Social Icons under the 4th column */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-14 pt-6 ">
            <div className="sm:col-start-4 flex flex-col items-start gap-3">
              <img
                src="/icons/global/UElement_Tech_Logo_White.png"
                alt="UElement logo"
                className="w-auto max-w-[180px] md:mb-1"
              />
              <p className="text-[#808080] font-heading text-[13px] leading-relaxed">
                Empowering Secure Digital Transformation
              </p>
              <div className="flex items-center justify-start gap-4 mt-1">
                <Link
                  href="https://www.linkedin.com/company/uelement-technologies/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                >
                  <Icon name="linkedin2" size={32} />
                </Link>
                <Link
                  href="https://facebook.com/uelement.technologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                >
                  <Icon name="facebook3" size={32} />
                </Link>
                <Link
                  href="https://www.instagram.com/uelement_technologies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                >
                  <Icon name="instagram2" size={32} />
                </Link>
                <Link
                  href="https://x.com/uelement_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                >
                  <Icon name="facebook2" size={32} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="block md:hidden bg-hero-gradient pt-4 pb-8 container-padding -mt-px">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-8">
          {/* 4 columns section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 container-padding w-full">
            <div className="footer-links-group">
              <h6 className="font-semibold text-13 sm:text-14 font-heading text-[var(--gold-500)] uppercase mb-4 sm:mb-5 tracking-wider">
                MAINSTAY
              </h6>
              <div className="flex flex-col gap-3 sm:gap-4 font-heading font-light">
                <Link
                  href="/mainstay"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:!text-white transition-colors"
                >
                  Program overview
                </Link>
                <Link
                  href="/mainstay#nexus"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">Nexus</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    The Enterprise Digital Fabric
                  </span>
                </Link>
                <Link
                  href="/mainstay#vizor"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">Vizor</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Observability · Security · GRC
                  </span>
                </Link>
                <Link
                  href="/mainstay#kayak"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">Kayak</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Everything as a Service
                  </span>
                </Link>
              </div>
            </div>

            <div className="footer-links-group">
              <h6 className="font-semibold text-13 sm:text-14 font-heading text-[var(--gold-500)] uppercase mb-4 sm:mb-5 tracking-wider">
                MAINSPAR
              </h6>
              <div className="flex flex-col gap-3 sm:gap-4 font-heading font-light">
                <Link
                  href="/mainspar"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:!text-white transition-colors"
                >
                  Program overview
                </Link>
                <Link
                  href="/mainspar#merlinos"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">MerlinOS</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Sovereign edge AI OS
                  </span>
                </Link>
                <Link
                  href="/mainspar#mustangc3"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">MustangC3</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Agentic command & control
                  </span>
                </Link>
                <Link
                  href="/mainspar#mesogrid"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">MesoGRID</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Resilient decentralised mesh
                  </span>
                </Link>
              </div>
            </div>

            <div className="footer-links-group">
              <h6 className="font-semibold text-13 sm:text-14 font-heading text-[var(--gold-500)] uppercase mb-4 sm:mb-5 tracking-wider">
                U92 QUANTUM
              </h6>
              <div className="flex flex-col gap-3 sm:gap-4 font-heading font-light">
                <Link
                  href="/u92"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:!text-white transition-colors"
                >
                  Practice overview
                </Link>
                <Link
                  href="/u92#pqc"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">PQC</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Post-quantum cryptography
                  </span>
                </Link>
                <Link
                  href="/u92#qkd"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">QKD</span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Quantum key distribution
                  </span>
                </Link>
                <Link
                  href="/u92#crypto-agility"
                  className="group fl3 flex flex-col gap-0.5 !text-[#e2e2e2] hover:!text-white transition-colors"
                >
                  <span className="!text-[14px] !font-heading">
                    Crypto-Agility
                  </span>
                  <span className="text-[#808080] group-hover:text-[#a0a0a0] !text-[12px] font-normal tracking-wide">
                    Axis · Codex · Crucible
                  </span>
                </Link>
              </div>
            </div>

            <div className="footer-links-group">
              <h6 className="font-semibold text-13 sm:text-14 font-heading text-[var(--gold-500)] uppercase mb-4 sm:mb-5 tracking-wider">
                COMPANY
              </h6>
              <div className="flex flex-col gap-3 sm:gap-4 font-heading font-light">
                <Link
                  href="/company"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/news"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  News Room
                </Link>
                <Link
                  href="/success-stories"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  Success Stories
                </Link>
                <Link
                  href="/our-partners"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  Partnerships
                </Link>
                <Link
                  href="/blogs"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  Blogs
                </Link>
                <Link
                  href="/investor-relations"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  Investor Relations
                </Link>
                <Link
                  href="/industries"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  Industries
                </Link>
                <Link
                  href="/careers"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  Careers
                </Link>
                <Link
                  href="/contact-us"
                  className="fl3 !text-[#e2e2e2] !text-[14px] !font-heading hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Company details below */}
          <div className="company-details flex flex-col container-padding justify-center items-center pt-6 border-t border-white/10 text-center">
            <img
              src={imgUrl('/icons/global/UElement_Logo_White 3.svg')}
              alt="UElement logo"
              className="h-[30px] sm:h-[40px] w-auto mb-3 mx-auto"
            />
            <div className="flex items-center flex-col gap-3">
              <p className="text-[#808080] font-heading text-[12px]">
                Empowering Secure Digital Transformation
              </p>

              <div className="flex items-center justify-center gap-4">
                <Link
                  href="https://www.linkedin.com/company/uelement-technologies/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                >
                  <Icon name="linkedin2" size={32} />
                </Link>
                <Link
                  href="https://facebook.com/uelement.technologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                >
                  <Icon name="facebook3" size={32} />
                </Link>
                <Link
                  href="https://www.instagram.com/uelement_technologies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                >
                  <Icon name="instagram2" size={32} />
                </Link>
                <Link
                  href="https://x.com/uelement_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                >
                  <Icon name="facebook2" size={32} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterV2;
