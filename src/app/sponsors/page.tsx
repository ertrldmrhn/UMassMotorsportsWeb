"use client";

import { useState } from "react";
import { site } from "@/lib/site";

// TODO: Replace the mailto fallback with a real email API (e.g. Resend, SendGrid)
// when you're ready to handle form submissions server-side.

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const empty: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

export default function SponsorsPage() {
  const [form, setForm] = useState<FormState>(empty);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Sponsorship Inquiry from ${form.company || form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-12">
      {/* About */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Support UMass Motorsports</h1>
        <p className="text-gray-600 leading-relaxed">
          UMass Motorsports is a student-run engineering and driving club at the
          University of Massachusetts Amherst, established in 1996. We compete in
          autocross events, build and maintain our own vehicles, and give students
          hands-on experience in motorsport at every level.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We are entirely funded by sponsors and dues-paying members. Your
          support goes directly toward keeping us on track.
        </p>
      </section>

      {/* Why Sponsor */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">What sponsorship funds</h2>
        <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
          <li>Vehicle maintenance, repairs, and upgrades</li>
          <li>Event registration fees and travel costs</li>
          <li>Safety equipment (helmets, harnesses, fire suppression)</li>
          <li>Shop tools and consumables</li>
          <li>Member training and licensing</li>
        </ul>
      </section>

      {/* Sponsor Benefits */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">What sponsors receive</h2>
        <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
          <li>Logo on club vehicles and competition livery</li>
          <li>Recognition on our website and social media</li>
          <li>Access to motivated engineering students for recruiting</li>
          <li>Shoutouts at events and in club communications</li>
        </ul>
        <p className="text-sm text-gray-500 italic">
          Sponsorship tiers and specific benefits are flexible — reach out and
          we&apos;ll work something out that fits your goals.
        </p>
      </section>

      {/* Contact Form */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Get in touch</h2>
        <p className="text-sm text-gray-500">
          Fill out the form below and we&apos;ll get back to you within a few days.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company / Organization
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500 resize-none"
              placeholder="Tell us about your interest in sponsoring UMass Motorsports..."
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-red-800 text-white text-sm font-medium rounded hover:bg-red-900 transition-colors"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
