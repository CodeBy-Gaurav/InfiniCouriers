"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, Package, Clock, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

export default function CalculatePage() {
  const [formData, setFormData] = useState({
    originPincode: "",
    destinationPincode: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    serviceType: "Standard",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCalculate = async (e) => {
    e.preventDefault();

    if (!formData.originPincode || formData.originPincode.length !== 6) {
      toast.error("Please enter a valid 6-digit origin pincode");
      return;
    }

    if (!formData.destinationPincode || formData.destinationPincode.length !== 6) {
      toast.error("Please enter a valid 6-digit destination pincode");
      return;
    }

    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      toast.error("Please enter a valid weight");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to calculate price");
      }

      setResult(data);
      toast.success("Price calculated successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to calculate price");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-blue">
              Infini Couriers
            </Link>
            <div className="hidden items-center space-x-8 md:flex">
              <Link href="/" className="text-gray-700 hover:text-primary-blue">
                Home
              </Link>
              <Link href="/track" className="text-gray-700 hover:text-primary-blue">
                Track Order
              </Link>
              <Link href="/calculate" className="font-semibold text-primary-blue">
                Calculate Price
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary-blue">
                Contact
              </Link>
            </div>
            <button className="md:hidden text-gray-700">☰</button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-blue">
            Calculate Shipping Cost & Transit Time
          </h1>
          <p className="text-lg text-gray-600">
            Get instant estimates for your shipments
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Calculator Form */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Shipment Details</h2>
            
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="originPincode" className="mb-2 block text-sm font-medium text-gray-700">
                    Origin Pincode *
                  </label>
                  <input
                    type="number"
                    id="originPincode"
                    name="originPincode"
                    value={formData.originPincode}
                    onChange={handleChange}
                    placeholder="400001"
                    maxLength={6}
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-accent-orange focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="destinationPincode" className="mb-2 block text-sm font-medium text-gray-700">
                    Destination Pincode *
                  </label>
                  <input
                    type="number"
                    id="destinationPincode"
                    name="destinationPincode"
                    value={formData.destinationPincode}
                    onChange={handleChange}
                    placeholder="110001"
                    maxLength={6}
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-accent-orange focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="weight" className="mb-2 block text-sm font-medium text-gray-700">
                  Package Weight (kg) *
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="2.5"
                  step="0.1"
                  min="0.1"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-accent-orange focus:outline-none"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor="length" className="mb-2 block text-sm font-medium text-gray-700">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    id="length"
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    placeholder="30"
                    step="0.1"
                    min="0"
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-accent-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="width" className="mb-2 block text-sm font-medium text-gray-700">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    id="width"
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                    placeholder="20"
                    step="0.1"
                    min="0"
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-accent-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="height" className="mb-2 block text-sm font-medium text-gray-700">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="15"
                    step="0.1"
                    min="0"
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-accent-orange focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="serviceType" className="mb-2 block text-sm font-medium text-gray-700">
                  Service Type
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-accent-orange focus:outline-none"
                >
                  <option value="Express">Express</option>
                  <option value="Standard">Standard</option>
                  <option value="Economy">Economy</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-accent-orange px-6 py-3 font-semibold text-white transition-all hover:bg-accent-orange/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Calculating..." : "Calculate"}
              </button>
            </form>
          </div>

          {/* Results Display */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Pricing Card */}
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <div className="mb-4 flex items-center gap-2">
                    <Package className="h-6 w-6 text-primary-blue" />
                    <h2 className="text-2xl font-bold text-gray-800">Pricing</h2>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm text-gray-600">Estimated Total</p>
                    <p className="text-4xl font-bold text-primary-blue">
                      ₹{result.totalPrice.toFixed(2)}
                    </p>
                  </div>

                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base Rate:</span>
                      <span className="font-semibold">₹{result.baseRate.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Fuel Surcharge:</span>
                      <span className="font-semibold">₹{result.fuelSurcharge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">GST (18%):</span>
                      <span className="font-semibold">₹{result.gst.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Transit Time Card */}
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <div className="mb-4 flex items-center gap-2">
                    <Clock className="h-6 w-6 text-accent-orange" />
                    <h2 className="text-2xl font-bold text-gray-800">Transit Time</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Estimated Delivery</p>
                      <p className="text-2xl font-bold text-gray-800">{result.transitDays}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expected Delivery Date</p>
                      <p className="text-lg font-semibold text-gray-800">{result.expectedDeliveryDate}</p>
                    </div>
                  </div>
                </div>

                {/* Volumetric Weight Card */}
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <div className="mb-4 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-success" />
                    <h2 className="text-2xl font-bold text-gray-800">Weight Calculation</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Actual Weight:</span>
                      <span className="font-semibold">{result.actualWeight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Volumetric Weight:</span>
                      <span className="font-semibold">{result.volumetricWeight} kg</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm font-semibold text-gray-700">Chargeable Weight:</span>
                      <span className="font-bold text-primary-blue">{result.chargeableWeight} kg</span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-600">
                      <strong>Formula:</strong> (Length × Width × Height) / 5000
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Chargeable weight is the higher of actual or volumetric weight
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg bg-white p-12 shadow-lg">
                <div className="text-center">
                  <Calculator className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                  <p className="text-lg text-gray-600">
                    Fill in the form to calculate shipping costs
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
