"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, TrendingUp, Package, Users, MapPin, Truck, Globe, SmilePlus, Building2, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logisticsAnimation from "../../public/assets/logistics.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function HomePage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [activeTab, setActiveTab] = useState("tracking");
  const [trackingMethod, setTrackingMethod] = useState("Order Id");

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      window.location.href = `/track?number=${encodeURIComponent(trackingNumber.trim())}&method=${encodeURIComponent(trackingMethod)}`;
    }
  };

  const trackingMethods = ["Mobile", "AWB", "Order Id", "LRN"];

  return (
    <main className="min-h-screen bg-white">

      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full overflow-hidden bg-primary-dark">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl flex-col items-center justify-between gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-16">
          {/* Left Side — Text Content */}
          <div className="flex max-w-xl flex-col justify-center">
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary-red">
              <span className="inline-block h-0.5 w-6 bg-primary-red" />
              Your Trusted Shipping Partner
            </p>

            <h1 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Reliable Delivery,{" "}
              <span className="text-primary-red">Hassle-Free</span>{" "}
              Shipping — From Booking to Doorstep
            </h1>

            {/* Quick Trust Points */}
            <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2">
              {["10,000+ Shipments", "Pan-India Coverage", "24/7 Support"].map((point) => (
                <span key={point} className="flex items-center gap-1.5 text-sm text-gray-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-red" />
                  {point}
                </span>
              ))}
            </div>

            {/* Our Partners — Auto-scrolling Carousel */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Our Delivery Partners
              </p>
              <div className="relative w-72 overflow-hidden">
                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black/80 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black/80 to-transparent" />

                <div className="flex w-max animate-partner-scroll items-center gap-10">
                  {/* First set */}
                  <div className="flex h-12 w-32 items-center justify-center rounded-lg bg-white px-3 shadow-md">
                    <img src="/images/partners/delhivery.png" alt="Delhivery" className="h-6 w-auto object-contain" />
                  </div>
                  <div className="flex h-12 w-32 items-center justify-center rounded-lg bg-white shadow-md overflow-hidden">
                    <img src="/images/partners/bluedart.svg" alt="BlueDart" className="h-16 w-auto scale-110" />
                  </div>
                  {/* Duplicate set for seamless loop */}
                  <div className="flex h-12 w-32 items-center justify-center rounded-lg bg-white px-3 shadow-md">
                    <img src="/images/partners/delhivery.png" alt="Delhivery" className="h-6 w-auto object-contain" />
                  </div>
                  <div className="flex h-12 w-32 items-center justify-center rounded-lg bg-white shadow-md overflow-hidden">
                    <img src="/images/partners/bluedart.svg" alt="BlueDart" className="h-16 w-auto scale-110" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side — Tracking Card */}
          <div className="w-full max-w-md shrink-0">
            <div className="rounded-xl bg-white shadow-2xl">
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("tracking")}
                  className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                    activeTab === "tracking"
                      ? "border-b-2 border-primary-dark text-primary-dark"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Track order
                </button>
                <button
                  onClick={() => setActiveTab("ship")}
                  className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                    activeTab === "ship"
                      ? "border-b-2 border-primary-dark text-primary-dark"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Ship order
                </button>
              </div>

              <div className="p-6">
                {activeTab === "tracking" ? (
                  <>
                    <h2 className="mb-4 text-lg font-bold text-text-dark">
                      <span className="font-bold">Track</span>{" "}
                      <span className="font-normal text-text-light">your order through</span>
                    </h2>

                    {/* Tracking Method Pills */}
                    <div className="mb-5 flex flex-wrap gap-2">
                      {trackingMethods.map((method) => (
                        <button
                          key={method}
                          onClick={() => setTrackingMethod(method)}
                          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                            trackingMethod === method
                              ? "border-primary-dark bg-primary-dark text-white"
                              : "border-gray-300 bg-white text-text-default hover:border-gray-400"
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleTrack}>
                      <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder={`Enter your ${trackingMethod}`}
                        className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-text-dark placeholder:text-gray-400 focus:border-primary-dark focus:outline-none focus:ring-1 focus:ring-primary-dark"
                      />

                      <button
                        type="submit"
                        className="w-full rounded-lg bg-primary-dark py-3.5 text-sm font-bold text-white transition-colors hover:bg-black"
                      >
                        Track Order
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="py-8 text-center">
                    <Package className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                    <h3 className="mb-2 text-lg font-bold text-text-dark">Ship a Package</h3>
                    <p className="mb-6 text-sm text-text-light">
                      Get instant quotes and schedule pickups
                    </p>
                    <Link
                      href="/calculate"
                      className="inline-block w-full rounded-lg bg-primary-red py-3.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT + STATS SECTION ===== */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* About Row */}
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            {/* Left — Text Content */}
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold leading-snug text-text-dark sm:text-3xl md:text-4xl">
                Your Shipment, Our Responsibility
                <br />
                <span className="text-primary-red">Till Delivery</span>
              </h2>
              <div className="mt-3 mb-5 h-1 w-16 rounded bg-primary-red" />
              <p className="mb-4 text-base leading-relaxed text-text-light sm:text-lg">
                End-to-end logistics across India with Delhivery, Blue Dart &amp; trusted courier partners.
                You book — we manage everything else.
              </p>

              <ul className="space-y-2">
                {["Scheduled & on-demand pickup", "Real-time tracking dashboard", "Dedicated support till delivery"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text-default sm:text-base">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — Lottie Animation */}
            <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <Lottie
                animationData={logisticsAnimation}
                loop
                autoplay
                className="w-full"
              />
            </div>
          </div>

          {/* Stats Row — directly below, no gap */}
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard
              icon={<Package className="h-6 w-6" />}
              value={10000}
              suffix="+"
              label="Parcels shipped since inception"
              color="red"
            />
            <StatCard
              icon={<Globe className="h-6 w-6" />}
              value={99.5}
              suffix="%"
              decimal
              label="Indian population covered"
              color="blue"
            />
            <StatCard
              icon={<Building2 className="h-6 w-6" />}
              value={200}
              suffix="+"
              label="Businesses served"
              color="orange"
            />
            <StatCard
              icon={<SmilePlus className="h-6 w-6" />}
              value={1000}
              suffix="+"
              label="Happy customers"
              color="green"
            />
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="bg-primary-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center text-3xl font-bold">
            Our suite of solutions
          </h2>
          <p className="mb-12 text-center text-gray-400">
            Comprehensive logistics for every need
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <ServiceCard
              icon={<Package className="h-10 w-10" />}
              title="D2C Brands"
              description="Seamless shipping solutions for direct-to-consumer brands with real-time tracking and analytics"
              link="/track"
            />
            <ServiceCard
              icon={<Users className="h-10 w-10" />}
              title="Personal Courier"
              description="Send packages across India with ease. Reliable and affordable courier services for individuals"
              link="/calculate"
            />
            <ServiceCard
              icon={<TrendingUp className="h-10 w-10" />}
              title="B2B Enterprises"
              description="Comprehensive logistics solutions for businesses with advanced supply chain management"
              link="/contact"
            />
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-text-dark">
            Services that power India&apos;s e-commerce ecosystem
          </h2>
          <p className="mb-8 text-lg text-text-light">
            From express delivery to supply chain solutions, we&apos;ve got you covered
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/track"
              className="rounded-lg bg-primary-red px-8 py-4 font-semibold text-white transition-colors hover:bg-red-700"
            >
              Track Shipment
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-primary-dark px-8 py-4 font-semibold text-primary-dark transition-colors hover:bg-primary-dark hover:text-white"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-primary-dark py-10 text-gray-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="text-lg font-extrabold tracking-tight text-white">
              INFINI<span className="text-primary-red">COURIERS</span>
            </span>
            <p className="text-sm">
              © {new Date().getFullYear()} Infini Couriers. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

const cardColors = {
  red:    { bg: "bg-red-50",    text: "text-red-600",    border: "hover:border-red-300",    bar: "bg-red-500" },
  blue:   { bg: "bg-blue-50",   text: "text-blue-600",   border: "hover:border-blue-300",   bar: "bg-blue-500" },
  orange: { bg: "bg-orange-50", text: "text-orange-600", border: "hover:border-orange-300", bar: "bg-orange-500" },
  green:  { bg: "bg-green-50",  text: "text-green-600",  border: "hover:border-green-300",  bar: "bg-green-500" },
};

function StatCard({ icon, value, suffix = "", label, decimal = false, color = "red" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);
  const c = cardColors[color] || cardColors.red;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 1600;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(decimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, decimal]);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${c.border}`}
    >
      {/* Top accent bar — visible on hover */}
      <div className={`absolute inset-x-0 top-0 h-1 ${c.bar} origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100`} />

      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${c.bg} ${c.text}`}>
        {icon}
      </div>

      <div className="mb-0.5 text-2xl font-extrabold text-text-dark lg:text-3xl">
        {decimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs leading-snug text-text-light sm:text-sm">{label}</div>
    </div>
  );
}

function ServiceCard({ icon, title, description, link }) {
  return (
    <div className="group rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-primary-red/40 hover:bg-white/10">
      <div className="mb-4 text-primary-red">{icon}</div>
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="mb-5 text-sm leading-relaxed text-gray-400">{description}</p>
      <Link
        href={link}
        className="text-sm font-semibold text-primary-red transition-colors hover:text-red-400"
      >
        Read More →
      </Link>
    </div>
  );
}
