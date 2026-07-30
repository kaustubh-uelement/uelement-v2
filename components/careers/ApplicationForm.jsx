'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Paperclip } from 'lucide-react';

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function ApplicationForm({ job, onSuccess, isFilled = false }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setValidationError(
        'Invalid file type. Only PDF, DOC, or DOCX files are allowed.'
      );
      e.target.value = '';
      setResumeFile(null);
      return;
    }

    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setValidationError(
        'Invalid file extension. Only .pdf, .doc, .docx are allowed.'
      );
      e.target.value = '';
      setResumeFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setValidationError(
        `File too large. Maximum allowed size is ${MAX_FILE_SIZE_MB}MB.`
      );
      e.target.value = '';
      setResumeFile(null);
      return;
    }

    setValidationError('');
    setResumeFile(file);
  };

  const handleNativeSubmit = (e) => {
    if (!resumeFile) {
      e.preventDefault();
      setValidationError('Please attach your resume before submitting.');
      return;
    }

    if (!ALLOWED_MIME_TYPES.includes(resumeFile.type)) {
      e.preventDefault();
      setValidationError(
        'Invalid file type. Only PDF, DOC, or DOCX files are allowed.'
      );
      return;
    }

    if (resumeFile.size > MAX_FILE_SIZE_BYTES) {
      e.preventDefault();
      setValidationError(
        `Resume file size must be less than ${MAX_FILE_SIZE_MB}MB.`
      );
      return;
    }

    setValidationError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setResumeFile(null);
      setTimeout(() => {
        onSuccess();
      }, 3000);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center"
        style={{ padding: '48px 16px' }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(224, 167, 105, 0.12)',
            border: '1px solid rgba(224, 167, 105, 0.35)',
            display: 'grid',
            placeItems: 'center',
            marginBottom: 20,
          }}
        >
          <CheckCircle2
            className="w-8 h-8"
            style={{ color: 'var(--gold-500)' }}
          />
        </div>
        <h4 style={{ marginBottom: 8 }}>Application submitted!</h4>
        <p className="mut" style={{ maxWidth: 280, fontSize: 13.5 }}>
          Thank you for applying to the {job.title} role. Our team will review
          your application and get back to you soon.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full bg-transparent border-b outline-none focus:outline-none focus:ring-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

  const inputStyle = {
    borderBottomColor: 'rgba(255,255,255,0.14)',
    color: 'var(--cream-100)',
    fontSize: 13.5,
    padding: '10px 0',
  };

  const labelStyle = {
    fontFamily: 'var(--font-heading)',
    fontSize: 11.5,
    fontWeight: 600,
    letterSpacing: '0.4px',
    color: 'var(--grey-450)',
    marginBottom: 6,
    display: 'block',
  };

  return (
    <>
      <iframe
        name="hidden_submit_frame"
        id="hidden_submit_frame"
        style={{ display: 'none' }}
      />
      <form
        action={`https://formsubmit.co/${process.env.NEXT_PUBLIC_FORM_SUBMIT_EMAIL}`}
        method="POST"
        target="hidden_submit_frame"
        encType="multipart/form-data"
        onSubmit={handleNativeSubmit}
        className="flex flex-col gap-5"
      >
        <input
          type="hidden"
          name="_subject"
          value={`New Job Application: ${job.title}`}
        />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="Job Applied For" value={job.title} />

        {validationError && (
          <div
            className="flex items-center gap-3"
            style={{
              padding: 14,
              borderRadius: 8,
              background: 'rgba(220, 38, 38, 0.08)',
              border: '1px solid rgba(220, 38, 38, 0.25)',
              color: '#f28b8b',
              fontSize: 13,
            }}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label style={labelStyle}>Full Name</label>
            <input
              required
              type="text"
              name="Name"
              disabled={isFilled}
              placeholder={isFilled ? 'Applications Closed' : 'John Doe'}
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              required
              type="email"
              name="Email"
              disabled={isFilled}
              placeholder={
                isFilled ? 'Applications Closed' : 'john@example.com'
              }
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label style={labelStyle}>Phone</label>
            <input
              required
              type="tel"
              name="Phone"
              disabled={isFilled}
              placeholder={isFilled ? 'Applications Closed' : '+91 98765 43210'}
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>City</label>
            <input
              required
              type="text"
              name="City"
              disabled={isFilled}
              placeholder={isFilled ? 'Applications Closed' : 'Pune'}
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label style={labelStyle}>Total Experience</label>
            <input
              required
              type="text"
              name="Total Experience"
              disabled={isFilled}
              placeholder={isFilled ? 'Applications Closed' : 'e.g., 3 Years'}
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Relevant Experience</label>
            <input
              required
              type="text"
              name="Relevant Experience"
              disabled={isFilled}
              placeholder={isFilled ? 'Applications Closed' : 'e.g., 2 Years'}
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label style={labelStyle}>Current CTC</label>
            <input
              required
              type="text"
              name="Current CTC"
              disabled={isFilled}
              placeholder={isFilled ? 'Applications Closed' : 'e.g., 8 LPA'}
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Expected CTC</label>
            <input
              required
              type="text"
              name="Expected CTC"
              disabled={isFilled}
              placeholder={isFilled ? 'Applications Closed' : 'e.g., 10 LPA'}
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Notice Period</label>
          <input
            required
            type="text"
            name="Notice Period"
            disabled={isFilled}
            placeholder={isFilled ? 'Applications Closed' : 'e.g., 30 Days'}
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Attach Resume</label>
          <label
            className="flex items-center justify-center gap-3 transition-colors"
            style={{
              padding: '16px 20px',
              borderRadius: 10,
              border: `1px dashed ${
                validationError && !resumeFile && !isFilled
                  ? 'rgba(220,38,38,0.5)'
                  : 'rgba(255,255,255,0.18)'
              }`,
              background: 'rgba(255,255,255,0.03)',
              cursor: isFilled ? 'not-allowed' : 'pointer',
            }}
          >
            <Paperclip
              className="w-4 h-4"
              style={{ color: 'var(--grey-450)' }}
            />
            <span style={{ color: 'var(--grey-350)', fontSize: 13.5 }}>
              {isFilled
                ? 'Applications Closed'
                : resumeFile
                  ? resumeFile.name
                  : 'Click to upload resume (PDF, DOCX — max 5MB)'}
            </span>
            <input
              type="file"
              name="Attachment"
              disabled={isFilled}
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="flex justify-center items-center">
          <button
            type="submit"
            disabled={isSubmitting || isFilled}
            className="btn btn-gold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isFilled
              ? 'Position Filled'
              : isSubmitting
                ? 'Sending Application...'
                : 'Submit Application'}
          </button>
        </div>
      </form>
    </>
  );
}
