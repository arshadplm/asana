import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Connect to your preferred email service here.
    //
    // Option A — Resend (https://resend.com):
    //   const resend = new Resend(process.env.RESEND_API_KEY)
    //   await resend.emails.send({
    //     from: 'Portfolio <noreply@afsanaarshad.com>',
    //     to: ['hello@afsanaarshad.com'],
    //     subject: `Portfolio Contact: ${subject}`,
    //     html: `<p>From: ${name} (${email})</p><p>${message}</p>`,
    //   })
    //
    // Option B — Formspree:
    //   await fetch(`https://formspree.io/f/${process.env.FORMSPREE_ID}`, {
    //     method: 'POST',
    //     body: JSON.stringify({ name, email, subject, message }),
    //     headers: { 'Content-Type': 'application/json' },
    //   })
    // ─────────────────────────────────────────────────────────────────────────

    console.log('Contact form submission:', { name, email, subject, message })

    return NextResponse.json(
      { message: 'Message received. Thank you for reaching out!' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
