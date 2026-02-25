"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, Phone, Send, Loader2, MapPin, Clock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "General Query",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [mailWiggle, setMailWiggle] = useState(false);
  const [phoneRing, setPhoneRing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Trigger mail wiggle when user types a valid-looking email
  const triggerMailWiggle = useCallback(() => {
    if (formData.email.includes("@") && formData.email.includes(".")) {
      setMailWiggle(true);
      setTimeout(() => setMailWiggle(false), 700);
    }
  }, [formData.email]);

  useEffect(() => {
    triggerMailWiggle();
  }, [formData.email, triggerMailWiggle]);

  // Trigger phone ring when user types 10+ digits
  const triggerPhoneRing = useCallback(() => {
    const digits = formData.phone.replace(/\D/g, "");
    if (digits.length >= 10) {
      setPhoneRing(true);
      setTimeout(() => setPhoneRing(false), 1100);
    }
  }, [formData.phone]);

  useEffect(() => {
    triggerPhoneRing();
  }, [formData.phone, triggerPhoneRing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit form");
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", serviceType: "General Query", message: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary-red/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent-orange/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-red/5 blur-2xl" />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-6 text-center transition-all duration-700 ${mounted ? "animate-float-up" : "opacity-0"}`}>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Get in <span className="bg-gradient-to-r from-primary-red to-accent-orange bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="mt-1 text-sm text-gray-400">We&apos;d love to hear from you</p>
        </div>

        {/* Main Grid: Left (Contact Info) | Right (Form) */}
        <div className="grid flex-1 gap-5 lg:grid-cols-5">

          {/* LEFT — Contact Info Cards */}
          <div className={`flex flex-col gap-4 lg:col-span-2 transition-all duration-700 delay-150 ${mounted ? "animate-float-up" : "opacity-0"}`}>

            {/* Email Card */}
            <a
              href="mailto:support@infinicouriers.com"
              className="group relative flex-1 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary-red/40 hover:bg-white/10 hover:shadow-lg hover:shadow-primary-red/10"
            >
              <div className="animate-shimmer absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-3 flex items-center gap-3">
                  <div className={`relative rounded-xl bg-gradient-to-br from-primary-red to-red-700 p-3 text-white shadow-lg shadow-primary-red/30 transition-transform ${mailWiggle ? "animate-wiggle" : ""}`}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Email Us</h3>
                    <p className="text-xs text-gray-400">Click to compose</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-primary-red group-hover:underline">support@infinicouriers.com</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>We respond within 24 hours</span>
                </div>
              </div>
              <ArrowRight className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600 opacity-0 transition-all group-hover:translate-x-1 group-hover:text-primary-red group-hover:opacity-100" />
            </a>

            {/* Phone Card */}
            <a
              href="tel:+911800123456"
              className="group relative flex-1 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent-orange/40 hover:bg-white/10 hover:shadow-lg hover:shadow-accent-orange/10"
            >
              <div className="animate-shimmer absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-3 flex items-center gap-3">
                  <div className={`relative rounded-xl bg-gradient-to-br from-accent-orange to-orange-700 p-3 text-white shadow-lg shadow-accent-orange/30 transition-transform ${phoneRing ? "animate-phone-ring" : ""}`}>
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Call Us</h3>
                    <p className="text-xs text-gray-400">Click to dial</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-accent-orange group-hover:underline">+91-1800-123-4567</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>Mon-Sat, 9 AM – 6 PM IST</span>
                </div>
              </div>
              <ArrowRight className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600 opacity-0 transition-all group-hover:translate-x-1 group-hover:text-accent-orange group-hover:opacity-100" />
            </a>

            {/* Office Address (compact) */}
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-3 text-white shadow-lg shadow-emerald-500/30">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Visit Us</h3>
                  <p className="mt-1 text-sm leading-snug text-gray-400">
                    123 Business Plaza, Sector 18<br />Noida, UP 201301
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Contact Form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-300 ${mounted ? "animate-float-up" : "opacity-0"}`}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6">
              <h2 className="mb-4 text-xl font-bold text-white">
                Send us a <span className="text-primary-red">Message</span>
              </h2>

              <form onSubmit={handleSubmit} className="flex h-[calc(100%-2.5rem)] flex-col gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-xs font-medium text-gray-400">Full Name *</label>
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-primary-red focus:bg-white/10 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-xs font-medium text-gray-400">Email Address *</label>
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-primary-red focus:bg-white/10 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-xs font-medium text-gray-400">Phone Number *</label>
                    <input
                      type="tel" id="phone" name="phone"
                      value={formData.phone} onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-primary-red focus:bg-white/10 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="serviceType" className="mb-1 block text-xs font-medium text-gray-400">Service Type</label>
                    <select
                      id="serviceType" name="serviceType"
                      value={formData.serviceType} onChange={handleChange}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white transition-colors focus:border-primary-red focus:bg-white/10 focus:outline-none"
                    >
                      <option value="General Query" className="bg-gray-800">General Query</option>
                      <option value="Tracking Issue" className="bg-gray-800">Tracking Issue</option>
                      <option value="Booking Inquiry" className="bg-gray-800">Booking Inquiry</option>
                      <option value="Complaint" className="bg-gray-800">Complaint</option>
                      <option value="Feedback" className="bg-gray-800">Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="flex-1">
                  <label htmlFor="message" className="mb-1 block text-xs font-medium text-gray-400">Message *</label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={4}
                    className="w-full flex-1 resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-primary-red focus:bg-white/10 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-red to-accent-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-red/25 transition-all hover:shadow-xl hover:shadow-primary-red/40 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
