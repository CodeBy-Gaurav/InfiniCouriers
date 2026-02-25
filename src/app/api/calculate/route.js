import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { originPincode, destinationPincode, weight, length, width, height, serviceType } = body;

    if (!originPincode || !destinationPincode || !weight) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const actualWeight = parseFloat(weight);
    let volumetricWeight = 0;
    
    if (length && width && height) {
      const l = parseFloat(length);
      const w = parseFloat(width);
      const h = parseFloat(height);
      volumetricWeight = (l * w * h) / 5000;
    }

    const chargeableWeight = Math.max(actualWeight, volumetricWeight);

    const baseRates = {
      Express: 80,
      Standard: 50,
      Economy: 35,
    };

    const baseRate = baseRates[serviceType] || baseRates.Standard;
    const weightCharge = chargeableWeight * baseRate;
    const fuelSurcharge = weightCharge * 0.15;
    const subtotal = weightCharge + fuelSurcharge;
    const gst = subtotal * 0.18;
    const totalPrice = subtotal + gst;

    const transitDaysMap = {
      Express: "1-2 business days",
      Standard: "3-5 business days",
      Economy: "5-7 business days",
    };

    const transitDays = transitDaysMap[serviceType] || transitDaysMap.Standard;

    const daysToAdd = serviceType === "Express" ? 2 : serviceType === "Standard" ? 4 : 6;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
    const expectedDeliveryDate = deliveryDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const result = {
      baseRate: weightCharge,
      fuelSurcharge,
      gst,
      totalPrice,
      transitDays,
      expectedDeliveryDate,
      actualWeight,
      volumetricWeight: volumetricWeight || 0,
      chargeableWeight,
    };

    try {
      await prisma.priceCalculation.create({
        data: {
          originPincode,
          destinationPincode,
          weight: actualWeight,
          length: length ? parseFloat(length) : null,
          width: width ? parseFloat(width) : null,
          height: height ? parseFloat(height) : null,
          serviceType,
          calculatedPrice: totalPrice,
          transitDays: daysToAdd,
        },
      });
    } catch (dbError) {
      console.error("Database error (non-critical):", dbError);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Calculate API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
