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

const empty: FormState = { name: "", company: "", email: "", phone: "", message: "" };

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
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Banner — TODO: Add a club photo to /public/images/sponsors-banner.jpg and uncomment the Image below */}
      <div className="relative rounded-2xl overflow-hidden h-52 md:h-64 mb-12 bg-charcoal">
        {/* <Image src="/images/sponsors-banner.jpg" alt="UMass Motorsports" fill className="object-cover" /> */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at bottom left, rgba(136,28,28,0.45) 0%, transparent 65%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">
            UMass Motorsports Club
          </p>
          <p className="text-2xl font-bold text-white">Est. 1996</p>
          <p className="text-sm text-white/55 mt-1">
            Student-run motorsports at UMass Amherst
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {/* Intro */}
        <section>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
            Support UMass Motorsports
          </h1>
          <p className="text-gray-500 leading-relaxed">
            We&apos;re a student-run club competing in autocross events and building
            our own vehicles from the ground up. Every sponsor helps us stay on
            track — literally.
          </p>
        </section>

        {/* Two-column benefits */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-umass mb-3">
              What your support funds
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Vehicle maintenance &amp; upgrades
              </li>
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Event registration &amp; travel
              </li>
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Safety equipment
              </li>
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Shop tools &amp; consumables
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-umass mb-3">
              What sponsors receive
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Logo on vehicles &amp; livery
              </li>
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Website &amp; social recognition
              </li>
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Access to engineering talent
              </li>
              <li className="flex items-start gap-2">
                <span className="text-umass mt-0.5">—</span>
                Event shoutouts &amp; mentions
              </li>
            </ul>
          </div>
        </section>

        {/* Contact form */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Get in touch</h2>
          <p className="text-sm text-gray-400 mb-6">
            Interested in sponsoring? Fill out the form and we&apos;ll follow up within a few days.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Name <span className="text-umass">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Company / Organization
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email <span className="text-umass">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Message <span className="text-umass">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-white resize-none"
                placeholder="Tell us about your interest in sponsoring UMass Motorsports..."
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-umass text-white text-sm font-semibold rounded hover:bg-umass-dark transition-colors"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
