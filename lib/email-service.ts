// Simplified email service for web deployment
// In production, integrate with SendGrid, Mailgun, or AWS SES

export interface RegistrationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth?: string
  address?: string
  city: string
  interests: string[]
}

export class EmailService {
  private static readonly ADMIN_EMAIL = "healthhubconnect071@gmail.com"

  static async sendRegistrationNotification(data: RegistrationData): Promise<boolean> {
    try {
      // For now, we'll log the registration data
      // In production, replace this with actual email service integration

      const emailContent = this.formatRegistrationEmail(data)

      console.log("=== SENDING REGISTRATION EMAIL ===")
      console.log("To:", this.ADMIN_EMAIL)
      console.log("Subject: 🏥 New Health Hub Registration -", data.firstName, data.lastName)
      console.log("Content:")
      console.log(emailContent)
      console.log("===================================")

      // Simulate email sending
      await new Promise((resolve) => setTimeout(resolve, 500))

      return true
    } catch (error) {
      console.error("Email service error:", error)
      throw error
    }
  }

  private static formatRegistrationEmail(data: RegistrationData): string {
    return `
NEW BLANTYRE HEALTH HUB REGISTRATION

📋 PERSONAL INFORMATION:
• Name: ${data.firstName} ${data.lastName}
• Email: ${data.email}
• Phone: ${data.phone}
• Date of Birth: ${data.dateOfBirth || "Not provided"}
• Address: ${data.address || "Not provided"}
• City/Area: ${data.city}

🏥 HEALTH INTERESTS:
${data.interests.length > 0 ? data.interests.map((interest) => `• ${interest}`).join("\n") : "• None selected"}

📅 REGISTRATION DETAILS:
• Registration Date: ${new Date().toLocaleDateString()}
• Registration Time: ${new Date().toLocaleTimeString()}
• Timestamp: ${new Date().toISOString()}

📧 CONTACT INFORMATION:
You can reach out to this new subscriber at:
• Email: ${data.email}
• Phone: ${data.phone}

---
This registration was submitted through the Blantyre Health Hub website.
Please follow up with the subscriber to provide relevant health updates for their area.

Best regards,
Blantyre Health Hub System
    `.trim()
  }

  static async testConnection(): Promise<boolean> {
    try {
      console.log("Email service is ready (simulation mode)")
      return true
    } catch (error) {
      console.error("Email service error:", error)
      return false
    }
  }
}
