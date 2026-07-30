'use client';

import Link from 'next/link';
import { useState } from 'react';
import ModalForm from '@/components/ui/ModalForm';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: "I'm interested in…",
    message: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Demo form — wire to your CRM or mail endpoint.');
  };

  return (
    <>
      <div className="hero hero-half">
        <div className="hero-fabric" />
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / Contact
          </div>
          <div className="kicker">Contact</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            Start the conversation.
          </h1>
          <p className="lede" style={{ marginTop: 20 }}>
            Whether it&apos;s a quantum risk assessment, a 45-day Vizor proof of
            value, a tactical-edge briefing, or a partnership — tell us what
            you&apos;re solving for.
          </p>
        </div>
      </div>
    </>
  );
}
