import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { trackingNumber, courier } = body;

    if (!trackingNumber) {
      return NextResponse.json(
        { error: "Tracking number is required" },
        { status: 400 }
      );
    }

    // ─── Delhivery ───
    if (courier === "Delhivery") {
      const apiToken = process.env.DELHIVERY_API_TOKEN;

      // No API key yet → return demo data so the UI works
      if (!apiToken) {
        return NextResponse.json(getDemoData(trackingNumber, "Delhivery"));
      }

      try {
        const res = await fetch(
          `https://track.delhivery.com/api/v1/packages/json/?waybill=${trackingNumber}`,
          { headers: { Authorization: `Token ${apiToken}` } }
        );

        if (!res.ok) {
          if (res.status === 404) {
            return NextResponse.json(
              { error: "Tracking number not found. Please check and try again." },
              { status: 404 }
            );
          }
          throw new Error(`Delhivery API returned ${res.status}`);
        }

        const data = await res.json();

        if (!data.ShipmentData || data.ShipmentData.length === 0) {
          return NextResponse.json(
            { error: "No shipment found for this tracking number." },
            { status: 404 }
          );
        }

        return NextResponse.json(formatDelhiveryResponse(data, trackingNumber));
      } catch (err) {
        console.error("Delhivery API Error:", err);
        return NextResponse.json(
          { error: "Unable to reach Delhivery. Please try again later." },
          { status: 502 }
        );
      }
    }

    // ─── Other couriers — demo data for now ───
    // Add more courier APIs here later (BlueDart, DTDC, etc.)
    return NextResponse.json(getDemoData(trackingNumber, courier || "Courier"));
  } catch (error) {
    console.error("Tracking API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// ─── Format Delhivery API response ───
function formatDelhiveryResponse(data, trackingNumber) {
  const shipmentData = data.ShipmentData[0];
  const shipment = shipmentData.Shipment;

  const events = (shipment.Scans || []).map((scan) => {
    const s = scan.ScanDetail;
    return {
      date: new Date(s.ScanDateTime).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      }),
      time: new Date(s.ScanDateTime).toLocaleTimeString("en-IN", {
        hour: "2-digit", minute: "2-digit",
      }),
      location: s.ScannedLocation || "N/A",
      status: s.Instructions || s.Scan || "Update",
      description: s.Instructions || s.StatusDescription || s.Scan || "Shipment update",
    };
  });

  return {
    trackingNumber,
    courier: "Delhivery",
    currentStatus: shipment.Status?.Status || "In Transit",
    origin: shipment.Origin || "N/A",
    destination: shipment.Destination || "N/A",
    estimatedDelivery: shipment.ExpectedDeliveryDate
      ? new Date(shipment.ExpectedDeliveryDate).toLocaleDateString("en-IN", {
          day: "numeric", month: "short", year: "numeric",
        })
      : "To be determined",
    weight: shipment.ChargedWeight ? `${shipment.ChargedWeight} kg` : undefined,
    events: events.reverse(),
  };
}

// ─── Demo data (shown when no API key is set) ───
function getDemoData(trackingNumber, courierName) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const fmt = (d) =>
    d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return {
    trackingNumber,
    courier: courierName,
    currentStatus: "Out for Delivery",
    origin: "Mumbai, Maharashtra",
    destination: "Delhi, Delhi",
    estimatedDelivery: fmt(today),
    weight: "2.5 kg",
    isDemo: true,
    events: [
      {
        date: fmt(today),
        time: "09:30 AM",
        location: "Delhi Local Hub",
        status: "Out for Delivery",
        description: "Package is out for delivery — will reach you today",
      },
      {
        date: fmt(today),
        time: "06:15 AM",
        location: "Delhi Distribution Centre",
        status: "Arrived at Facility",
        description: "Package arrived at local delivery facility",
      },
      {
        date: fmt(yesterday),
        time: "11:45 PM",
        location: "In Transit",
        status: "In Transit",
        description: "Package is in transit to destination city",
      },
      {
        date: fmt(yesterday),
        time: "02:30 PM",
        location: "Mumbai Hub",
        status: "Dispatched",
        description: "Package dispatched from origin facility",
      },
      {
        date: fmt(twoDaysAgo),
        time: "04:20 PM",
        location: "Mumbai Pickup Point",
        status: "Picked Up",
        description: "Package picked up from sender",
      },
    ],
  };
}
