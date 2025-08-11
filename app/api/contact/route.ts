import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || ''
    let name = ''
    let email = ''
    let subject = ''
    let message = ''

    if (contentType.includes('application/json')) {
      const body = await request.json()
      ;({ name = '', email = '', subject = '', message = '' } = body ?? {})
    } else {
      const form = await request.formData()
      name = String(form.get('name') || '')
      email = String(form.get('email') || '')
      subject = String(form.get('subject') || '')
      message = String(form.get('message') || '')
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


