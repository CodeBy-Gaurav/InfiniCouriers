"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Package, Search, Loader2, MapPin, Calendar,
  CheckCircle2, Clock, Circle, Truck, Info,
  ArrowRight, Shield, Zap,
} from "lucide-react";
import toast from "react-hot-toast";

export default function TrackPage() {
  const searchParams = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState("");

  // Auto-track if coming from homepage
  useEffect(() => {
    const number = searchParams.get("number");
    if (number) {
      setTrackingNumber(number);
      doTrack(number);
    }
  }, [searchParams]);

  const doTrack = async (number) => {
    if (!number.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }

    setLoading(true);
    setError("");
    setTrackingData(null);

    try {
      const response = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackingNumber: number.trim(),
          courier: "Delhivery",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch tracking data");
      }

      setTrackingData(data);
      toast.success("Tracking info retrieved!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to fetch tracking data.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = (e) => {
    e.preventDefault();
    doTrack(trackingNumber);
  };

  const getStatusBadge = (status) => {
    const s = status.toLowerCase();
    if (s.includes("delivered")) return { bg: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500" };
    if (s.includes("out for delivery")) return { bg: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" };
    if (s.includes("transit")) return { bg: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" };
    if (s.includes("picked") || s.includes("dispatched")) return { bg: "bg-purple-100 text-purple-700 border-purple-200", dot: "bg-purple-500" };
    if (s.includes("failed") || s.includes("returned")) return { bg: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" };
    return { bg: "bg-gray-100 text-gray-700 border-gray-200", dot: "bg-gray-500" };
  };

  const getEventIcon = (index, total) => {
    if (index === 0)
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 ring-4 ring-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        </div>
      );
    if (index === total - 1)
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-gray-50">
          <Clock className="h-4 w-4 text-gray-400" />
        </div>
      );
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 ring-4 ring-blue-50">
        <Circle className="h-3 w-3 text-blue-500" />
      </div>
    );
  };

  // Progress steps
  const progressSteps = ["Picked Up", "In Transit", "Out for Delivery", "Delivered"];
  const getActiveStep = () => {
    if (!trackingData) return -1;
    const s = trackingData.currentStatus.toLowerCase();
    if (s.includes("delivered")) return 3;
    if (s.includes("out for delivery")) return 2;
    if (s.includes("transit") || s.includes("dispatched") || s.includes("arrived")) return 1;
    if (s.includes("picked")) return 0;
    return 1;
  };

  const activeStep = getActiveStep();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">

        {/* ── Hero Header ── */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-dark shadow-lg shadow-primary-dark/20">
            <Truck className="h-7 w-7 text-white" />
          </div>
          <h1 className="mb-1 text-2xl font-bold text-text-dark sm:text-3xl">
            Track Your Shipment
          </h1>
          <p className="text-sm text-text-light">
            Powered by Delhivery — Enter your AWB number for real-time updates
          </p>
        </div>

        {/* ── Search Bar ── */}
        <form onSubmit={handleTrack} className="mx-auto mb-8 max-w-xl">
          <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow focus-within:shadow-md focus-within:border-primary-dark/30">
            <div className="flex flex-1 items-center gap-2 px-4">
              <Search className="h-4 w-4 shrink-0 text-gray-400" />
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter AWB / Waybill number"
                className="w-full py-3.5 text-sm text-text-dark placeholder:text-gray-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-primary-dark px-5 text-sm font-bold text-white transition-colors hover:bg-black disabled:opacity-50 sm:px-7"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Track <ArrowRight className="hidden h-4 w-4 sm:block" />
                </>
              )}
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" /> Secure
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3" /> Real-time
            </span>
            <span className="flex items-center gap-1">
              <Truck className="h-3 w-3" /> Delhivery Partner
            </span>
          </div>
        </form>

        {/* ── Error ── */}
        {error && (
          <div className="mx-auto mb-6 max-w-xl rounded-lg border border-red-200 bg-red-50 p-4 text-center">
            <p className="text-sm font-semibold text-red-600">{error}</p>
            <button
              onClick={() => setError("")}
              className="mt-2 text-xs text-red-500 underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ── Loading Skeleton ── */}
        {loading && (
          <div className="mx-auto max-w-xl space-y-4">
            <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-4 h-4 w-32 rounded bg-gray-200" />
              <div className="mb-6 h-2 w-full rounded-full bg-gray-100" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 rounded bg-gray-100" />
                <div className="h-10 rounded bg-gray-100" />
                <div className="h-10 rounded bg-gray-100" />
                <div className="h-10 rounded bg-gray-100" />
              </div>
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {trackingData && !loading && (
          <div className="mx-auto max-w-xl space-y-5">

            {/* Demo notice */}
            {trackingData.isDemo && (
              <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-700">
                <Info className="h-3.5 w-3.5 shrink-0" />
                Demo mode — Add your Delhivery API token to see live tracking data.
              </div>
            )}

            {/* ── Status Card ── */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              {/* Status header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Shipment Status</p>
                  <h2 className="text-lg font-bold text-text-dark">{trackingData.currentStatus}</h2>
                </div>
                <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadge(trackingData.currentStatus).bg}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${getStatusBadge(trackingData.currentStatus).dot}`} />
                  {trackingData.currentStatus}
                </span>
              </div>

              {/* Progress stepper */}
              <div className="px-5 py-5">
                <div className="flex items-center justify-between">
                  {progressSteps.map((step, i) => (
                    <div key={step} className="flex flex-1 items-center">
                      {/* Dot */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                            i <= activeStep
                              ? "border-primary-red bg-primary-red text-white"
                              : "border-gray-200 bg-white text-gray-400"
                          }`}
                        >
                          {i <= activeStep ? "✓" : i + 1}
                        </div>
                        <span className={`mt-1.5 text-[10px] font-medium ${i <= activeStep ? "text-text-dark" : "text-gray-400"}`}>
                          {step}
                        </span>
                      </div>
                      {/* Connector line */}
                      {i < progressSteps.length - 1 && (
                        <div className="mx-1 h-0.5 flex-1 rounded-full">
                          <div
                            className={`h-full rounded-full transition-all ${
                              i < activeStep ? "bg-primary-red" : "bg-gray-200"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-px border-t border-gray-100 bg-gray-100">
                <div className="flex items-center gap-2.5 bg-white px-5 py-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
                    <MapPin className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase text-gray-400">Origin</p>
                    <p className="text-xs font-semibold text-text-dark">{trackingData.origin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white px-5 py-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                    <MapPin className="h-4 w-4 text-primary-red" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase text-gray-400">Destination</p>
                    <p className="text-xs font-semibold text-text-dark">{trackingData.destination}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white px-5 py-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                    <Calendar className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase text-gray-400">Est. Delivery</p>
                    <p className="text-xs font-semibold text-text-dark">{trackingData.estimatedDelivery}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white px-5 py-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
                    <Package className="h-4 w-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase text-gray-400">
                      {trackingData.weight ? "Weight" : "AWB"}
                    </p>
                    <p className="text-xs font-semibold text-text-dark">
                      {trackingData.weight || trackingData.trackingNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Timeline ── */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-text-dark">
                <Clock className="h-4 w-4 text-gray-400" />
                Tracking History
              </h2>

              <div className="relative">
                {trackingData.events.map((event, index) => (
                  <div key={index} className="relative flex gap-3 pb-5 last:pb-0">
                    {/* Vertical connector */}
                    {index < trackingData.events.length - 1 && (
                      <div className="absolute left-4 top-9 h-[calc(100%-12px)] w-px bg-gray-200" />
                    )}

                    {/* Icon */}
                    <div className="relative z-10 shrink-0">
                      {getEventIcon(index, trackingData.events.length)}
                    </div>

                    {/* Event content */}
                    <div className={`flex-1 rounded-lg px-3.5 py-2.5 ${index === 0 ? "border border-green-100 bg-green-50/50" : "bg-gray-50"}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className={`text-sm font-semibold ${index === 0 ? "text-green-700" : "text-text-dark"}`}>
                            {event.status}
                          </p>
                          <p className="text-xs text-gray-500">{event.description}</p>
                          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-400">
                            <MapPin className="h-2.5 w-2.5" />
                            {event.location}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-[11px] font-semibold text-text-dark">{event.date}</p>
                          <p className="text-[11px] text-gray-400">{event.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Empty state ── */}
        {!trackingData && !error && !loading && (
          <div className="mx-auto max-w-xl rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Package className="h-6 w-6 text-gray-400" />
            </div>
            <p className="mb-1 text-sm font-semibold text-text-dark">No tracking info yet</p>
            <p className="text-xs text-gray-400">
              Enter your Delhivery AWB number above to see shipment status and timeline
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
