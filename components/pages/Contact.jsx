'use client';
import { ReactIcons } from '@/utils/ReactIcons';
import Link from 'next/link';
import Checkbox from '../formElements/Checkbox/Checkbox';
import InputField from '../formElements/InputField/InputField';
import Icon from '../resources/Icon';
import { useState } from 'react';
import useWeb3Forms from '@web3forms/react';
import { imgUrl } from '@/lib/imageUrl';

const Contact = () => {
  return (
    <div>
      <div className="bg-hero-gradient">
        <ContactUs />
        <DirectChannels />
        <LocationMap />
        <ContactFAQ />
        <FooterContent />
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 container-padding py-8 lg:py-12">
          <div className="flex flex-wrap gap-3 sm:gap-5 lg:gap-8 justify-center sm:justify-start text-center">
            <Link
              href="/about"
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
      <div className="absolute inset-0 z-0">
        <div className="h-[60%] bg-[#F3F3F3]"></div>
        <div className="h-[40%]"></div>
      </div>

      <div className="container-padding pt-25 pb-10 sm:pt-26 sm:pb-10 lg:pt-30 lg:pb-10 relative z-10">
        <div className="title-div text-primary-blue text-center mb-8 sm:mb-10 lg:mb-12">
          <p className="kicker" >Contact Us </p>
          <h4 className="fl1 leading-tight mb-10 md:mb-14">
            Ready to Transform Your Enterprise Security?
          </h4>
          <p className="fl3 md:max-w-1/2 mx-auto leading-relaxed">
            Empower your enterprise with smarter, scalable security that adapts
            to new threats—keeping your business safe, agile, and resilient.
          </p>
        </div>

        <div className="max-w-[1100px] mx-auto bg-white rounded-[20px] p-[8px] sm:p-[10px] grid grid-cols-1 lg:grid-cols-[40%_60%] shadow-[0px_4px_72.2px_0px_rgba(0,0,0,0.25)]">
          <div className="bg-[linear-gradient(154.11deg,#0C142D_20%,#274193_100%)] rounded-[18px] p-6 sm:p-8 lg:p-10 xl:p-12 text-white flex flex-col justify-start gap-8 lg:gap-16 relative overflow-hidden min-h-[350px]">
            <div className="absolute -bottom-8 -right-3 text-[160px] sm:text-[180px] lg:text-[200px] xl:text-[250px] font-bold text-[#488bf0]/8 select-none pointer-events-none leading-none">
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
                <span>contact@uelement.in</span>
              </div>
              <div className="flex items-start justify-start font-reddit-sans gap-3 lg:gap-4">
                <Icon name="location" />
                <span className="text-left leading-relaxed">
                  UElement Technologies Pvt. Ltd. 9th Floor, Pride Gateway, Sr.
                  No. 112, Baner, Pune.
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="p-4 sm:p-6 lg:p-8 xl:p-10 md:!pb-36">
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
                    onBlur={handleBlur}
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-12 mt-1 font-reddit-sans">
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
                    <p className="text-red-600 text-12 mt-1 font-reddit-sans">
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
                    <p className="text-red-600 text-12 mt-1 font-reddit-sans">
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
                    <p className="text-red-600 text-12 mt-1 font-reddit-sans">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h6 className="font-reddit-sans font-semibold text-13 sm:text-14 text-black mb-3">
                  Select Subject?{' '}
                  <span className="text-gray-400 font-normal">(Optional)</span>
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
                  onBlur={handleBlur}
                  placeholder="Write your message.."
                  rows="1"
                  className={`w-full placeholder:text-gray-8080 border-b ${errors.message ? 'border-b-red-600' : 'border-b-[#D7D7D7]'
                    } font-reddit-sans text-14 py-2 resize-none focus:border-primary-blue transition-colors`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-600 text-12 mt-1 font-reddit-sans">
                    {errors.message}
                  </p>
                )}
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

/* ── DirectChannels ─────────────────────────────────────────── */
const channels = [
  {
    title: 'New business',
    description: 'Scoping a project or evaluating a partner.',
    contact: 'contact@uelement.in',
    href: 'mailto:contact@uelement.in',
    icon: 'email',
  },
  {
    title: 'Security incidents',
    description: 'Active incident or urgent vulnerability report.',
    contact: '+91 762 069 0561',
    href: 'tel:+917620690561',
    icon: 'phone',
  },
  {
    title: 'Careers',
    description: 'Open roles across quantum, platform, and AI engineering.',
    contact: 'careers@uelement.in',
    href: 'mailto:careers@uelement.in',
    icon: 'email',
  },
];

const DirectChannels = () => {
  return (
    <section className="container-padding py-10 sm:py-14 lg:py-18 relative z-10">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-10">
          <p className="fl-slash">/ Direct channels</p>
          <h4 className="fl1 !text-white">Know what you need?</h4>
          <p className="font-reddit-sans text-[#8a9bb3] text-14 mt-2 max-w-[480px] mx-auto leading-relaxed">
            Route straight to the right inbox — no general queue.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
          {channels.map((channel) => (
            <Link
              key={channel.title}
              href={channel.href}
              className="group relative rounded-[18px] p-6 lg:p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1"
              style={{
                background:
                  'linear-gradient(154.11deg,#0C142D 20%,#1a2d5a 100%) padding-box, linear-gradient(135deg,rgba(200,138,62,0.35),rgba(255,255,255,0.06) 50%,rgba(200,138,62,0.12)) border-box',
                border: '1px solid transparent',
              }}
            >
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg,rgba(200,138,62,0.18),rgba(200,138,62,0.06))',
                  border: '1px solid rgba(200,138,62,0.28)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <Icon name={channel.icon} />
              </span>
              <div className="flex-1">
                <h6 className="font-reddit-sans font-semibold text-white text-16 lg:text-17 mb-2">
                  {channel.title}
                </h6>
                <p className="font-reddit-sans text-[#6b809a] text-13 leading-relaxed">
                  {channel.description}
                </p>
              </div>
              <span
                className="font-reddit-sans text-13 font-medium group-hover:translate-x-1 transition-transform inline-block"
                style={{ color: '#c88a3e' }}
              >
                {channel.contact} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── LocationMap ─────────────────────────────────────────────── */
const LocationMap = () => {
  return (
    <section className="container-padding pb-12 sm:pb-16 lg:pb-20 relative z-10">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-10">
          <p className="fl-slash">/ Find us</p>
          <h4 className="fl1 !text-white">Three offices. One standard.</h4>
        </div>
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] rounded-[20px] overflow-hidden"
          style={{ border: '1px solid rgba(200,138,62,0.22)' }}
        >
          <div
            className="p-7 sm:p-8 lg:p-10 flex flex-col justify-between gap-8"
            style={{ background: 'linear-gradient(154.11deg,#0C142D 20%,#1a2d5a 100%)' }}
          >
            <div>
              <span
                className="inline-block font-reddit-sans text-11 uppercase tracking-widest mb-5"
                style={{ color: '#c88a3e', letterSpacing: '0.12em' }}
              >
                Global headquarters
              </span>
              <h5 className="fl1 !text-white mb-3">Pune, India</h5>
              <p className="font-reddit-sans text-[#8a9bb3] text-14 leading-relaxed mb-5">
                UElement Technologies Pvt. Ltd.<br />
                9th Floor, Pride Gateway, Sr. No. 112,<br />
                Baner, Pune, Maharashtra 411045.
              </p>
              <Link
                href="https://www.google.com/maps/search/?api=1&query=Pride+Gateway+Baner+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="font-reddit-sans text-13 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
                style={{ color: '#c88a3e' }}
              >
                Get directions →
              </Link>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20 }}>
              <p className="font-reddit-sans text-11 uppercase tracking-widest text-[#6b809a] mb-4">Also in</p>
              <div className="flex flex-col gap-3">
                {[{ city: 'Singapore', role: 'JAPAC Operations' }, { city: 'UAE', role: 'Middle East' }].map((o) => (
                  <div key={o.city} className="flex items-center justify-between">
                    <span className="font-reddit-sans text-14 text-white font-medium">{o.city}</span>
                    <span className="font-reddit-sans text-12 text-[#6b809a]">{o.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="min-h-[300px] lg:min-h-[420px]">
            <iframe
              title="UElement Technologies office location — Baner, Pune"
              src="https://www.google.com/maps?q=Pride+Gateway,+Baner,+Pune&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px', display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── ContactFAQ ─────────────────────────────────────────────── */
const faqItems = [
  {
    q: 'How soon will someone get back to me?',
    a: 'Our monitoring desk logs every enquiry the moment it lands. A specialist in the relevant practice — quantum security, enterprise platforms, or edge autonomy — typically responds within one business day, and sooner for flagged incidents.',
  },
  {
    q: 'Do you sign an NDA before discussing our environment?',
    a: 'Yes. All scoping conversations are covered under a mutual NDA by default, so you can speak openly about your architecture and constraints from the first call.',
  },
  {
    q: 'What does a first engagement usually look like?',
    a: 'Most engagements start with a short discovery call to understand your environment and goals, followed by a scoped proposal. There is no obligation to continue past discovery.',
  },
  {
    q: 'Do you work with teams outside India?',
    a: 'Yes, we support clients across time zones — from Pune HQ, Singapore, and UAE — with a mix of remote delivery and on-site visits where the engagement calls for it.',
  },
  {
    q: 'Can you support an ongoing retainer, not just one-off projects?',
    a: 'Yes — many clients move from a fixed-scope project into an ongoing monitoring or advisory retainer once the initial engagement is delivered.',
  },
];

const ContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="container-padding pb-16 sm:pb-20 lg:pb-24 relative z-10">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <p className="fl-slash">/ FAQ</p>
          <h4 className="fl1 !text-white">Before you reach out</h4>
        </div>
        <div className="flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left"
                >
                  <span className="font-reddit-sans font-medium text-white text-14 sm:text-16">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-white text-14 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="font-reddit-sans text-[#C9C9C9] text-13 sm:text-14 leading-relaxed pb-5 sm:pb-6 pr-10">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
      <footer className="hidden md:block pt-2 lg:pt-4 pb-6 container-padding">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 pb-8 sm:pb-10 lg:pb-12">
            {/* Company Details */}
            <div className="company-details">
              <img
                src={imgUrl('/icons/global/UElement_Logo_White 3.svg')}
                alt="UElement logo"
                className=" w-auto md:mb-3"
              />
              <p className="text-[#808080] font-reddit-sans text-[14px] sm:mb-5">
                Empowering Secure Digital Transformation
              </p>

              <div className="flex items-center justify-start gap-6">
                <Link
                  href="https://www.linkedin.com/company/uelement-technologies/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                >
                  <Icon name="linkedin2" size={35} />
                </Link>
                <Link
                  href="https://facebook.com/uelement.technologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                >
                  <Icon name="facebook3" size={35} />
                </Link>
                <Link
                  href="https://www.instagram.com/uelement_technologies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                >
                  <Icon name="instagram2" size={35} />
                </Link>
                <Link
                  href="https://x.com/uelement_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                >
                  <Icon name="facebook2" size={35} />
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

            <div className="flex flex-row md-flex-col justify-start gap-32 md:gap-20 my-6 md:my-0">
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
                    About us
                  </Link>
                  <Link
                    href="/partnerships"
                    className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                  >
                    Partnerships
                  </Link>
                  {/* <Link
                  href="/partnerships"
                  className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                >
                  Partners
                </Link> */}
                </div>
              </div>

              {/* Resources Links */}
              <div className="resources-links">
                <h6 className=" font-semibold text-14 sm:text-22 font-reddit-sans text-white uppercase mb-4 sm:mb-5">
                  Services
                </h6>
                <div className="flex flex-col gap-3 sm:gap-4 font-reddit-sans font-light">
                  <Link
                    href="/ai-ml"
                    className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                  >
                    AI-ML
                  </Link>
                  <Link
                    href="/cybersecurity"
                    className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                  >
                    CyberSecurity
                  </Link>
                  <Link
                    href="/cloud-solutions"
                    className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                  >
                    Cloud Solutions
                  </Link>
                  <Link
                    href="/future-tech"
                    className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                  >
                    Future Tech
                  </Link>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="newsletter ml-auto">
              <h6 className="font-semibold text-14 sm:text-22 font-reddit-sans text-white uppercase mb-4 sm:mb-5">
                NEWSLETTER
              </h6>

              {newsletterStatus.message && (
                <div
                  className={`mb-3 rounded-full px-3 py-2 text-13 sm:text-14 ${newsletterStatus.type === 'success'
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-red-100 text-red-700 border border-red-300'
                    }`}
                >
                  {newsletterStatus.message}
                </div>
              )}

              <form
                className="w-[200px] md:w-[350px] space-y-3"
                onSubmit={handleNewsletterSubmit}
              >
                <div className="relative bg-white rounded-full px-4 py-3 flex items-center gap-2">
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
      <footer className="block md:hidden pt-2 lg:pt-4 pb-6 container-padding">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 pb-8 sm:pb-10 lg:pb-12">
            {/* Company Details */}
            <div className="company-details flex flex-col container-padding justify-center items-center">
              <img
                src={imgUrl('/icons/global/UElement_Logo_White 3.svg')}
                alt="UElement logo"
                className="h-[30px] sm:h-[48px] w-auto mb-4 !mx-auto"
              />
              <div className="flex items-center flex-col gap-3">
                <p className="text-[#808080] font-reddit-sans text-[12px]">
                  Empowering Secure Digital Transformation
                </p>

                <div className="flex items-center justify-start gap-3">
                  <Link
                    href="https://www.linkedin.com/company/uelement-technologies/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                  >
                    <Icon name="linkedin2" size={35} />
                  </Link>
                  <Link
                    href="https://facebook.com/uelement.technologies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="  hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                  >
                    <Icon name="facebook3" size={35} />
                  </Link>
                  <Link
                    href="https://www.instagram.com/uelement_technologies/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                  >
                    <Icon name="instagram2" size={35} />
                  </Link>
                  <Link
                    href="https://x.com/uelement_tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="  hover:translate-y-[-3px] duration-300 ease-in-out transition-all hover:text-white/70"
                  >
                    <Icon name="facebook2" size={35} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-row md-flex-col justify-center gap-32 md:gap-20 my-6 md:my-0 container-padding">
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
                    About us
                  </Link>
                  <Link
                    href="/partnerships"
                    className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                  >
                    Partnerships
                  </Link>
                  {/* <Link
                  href="/partnerships"
                  className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                >
                  Partners
                </Link> */}
                </div>
              </div>

              {/* Resources Links */}
              <div className="resources-links">
                <h6 className=" font-semibold text-14 sm:text-22 font-reddit-sans text-white uppercase mb-4 sm:mb-5">
                  SERVICES
                </h6>
                <div className="flex flex-col gap-3 sm:gap-4 font-reddit-sans font-light">
                  <Link
                    href="/ai-ml"
                    className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                  >
                    AI-ML
                  </Link>
                  <Link
                    href="/cybersecurity"
                    className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                  >
                    CyberSecurity
                  </Link>
                  <Link
                    href="/cloud-solutions"
                    className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                  >
                    Cloud Solutions
                  </Link>
                  <Link
                    href="/future-tech"
                    className="fl3 !text-[#e2e2e2] text-13 sm:text-16 hover:text-white transition-colors"
                  >
                    Future Tech
                  </Link>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="newsletter mx-auto">
              <h6 className="font-semibold text-14 sm:text-22 font-reddit-sans text-white uppercase mb-4 sm:mb-5">
                NEWSLETTER
              </h6>

              {newsletterStatus.message && (
                <div
                  className={`mb-3 rounded-full px-3 py-2 text-13 sm:text-14 ${newsletterStatus.type === 'success'
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-red-100 text-red-700 border border-red-300'
                    }`}
                >
                  {newsletterStatus.message}
                </div>
              )}

              <form
                className="w-[300px] md:w-[350px] space-y-3"
                onSubmit={handleNewsletterSubmit}
              >
                <div className="relative bg-white rounded-full px-4 py-3 flex items-center gap-2">
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
    </>
  );
};

export default Contact;
