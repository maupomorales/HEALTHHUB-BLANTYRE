import { type NextRequest, NextResponse } from "next/server"

// In a real application, you would use a proper database
// For this example, we'll simulate database operations
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth?: string
  address?: string
  city: string
  interests: string[]
  createdAt: string
}

// Simulated database (in production, use a real database like PostgreSQL, MongoDB, etc.)
const users: User[] = []

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

    // Check if email already exists
    const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase())
    if (existingUser) {
      errors.push("An account with this email already exists")
    }

    // Check if phone already exists
    const existingPhone = users.find((user) => user.phone === phone.replace(/\s/g, ""))
    if (existingPhone) {
      errors.push("An account with this phone number already exists")
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 })
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(), // In production, use proper UUID
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.replace(/\s/g, ""),
      dateOfBirth: dateOfBirth || undefined,
      address: address?.trim() || undefined,
      city: city.trim(),
      interests: Array.isArray(interests) ? interests : [],
      createdAt: new Date().toISOString(),
    }

    // Save to "database" (in production, save to real database)
    users.push(newUser)

    // Log registration (in production, you might want to send welcome email, etc.)
    console.log("New user registered:", {
      id: newUser.id,
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
      city: newUser.city,
      interests: newUser.interests,
    })

    // In a real application, you might want to:
    // 1. Send a welcome email
    // 2. Create a user session
    // 3. Send SMS confirmation
    // 4. Add to mailing list
    // 5. Log analytics event

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful! Welcome to Blantyre Health Hub.",
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          city: newUser.city,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 })
  }
}

// Optional: GET endpoint to retrieve user data (for admin purposes)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email")

  if (!email) {
    return NextResponse.json({ error: "Email parameter is required" }, { status: 400 })
  }

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Return user data without sensitive information
  return NextResponse.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    city: user.city,
    interests: user.interests,
    createdAt: user.createdAt,
  })
}
