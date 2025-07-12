import { type NextRequest, NextResponse } from "next/server"
import { UserDatabase } from "@/lib/database"
import { EmailService } from "@/lib/email"

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

    // Initialize database and email service
    const userDb = new UserDatabase()
    const emailService = new EmailService()

    // Initialize database tables if needed
    await userDb.initializeDatabase()

    // Check if email already exists
    const emailExists = await userDb.emailExists(email.toLowerCase().trim())
    if (emailExists) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 400 })
    }

    // Check if phone already exists
    const phoneExists = await userDb.phoneExists(phone.replace(/\s/g, ""))
    if (phoneExists) {
      return NextResponse.json({ error: "An account with this phone number already exists" }, { status: 400 })
    }

    // Prepare user data
    const userData = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.replace(/\s/g, ""),
      date_of_birth: dateOfBirth || undefined,
      address: address?.trim() || undefined,
      city: city.trim(),
      interests: Array.isArray(interests) ? interests : [],
    }

    // Save user to database
    const newUser = await userDb.createUser(userData)

    // Send email notification to admin
    try {
      await emailService.sendRegistrationNotification({
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        phone: userData.phone,
        dateOfBirth: userData.date_of_birth,
        address: userData.address,
        city: userData.city,
        interests: userData.interests,
      })

      console.log(`Registration notification sent to healthhubconnect071@gmail.com for user: ${userData.email}`)
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError)
      // Continue with success response even if admin email fails
    }

    // Send welcome email to user
    try {
      await emailService.sendWelcomeEmail(userData.email, `${userData.first_name} ${userData.last_name}`)

      console.log(`Welcome email sent to user: ${userData.email}`)
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // Continue with success response even if welcome email fails
    }

    // Log successful registration
    console.log("New user registered:", {
      id: newUser.id,
      name: `${newUser.first_name} ${newUser.last_name}`,
      email: newUser.email,
      city: newUser.city,
      interests: newUser.interests,
      timestamp: newUser.created_at,
    })

    return NextResponse.json(
      {
        success: true,
        message:
          "Registration successful! Welcome to Blantyre Health Hub. Check your email for a welcome message, and our team will be in touch soon.",
        user: {
          id: newUser.id,
          firstName: newUser.first_name,
          lastName: newUser.last_name,
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

// GET endpoint for admin to retrieve users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const limit = Number.parseInt(searchParams.get("limit") || "100")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const userDb = new UserDatabase()

    if (email) {
      // Get specific user by email
      const user = await userDb.getUserByEmail(email)
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      return NextResponse.json({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        interests: user.interests,
        createdAt: user.created_at,
      })
    } else {
      // Get all users (for admin dashboard)
      const users = await userDb.getAllUsers(limit, offset)
      const totalCount = await userDb.getUserCount()

      return NextResponse.json({
        users: users.map((user) => ({
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          city: user.city,
          interests: user.interests,
          createdAt: user.created_at,
        })),
        totalCount,
        limit,
        offset,
      })
    }
  } catch (error) {
    console.error("Error retrieving users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
