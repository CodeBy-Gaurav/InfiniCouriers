import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceType, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        serviceType: serviceType || "General Query",
        message,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      id: submission.id,
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
