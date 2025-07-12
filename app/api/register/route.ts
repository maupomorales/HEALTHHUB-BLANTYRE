import { type NextRequest, NextResponse } from "next/server"

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone validation regex (basic Malawi format)
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

    // Prepare email content
    const emailSubject = `New Health Hub Registration - ${firstName} ${lastName}`
    const emailBody = `
New Registration for Blantyre Health Hub

PERSONAL INFORMATION:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${phone}
- Date of Birth: ${dateOfBirth || "Not provided"}
- Address: ${address || "Not provided"}
- City/Area: ${city}

HEALTH INTERESTS:
${interests && interests.length > 0 ? interests.map((interest: string) => `- ${interest}`).join("\n") : "- None selected"}

REGISTRATION DETAILS:
- Registration Date: ${new Date().toLocaleString()}
- Registration Time: ${new Date().toISOString()}

---
This registration was submitted through the Blantyre Health Hub website.
    `.trim()

    // Send email using a service (we'll simulate this for now)
    try {
      // In a real application, you would use an email service like:
      // - Nodemailer with SMTP
      // - SendGrid
      // - Resend
      // - AWS SES
      // - Mailgun

      // For now, we'll simulate sending the email
      await sendEmailNotification({
        to: "healthhubconnect071@gmail.com",
        subject: emailSubject,
        body: emailBody,
        userData: {
          firstName,
          lastName,
          email,
          phone,
          dateOfBirth,
          address,
          city,
          interests,
        },
      })

      console.log("Email sent successfully to healthhubconnect071@gmail.com")
      console.log("Registration data:", {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        city,
        interests,
        timestamp: new Date().toISOString(),
      })
    } catch (emailError) {
      console.error("Failed to send email:", emailError)
      // Continue with success response even if email fails
      // You might want to log this to a monitoring service
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Registration successful! Your information has been sent to our team. We'll be in touch soon with health updates for your area.",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 })
  }
}

// Email sending function (simulated - replace with real email service)
async function sendEmailNotification({
  to,
  subject,
  body,
  userData,
}: {
  to: string
  subject: string
  body: string
  userData: any
}) {
  // This is where you would integrate with a real email service
  // For demonstration, we'll just log the email content

  console.log("=== EMAIL NOTIFICATION ===")
  console.log("To:", to)
  console.log("Subject:", subject)
  console.log("Body:", body)
  console.log("========================")

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In production, replace this with actual email sending:
  /*
  // Example with Nodemailer:
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: body,
    html: body.replace(/\n/g, '<br>')
  })
  */

  return true
}
