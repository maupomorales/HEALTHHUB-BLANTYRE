// Email service for sending notifications
import nodemailer from "nodemailer"

export interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

export interface EmailData {
  to: string
  subject: string
  text: string
  html?: string
}

export class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    // Configure email transporter
    this.transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app password
      },
    })
  }

  // Send email notification
  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html || emailData.text.replace(/\n/g, "<br>"),
      }

      const result = await this.transporter.sendMail(mailOptions)
      console.log("Email sent successfully:", result.messageId)
      return true
    } catch (error) {
      console.error("Error sending email:", error)
      throw error
    }
  }

  // Send registration notification to admin
  async sendRegistrationNotification(userData: any): Promise<boolean> {
    const subject = `🏥 New Health Hub Registration - ${userData.firstName} ${userData.lastName}`

    const text = `
NEW BLANTYRE HEALTH HUB REGISTRATION

📋 PERSONAL INFORMATION:
• Name: ${userData.firstName} ${userData.lastName}
• Email: ${userData.email}
• Phone: ${userData.phone}
• Date of Birth: ${userData.dateOfBirth || "Not provided"}
• Address: ${userData.address || "Not provided"}
• City/Area: ${userData.city}

🏥 HEALTH INTERESTS:
${
  userData.interests && userData.interests.length > 0
    ? userData.interests.map((interest: string) => `• ${interest}`).join("\n")
    : "• None selected"
}

📅 REGISTRATION DETAILS:
• Registration Date: ${new Date().toLocaleDateString("en-GB")}
• Registration Time: ${new Date().toLocaleTimeString("en-GB")}
• Timestamp: ${new Date().toISOString()}

📧 CONTACT INFORMATION:
You can reach out to this new subscriber at:
• Email: ${userData.email}
• Phone: ${userData.phone}

---
This registration was submitted through the Blantyre Health Hub website.
Please follow up with the subscriber to provide relevant health updates for their area.

Best regards,
Blantyre Health Hub System
    `.trim()

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0; font-size: 24px;">🏥 New Health Hub Registration</h1>
          <p style="color: #64748b; margin: 10px 0 0 0;">Blantyre Health Hub</p>
        </div>

        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">📋 Personal Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 5px 0; color: #374151;"><strong>Name:</strong></td><td style="padding: 5px 0; color: #111827;">${userData.firstName} ${userData.lastName}</td></tr>
            <tr><td style="padding: 5px 0; color: #374151;"><strong>Email:</strong></td><td style="padding: 5px 0; color: #111827;">${userData.email}</td></tr>
            <tr><td style="padding: 5px 0; color: #374151;"><strong>Phone:</strong></td><td style="padding: 5px 0; color: #111827;">${userData.phone}</td></tr>
            <tr><td style="padding: 5px 0; color: #374151;"><strong>Date of Birth:</strong></td><td style="padding: 5px 0; color: #111827;">${userData.dateOfBirth || "Not provided"}</td></tr>
            <tr><td style="padding: 5px 0; color: #374151;"><strong>Address:</strong></td><td style="padding: 5px 0; color: #111827;">${userData.address || "Not provided"}</td></tr>
            <tr><td style="padding: 5px 0; color: #374151;"><strong>City/Area:</strong></td><td style="padding: 5px 0; color: #111827;">${userData.city}</td></tr>
          </table>
        </div>

        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="color: #166534; margin: 0 0 15px 0; font-size: 18px;">🏥 Health Interests</h2>
          ${
            userData.interests && userData.interests.length > 0
              ? `<ul style="margin: 0; padding-left: 20px; color: #111827;">
                ${userData.interests.map((interest: string) => `<li style="margin: 5px 0;">${interest}</li>`).join("")}
               </ul>`
              : '<p style="color: #6b7280; margin: 0;">None selected</p>'
          }
        </div>

        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px;">📅 Registration Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 5px 0; color: #374151;"><strong>Date:</strong></td><td style="padding: 5px 0; color: #111827;">${new Date().toLocaleDateString("en-GB")}</td></tr>
            <tr><td style="padding: 5px 0; color: #374151;"><strong>Time:</strong></td><td style="padding: 5px 0; color: #111827;">${new Date().toLocaleTimeString("en-GB")}</td></tr>
            <tr><td style="padding: 5px 0; color: #374151;"><strong>Timestamp:</strong></td><td style="padding: 5px 0; color: #111827;">${new Date().toISOString()}</td></tr>
          </table>
        </div>

        <div style="background-color: #e0e7ff; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="color: #3730a3; margin: 0 0 15px 0; font-size: 18px;">📧 Next Steps</h2>
          <p style="color: #111827; margin: 0 0 10px 0;">You can reach out to this new subscriber at:</p>
          <ul style="margin: 0; padding-left: 20px; color: #111827;">
            <li style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${userData.email}" style="color: #2563eb;">${userData.email}</a></li>
            <li style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${userData.phone}" style="color: #2563eb;">${userData.phone}</a></li>
          </ul>
        </div>

        <div style="text-align: center; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
          <p style="color: #64748b; margin: 0; font-size: 14px;">
            This registration was submitted through the Blantyre Health Hub website.<br>
            Please follow up with the subscriber to provide relevant health updates for their area.
          </p>
        </div>
      </div>
    </div>
    `

    return await this.sendEmail({
      to: "healthhubconnect071@gmail.com",
      subject,
      text,
      html,
    })
  }

  // Send welcome email to user
  async sendWelcomeEmail(userEmail: string, userName: string): Promise<boolean> {
    const subject = `Welcome to Blantyre Health Hub! 🏥`

    const text = `
Hello ${userName},

Welcome to Blantyre Health Hub! 🎉

Thank you for subscribing to our health updates. You're now part of a community dedicated to better health and wellness in Blantyre.

What you can expect:
• Regular health tips and wellness advice
• Updates about healthcare providers in your area
• Information about new health services
• Emergency health alerts when necessary
• Exclusive health content for subscribers

We're committed to keeping you informed about the best healthcare options available in Blantyre.

If you have any questions or need assistance, feel free to contact us:
📧 Email: healthhubconnect071@gmail.com
📞 Phone: +265 897976524

Stay healthy!

Best regards,
The Blantyre Health Hub Team
    `.trim()

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0; font-size: 28px;">🏥 Welcome to Blantyre Health Hub!</h1>
        </div>

        <p style="color: #111827; font-size: 16px; line-height: 1.6;">Hello <strong>${userName}</strong>,</p>
        
        <p style="color: #111827; font-size: 16px; line-height: 1.6;">
          Welcome to Blantyre Health Hub! 🎉<br><br>
          Thank you for subscribing to our health updates. You're now part of a community dedicated to better health and wellness in Blantyre.
        </p>

        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">What you can expect:</h2>
          <ul style="margin: 0; padding-left: 20px; color: #111827;">
            <li style="margin: 8px 0;">Regular health tips and wellness advice</li>
            <li style="margin: 8px 0;">Updates about healthcare providers in your area</li>
            <li style="margin: 8px 0;">Information about new health services</li>
            <li style="margin: 8px 0;">Emergency health alerts when necessary</li>
            <li style="margin: 8px 0;">Exclusive health content for subscribers</li>
          </ul>
        </div>

        <p style="color: #111827; font-size: 16px; line-height: 1.6;">
          We're committed to keeping you informed about the best healthcare options available in Blantyre.
        </p>

        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h3 style="color: #166534; margin: 0 0 15px 0;">Need assistance?</h3>
          <p style="color: #111827; margin: 0;">
            📧 Email: <a href="mailto:healthhubconnect071@gmail.com" style="color: #2563eb;">healthhubconnect071@gmail.com</a><br>
            📞 Phone: <a href="tel:+265897976524" style="color: #2563eb;">+265 897976524</a>
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #111827; font-size: 16px; margin: 0;">Stay healthy!</p>
          <p style="color: #64748b; font-size: 14px; margin: 10px 0 0 0;">
            Best regards,<br>
            <strong>The Blantyre Health Hub Team</strong>
          </p>
        </div>
      </div>
    </div>
    `

    return await this.sendEmail({
      to: userEmail,
      subject,
      text,
      html,
    })
  }

  // Test email connection
  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify()
      console.log("Email service is ready")
      return true
    } catch (error) {
      console.error("Email service error:", error)
      return false
    }
  }
}
