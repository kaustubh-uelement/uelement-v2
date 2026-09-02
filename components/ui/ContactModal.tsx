'use client';

import React, { useState, useEffect, useRef } from 'react';
import useWeb3Forms from '@web3forms/react';
import InputField from '../formElements/InputField/InputField';
import Checkbox from '../formElements/Checkbox/Checkbox';

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

  // Validation functions (exact match with footer form)
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
    return !Object.values(newErrors).some((error) => error !== '');
  };

  // Web3Forms Integration
  const { submit } = useWeb3Forms({
    access_key: '5f0b55f8-1ed0-46cd-a518-c13ca9686c6f',
    settings: {
      from_name: 'UElement Contact Form',
      subject: 'New Contact Form Submission from Website',
    },
    onSuccess: (message: string) => {
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.',
      });
      setIsSubmitting(false);

      // Reset form and close after 2.5 seconds
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

  const handleInputChange = (e: any) => {
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

  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleCheckboxChange = (e: any) => {
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

  const contactFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

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
        backgroundColor: 'rgba(7, 23, 57, 0.78)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
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
        className="relative w-full max-w-[740px] max-h-[92vh] overflow-y-auto rounded-[24px] bg-[linear-gradient(165deg,#ffffff_0%,#fbfbfe_100%)] text-black border border-[#c88a3e]/30 shadow-[0px_20px_70px_rgba(7,23,57,0.35),0px_0px_35px_rgba(200,138,62,0.12)] custom-modal-scrollbar p-6 sm:p-8 lg:p-10"
      >
        {/* Top Gold Accent Bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, #c88a3e 20%, #e0a769 50%, #c88a3e 80%, transparent)',
          }}
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 sm:top-7 sm:right-7 flex items-center justify-center w-8 h-8 rounded-full bg-[#071739]/[0.05] hover:bg-[#071739]/[0.12] hover:text-[#c88a3e] border border-black/5 hover:border-[#c88a3e]/40 text-[#4a5568] transition-all duration-200 cursor-pointer z-20"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-left mb-6 sm:mb-8 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold font-heading tracking-widest uppercase bg-[#c88a3e]/10 text-[#a86e24] border border-[#c88a3e]/30 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c88a3e] animate-pulse" />
            <span>Contact Us</span>
          </div>

          <h2
            id="contact-modal-title"
            className="text-22 sm:text-26 md:text-30 font-bold font-heading text-[#071739] tracking-tight"
          >
            Ready to Transform Your <span className="au">Enterprise?</span>
          </h2>

          <p className="text-13 sm:text-14 text-[#556987] mt-1.5 leading-relaxed font-body">
            Empower your enterprise with smarter, scalable security that adapts
            to new threats, keeping your business safe, agile, and resilient.
          </p>
        </div>

        {/* Success/Error Message */}
        {submitStatus.message && (
          <div
            className={`mb-6 p-4 rounded-xl text-14 font-medium transition-all ${
              submitStatus.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                : 'bg-rose-50 text-rose-800 border border-rose-300'
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        {/* Contact Form */}
        <form
          autoComplete="off"
          className="flex flex-col gap-5 lg:gap-6"
          onSubmit={contactFormHandler}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
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
                type="tel"
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
            <h6 className="font-heading text-[14px] sm:text-[15px] font-semibold text-[#071739] mb-3">
              Select Subject?{' '}
              <span className="text-[#808080] font-normal text-13">
                (Optional)
              </span>
            </h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Checkbox
                label="OT Observability"
                id="otObservability"
                checked={formData.subjects.otObservability}
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Quantum Security"
                id="quantumSecurity"
                checked={formData.subjects.quantumSecurity}
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Enterprise Resilience"
                id="enterpriseResilience"
                checked={formData.subjects.enterpriseResilience}
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
            <label className="font-heading text-[14px] sm:text-[15px] font-semibold text-[#071739]">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Write your message.."
              rows={2}
              style={{ outline: 'none', boxShadow: 'none' }}
              className={`w-full bg-transparent placeholder:text-[#808080] border-b outline-none focus:border-[#c88a3e] font-reddit-sans text-[14px] text-[#232223] py-2 px-0 resize-none transition-colors ${
                errors.message ? 'border-b-red-600' : 'border-b-[#D7D7D7]'
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-600 text-12 mt-1 font-heading">
                {errors.message}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-black/[0.06] mt-2">
            <div className="text-12 text-[#64748b] font-body flex items-center gap-1.5 order-2 sm:order-1">
             
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-gold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed order-1 sm:order-2 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Request a meeting →</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
