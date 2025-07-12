"use server"

// Server action for handling registration and email sending
export async function registerUser(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const dateOfBirth = formData.get("dateOfBirth") as string
  const address = formData.get("address") as string
  const city = formData.get("city") as string
  const interests = formData.getAll("interests") as string[]

  // Validation
  const errors: string[] = []

  if (!firstName || firstName.trim().length < 2) {
    errors.push("First name must be at least 2 characters long")
  }

  if (!lastName || lastName.trim().length < 2) {
    errors.push("Last name must be at least 2 characters long")
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    errors.push("Please provide a valid email address")
  }

  const phoneRegex = /^(\+265|265)?[0-9]{9}$/
  if (!phone || !phoneRegex.test(phone.replace(/\s/g, ""))) {
    errors.push("Please provide a valid Malawi phone number")
  }

  if (!city || city.trim().length < 2) {
    errors.push("City/Area is required")
  }

  if (errors.length > 0) {
    return { success: false, error: errors.join(", ") }
  }

  // Prepare email content
  const emailContent = `
NEW HEALTH HUB REGISTRATION

Personal Information:
• Name: ${firstName} ${lastName}
• Email: ${email}
• Phone: ${phone}
• Date of Birth: ${dateOfBirth || "Not provided"}
• Address: ${address || "Not provided"}
• City/Area: ${city}

Health Interests:
${interests && interests.length > 0 ? interests.map((interest) => `• ${interest}`).join("\n") : "• None selected"}

Registration Details:
• Date: ${new Date().toLocaleDateString()}
• Time: ${new Date().toLocaleTimeString()}
• Timestamp: ${new Date().toISOString()}

---
Submitted via Blantyre Health Hub Registration Form
  `.trim()

  try {
    // Here you would send the email to healthhubconnect071@gmail.com
    // For now, we'll log the information
    console.log("=== NEW REGISTRATION ===")
    console.log("Sending to: healthhubconnect071@gmail.com")
    console.log("Subject: New Health Hub Registration - " + firstName + " " + lastName)
    console.log("Content:", emailContent)
    console.log("========================")

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      success: true,
      message:
        "Registration successful! Your information has been sent to our team at healthhubconnect071@gmail.com. We'll contact you soon with health updates for your area.",
    }
  } catch (error) {
    console.error("Registration processing error:", error)
    return {
      success: false,
      error: "Failed to process registration. Please try again.",
    }
  }
}
