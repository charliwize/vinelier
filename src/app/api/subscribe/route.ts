// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import client from '@sendgrid/client'
import sgMail from '@sendgrid/mail'

client.setApiKey(process.env.SENDGRID_API_KEY!)
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(req: NextRequest) {

  try {
    const { email, name } = await req.json()
    if (!email || !name) {
      return NextResponse.json({ error: 'Missing email or name' }, { status: 400 })
    }

    // 1️⃣ Upsert into Marketing Contacts
    const contactsBody = {
      list_ids: [process.env.SENDGRID_LIST_ID!],
      contacts: [{ email, first_name: name }]
    }
    const [res1] = await client.request({
      method: 'PUT',
      url: '/v3/marketing/contacts',
      body: contactsBody
    })
    
    if (res1.statusCode! >= 400) {
      console.error('SendGrid marketing error', res1.statusCode, res1.body)
      return NextResponse.json({ error: 'Failed to save contact' }, { status: 500 })
    }

    // // 2️⃣ (Optional) Send a welcome transactional email
    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: `Welcome to our Newsletter, ${name}!`,
      text: `Hi ${name}, thanks for signing up!`,
      html: `<p>Hi <strong>${name}</strong>,</p><p>Thanks for joining our newsletter 🎉</p>`
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: message || 'Unknown error' }, { status: 500 })
  }
}
