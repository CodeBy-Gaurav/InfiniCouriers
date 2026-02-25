"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Main Navbar */}
      <header className="sticky top-0 z-50 w-full bg-primary-dark shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1">
              <span className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                INFINI<span className="text-primary-red">COURIERS</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 md:flex">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/track">Track</NavLink>
              <NavLink href="/calculate">Calculate</NavLink>
              <NavLink href="/contact">Contact</NavLink>

              {/* Ship Now Button */}
              <Link
                href="/calculate"
                className="ml-4 flex items-center gap-1 rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary-dark"
              >
                Ship Now
                <ChevronDown className="h-4 w-4" />
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              className="text-white md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="border-t border-white/10 bg-primary-darker md:hidden">
            <div className="flex flex-col px-4 py-4">
              <MobileNavLink href="/" onClick={() => setMobileOpen(false)}>Home</MobileNavLink>
              <MobileNavLink href="/track" onClick={() => setMobileOpen(false)}>Track</MobileNavLink>
              <MobileNavLink href="/calculate" onClick={() => setMobileOpen(false)}>Calculate</MobileNavLink>
              <MobileNavLink href="/contact" onClick={() => setMobileOpen(false)}>Contact</MobileNavLink>
              <Link
                href="/calculate"
                onClick={() => setMobileOpen(false)}
                className="mt-3 rounded-full border border-white/30 px-5 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary-dark"
              >
                Ship Now
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="rounded-md px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-md px-3 py-3 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );
}
