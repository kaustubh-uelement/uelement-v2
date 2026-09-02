'use client';

import { useState, useEffect, useRef } from 'react';
import useWeb3Forms from '@web3forms/react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    subjects: {
      otObservability: false,
      quantumSecurity: false,
      enterpriseResilience: false,
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
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | '';
    message: string;
  }>({ type: '', message: '' });

  // Close on Escape key and handle body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex =
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          error = 'First name is required';
        } else if (value.trim().length < 2) {
          error = 'Must be at least 2 characters';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          error = 'Last name is required';
        } else if (value.trim().length < 2) {
          error = 'Must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!validateEmail(value)) {
          error = 'Enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!validatePhone(value)) {
          error = 'Enter a valid phone number';
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
    return !Object.values(newErrors).some((error) => error !== '');
  };

  // Web3Forms Integration
  const { submit } = useWeb3Forms({
    access_key: '5f0b55f8-1ed0-46cd-a518-c13ca9686c6f',
    settings: {
      from_name: 'UElement Modal Contact Form',
      subject: 'New Modal Contact Form Submission from Website',
    },
    onSuccess: (message: string) => {
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your inquiry has been sent to our team.',
      });
      setIsSubmitting(false);

      // Auto-reset and close after 2.5 seconds
      setTimeout(() => {
        resetForm();
        setSubmitStatus({ type: '', message: '' });
        onClose();
      }, 2500);
    },
    onError: () => {
      setSubmitStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again.',
      });
      setIsSubmitting(false);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleCheckboxToggle = (key: keyof typeof formData.subjects) => {
    setFormData((prev) => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [key]: !prev.subjects[key],
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
        otObservability: false,
        quantumSecurity: false,
        enterpriseResilience: false,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill all required fields correctly.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    const selectedSubjects = Object.keys(formData.subjects)
      .filter((key) => formData.subjects[key as keyof typeof formData.subjects])
      .map((key) => key.replace(/([A-Z])/g, ' $1').trim())
      .join(', ');

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 animate-fadeIn"
      style={{
        backgroundColor: 'rgba(7, 23, 57, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-[720px] max-h-[92vh] overflow-y-auto rounded-[24px] text-white flex flex-col custom-modal-scrollbar"
        style={{
          border: '1px solid rgba(224, 167, 105, 0.35)',
          background:
            'linear-gradient(154.11deg, #071739 15%, #0d2450 60%, #162447 100%)',
          boxShadow:
            '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(224, 167, 105, 0.12)',
        }}
      >
        {/* Ambient Top Glow Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(224, 167, 105, 0.8) 50%, transparent)',
          }}
        />

        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 pb-4 border-b border-white/[0.08]">
          <div>
            <div
              className="font-heading text-[11px] font-bold tracking-[0.12em] uppercase mb-1"
              style={{ color: 'var(--gold-500, #c88a3e)' }}
            >
              Get in Touch
            </div>
            <h3
              id="contact-modal-title"
              className="text-20 sm:text-24 font-bold font-heading text-white tracking-tight"
            >
              Ready to Transform Your <span className="au">Enterprise?</span>
            </h3>
            <p className="text-13 sm:text-14 text-[#8a9bb3] mt-1 font-body">
              Speak with our quantum, cyber resilience, and cloud specialists.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-[#c5d0dc] hover:text-white border border-white/[0.1] transition-all duration-200 ml-4 flex-shrink-0 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Form Content */}
        <div className="p-6 sm:p-8 pt-6">
          {submitStatus.message && (
            <div
              className={`mb-6 p-4 rounded-xl text-14 font-medium ${
                submitStatus.type === 'success'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-heading text-12 font-semibold text-[#c5d0dc] mb-1.5">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  style={{ outline: 'none', boxShadow: 'none' }}
                  className={`custom-modal-input w-full bg-white/[0.05] border rounded-xl px-4 py-2.5 text-14 text-white placeholder:text-[#8a9bb3]/60 outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 transition-colors ${
                    errors.firstName
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-white/[0.12] focus:border-[#e0a769]'
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-400 text-11 mt-1 font-heading">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-heading text-12 font-semibold text-[#c5d0dc] mb-1.5">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  style={{ outline: 'none', boxShadow: 'none' }}
                  className={`custom-modal-input w-full bg-white/[0.05] border rounded-xl px-4 py-2.5 text-14 text-white placeholder:text-[#8a9bb3]/60 outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 transition-colors ${
                    errors.lastName
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-white/[0.12] focus:border-[#e0a769]'
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-400 text-11 mt-1 font-heading">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Phone Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-heading text-12 font-semibold text-[#c5d0dc] mb-1.5">
                  Work Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  style={{ outline: 'none', boxShadow: 'none' }}
                  className={`custom-modal-input w-full bg-white/[0.05] border rounded-xl px-4 py-2.5 text-14 text-white placeholder:text-[#8a9bb3]/60 outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 transition-colors ${
                    errors.email
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-white/[0.12] focus:border-[#e0a769]'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-11 mt-1 font-heading">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-heading text-12 font-semibold text-[#c5d0dc] mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  style={{ outline: 'none', boxShadow: 'none' }}
                  className={`custom-modal-input w-full bg-white/[0.05] border rounded-xl px-4 py-2.5 text-14 text-white placeholder:text-[#8a9bb3]/60 outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 transition-colors ${
                    errors.phone
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-white/[0.12] focus:border-[#e0a769]'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-11 mt-1 font-heading">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Subject / Practice Area Pills */}
            <div>
              <label className="block font-heading text-12 font-semibold text-[#c5d0dc] mb-2">
                Select Areas of Interest{' '}
                <span className="text-[#8a9bb3] font-normal">(Optional)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { key: 'quantumSecurity', label: 'Quantum Security' },
                  { key: 'otObservability', label: 'OT Observability' },
                  { key: 'enterpriseResilience', label: 'Resilience' },
                  { key: 'enterpriseCloud', label: 'Cloud Fabric' },
                  { key: 'artificialIntelligence', label: 'Enterprise AI' },
                  { key: 'digitalTransformation', label: 'Transformation' },
                ].map((item) => {
                  const isChecked =
                    formData.subjects[item.key as keyof typeof formData.subjects];
                  return (
                    <button
                      type="button"
                      key={item.key}
                      onClick={() =>
                        handleCheckboxToggle(
                          item.key as keyof typeof formData.subjects
                        )
                      }
                      style={{ outline: 'none' }}
                      className={`px-3 py-2 rounded-xl text-12 font-heading font-medium border text-left flex items-center justify-between transition-all duration-200 cursor-pointer outline-none focus:outline-none focus-visible:outline-none ${
                        isChecked
                          ? 'border-[#e0a769] bg-[#c88a3e]/20 text-[#fcefdc]'
                          : 'border-white/[0.08] bg-white/[0.03] text-[#8a9bb3] hover:border-white/[0.2] hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isChecked && (
                        <span className="text-[#e0a769] text-12">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label className="block font-heading text-12 font-semibold text-[#c5d0dc] mb-1.5">
                Message *
              </label>
              <textarea
                name="message"
                rows={3}
                placeholder="Tell us about your project, timeline, or requirements..."
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                style={{ outline: 'none', boxShadow: 'none' }}
                className={`custom-modal-input w-full bg-white/[0.05] border rounded-xl px-4 py-2.5 text-14 text-white placeholder:text-[#8a9bb3]/60 outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 transition-colors resize-none ${
                  errors.message
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-white/[0.12] focus:border-[#e0a769]'
                }`}
              />
              {errors.message && (
                <p className="text-red-400 text-11 mt-1 font-heading">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Footer / Submit CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/[0.08]">
              <div className="text-12 text-[#8a9bb3] font-body flex items-center gap-1.5">
                
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="nav-cta !py-2.5 !px-8 !text-13 sm:w-auto w-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Message →</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
