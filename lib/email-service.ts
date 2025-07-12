// Email service for mobile app
import * as MailComposer from "expo-mail-composer"

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

export class MobileEmailService {
  private static readonly ADMIN_EMAIL = "healthhubconnect071@gmail.com"

  static async sendRegistrationEmail(data: RegistrationData): Promise<boolean> {
    try {
      // Check if email composer is available
      const isAvailable = await MailComposer.isAvailableAsync()

      if (!isAvailable) {
        throw new Error("Email composer is not available on this device")
      }

      const subject = `🏥 New Health Hub Registration - ${data.firstName} ${data.lastName}`

      const body = this.formatRegistrationEmail(data)

      const result = await MailComposer.composeAsync({
        recipients: [this.ADMIN_EMAIL],
        subject: subject,
        body: body,
        isHtml: false,
      })

      return result.status === "sent"
    } catch (error) {
      console.error("Email sending error:", error)
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
This registration was submitted through the Blantyre Health Hub mobile app.
Please follow up with the subscriber to provide relevant health updates for their area.

Best regards,
Blantyre Health Hub Mobile App
    `.trim()
  }

  static async sendContactEmail(subject: string, message: string, userEmail?: string): Promise<boolean> {
    try {
      const isAvailable = await MailComposer.isAvailableAsync()

      if (!isAvailable) {
        throw new Error("Email composer is not available on this device")
      }

      const emailBody = userEmail ? `From: ${userEmail}\n\n${message}` : message

      const result = await MailComposer.composeAsync({
        recipients: [this.ADMIN_EMAIL],
        subject: `Health Hub Contact: ${subject}`,
        body: emailBody,
      })

      return result.status === "sent"
    } catch (error) {
      console.error("Contact email error:", error)
      throw error
    }
  }
}
