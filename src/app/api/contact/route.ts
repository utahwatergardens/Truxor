import { NextRequest, NextResponse } from 'next/server';

// CRM Integration - Replace with your actual CRM API
async function sendToCRM(data: any) {
  // Example HubSpot integration
  const hubspotData = {
    properties: {
      firstname: data.name.split(' ')[0],
      lastname: data.name.split(' ').slice(1).join(' '),
      email: data.email,
      phone: data.phone,
      company: data.company || '',
      service_needed: data.service,
      location: data.location,
      project_details: data.projectDetails,
      urgency: data.urgency,
      budget_range: data.budget,
      timeline: data.timeline,
      source: data.source,
    },
  };

  try {
    // Replace with your actual HubSpot API endpoint and key
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
      },
      body: JSON.stringify(hubspotData),
    });

    if (!response.ok) {
      throw new Error('HubSpot API error');
    }

    return await response.json();
  } catch (error) {
    console.error('CRM integration error:', error);
    // For now, just log the data (replace with actual CRM integration)
    console.log('Contact form submission:', data);
    return { success: true }; // Simulate success
  }
}

// Spam protection - Simple rate limiting
const submissions = new Map<string, number[]>();

function isSpam(ip: string): boolean {
  const now = Date.now();
  const window = 60 * 60 * 1000; // 1 hour
  const maxSubmissions = 5; // Max 5 submissions per hour

  if (!submissions.has(ip)) {
    submissions.set(ip, [now]);
    return false;
  }

  const userSubmissions = submissions.get(ip)!;
  const recentSubmissions = userSubmissions.filter(time => now - time < window);
  
  if (recentSubmissions.length >= maxSubmissions) {
    return true;
  }

  recentSubmissions.push(now);
  submissions.set(ip, recentSubmissions);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Basic spam protection
    if (isSpam(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const data = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'service', 'location', 'projectDetails'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Send to CRM
    const crmResult = await sendToCRM(data);

    // Send notification email (optional)
    if (process.env.NOTIFICATION_EMAIL) {
      await sendNotificationEmail(data);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      crmResult 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Send notification email
async function sendNotificationEmail(data: any) {
  // Implement email notification logic here
  // You can use services like SendGrid, Resend, or Nodemailer
  console.log('Notification email would be sent for:', data.email);
}
