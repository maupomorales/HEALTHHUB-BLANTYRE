import { type NextRequest, NextResponse } from "next/server"

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone validation regex (Malawi format)
const phoneRegex = /^(\+265|265)?[0-9]{9}$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, dateOfBirth, address, city, interests } = body

    // Validation
    const errors: string[] = []

    // Required fields validation
    if (!firstName || firstName.trim().length < 2) {
      errors.push("First name must be at least 2 characters long")
    }

    if (!lastName || lastName.trim().length < 2) {
      errors.push("Last name must be at least 2 characters long")
    }

    if (!email || !emailRegex.test(email)) {
      errors.push("Please provide a valid email address")
    }

    if (!phone || !phoneRegex.test(phone.replace(/\s/g, ""))) {
      errors.push("Please provide a valid Malawi phone number")
    }

    if (!city || city.trim().length < 2) {
      errors.push("City/Area is required")
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 })
    }

    // Prepare user data for email
    const userData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.replace(/\s/g, ""),
      dateOfBirth: dateOfBirth || undefined,
      address: address?.trim() || undefined,
      city: city.trim(),
      interests: Array.isArray(interests) ? interests : [],
    }

    // Send email notification to admin (simulated for now)
    try {
      // In a real deployment, you would integrate with an email service like:
      // - SendGrid
      // - Mailgun
      // - AWS SES
      // - Nodemailer with SMTP

      console.log("=== NEW REGISTRATION EMAIL ===")
      console.log("To: healthhubconnect071@gmail.com")
      console.log("Subject: 🏥 New Health Hub Registration -", userData.firstName, userData.lastName)
      console.log("Registration Data:", JSON.stringify(userData, null, 2))
      console.log("Timestamp:", new Date().toISOString())
      console.log("===============================")

      // Simulate email sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log(`✅ Registration notification logged for user: ${userData.email}`)
    } catch (emailError) {
      console.error("Failed to process registration:", emailError)
      return NextResponse.json({ error: "Failed to process registration. Please try again." }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Registration successful! Your information has been received and will be processed shortly. Our team at healthhubconnect071@gmail.com will contact you soon with health updates for your area.",
        user: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          city: userData.city,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 })
  }
}

// GET endpoint for basic health check
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "Blantyre Health Hub Registration API",
    timestamp: new Date().toISOString(),
  })
}
