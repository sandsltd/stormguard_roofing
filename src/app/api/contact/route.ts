import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getContent } from '@/utils/content';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, service, message, recipient } = data;

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Get content for company info and email subject
    const content = await getContent();
    
    // Get email settings from environment variables
    const emailConfig = {
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587', 10),
      username: process.env.EMAIL_USER || 'your-email@gmail.com',
      password: process.env.EMAIL_PASS || 'your-app-password',
      from: process.env.EMAIL_FROM || 'noreply@stormguardroofing.co.uk',
      to: recipient || 'hello@saunders-simmons.co.uk' // Use recipient from request or default
    };
    
    // Add additional recipient from contact settings if available
    let recipients = emailConfig.to;
    if (content.contact.email && content.contact.email !== emailConfig.to) {
      recipients = `${recipients}, ${content.contact.email}`;
    }
    
    // Verify that email settings exist
    if (!emailConfig.host || !emailConfig.username || !emailConfig.password) {
      console.error('Email configuration is missing. Using fallback method for development.');
      
      // For development purposes, log the submission and return success
      console.log('Form submission:', { name, email, phone, service, message, recipients });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Form submitted successfully (development mode)',
        data: { name, email, phone, service }
      });
    }

    // Format the current date
    const currentDate = new Date().toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Create professional HTML email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.business.name} - New Sales Lead</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .container {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
          }
          .header {
            background-color: ${content.theme?.primaryColor || '#3b82f6'};
            color: white;
            padding: 20px;
            text-align: center;
          }
          .lead-alert {
            background-color: #ffedd5;
            border-left: 4px solid #f97316;
            padding: 12px 15px;
            margin-bottom: 20px;
            color: #7c2d12;
            font-weight: bold;
          }
          .content {
            padding: 20px;
          }
          .section {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #f0f0f0;
          }
          .section:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          .label {
            font-weight: bold;
            margin-bottom: 5px;
            color: #555;
          }
          .value {
            margin-top: 5px;
          }
          .message-box {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 4px;
            border-left: 4px solid ${content.theme?.primaryColor || '#3b82f6'};
          }
          .footer {
            background-color: #f5f5f5;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #777;
          }
          .business-name {
            font-weight: bold;
            font-size: 1.1em;
          }
          .cta-box {
            background-color: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 6px;
            padding: 15px;
            margin-top: 15px;
          }
          .cta-heading {
            color: #0369a1;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .cta-text {
            color: #0c4a6e;
          }
          .highlight {
            font-weight: bold;
            color: #0ea5e9;
          }
          .status-new {
            display: inline-block;
            background-color: #22c55e;
            color: white;
            font-size: 14px;
            font-weight: bold;
            padding: 3px 10px;
            border-radius: 20px;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="status-new">NEW LEAD</span>
            <h1>${content.business.name}</h1>
            <h2>Sales Opportunity</h2>
            <p>${currentDate}</p>
          </div>
          <div class="content">
            <div class="lead-alert">
              <span>⚡ New lead requires your attention</span>
            </div>
            
            <div class="section">
              <p>A potential customer has submitted an enquiry through the <span class="business-name">${content.business.name}</span> website contact form. This lead is waiting for your response.</p>
            </div>
            
            <div class="section">
              <div class="label">Lead Information:</div>
              <div class="value"><strong>Name:</strong> ${name || 'Not provided'}</div>
              <div class="value"><strong>Email:</strong> ${email}</div>
              <div class="value"><strong>Phone:</strong> ${phone || 'Not provided'}</div>
              <div class="value"><strong>Service Interest:</strong> ${service || 'General Enquiry'}</div>
            </div>
            
            <div class="section">
              <div class="label">Customer Message:</div>
              <div class="message-box">
                ${message || 'No message provided'}
              </div>
            </div>
            
            <div class="section">
              <div class="cta-box">
                <div class="cta-heading">📈 Lead Conversion Tips:</div>
                <ul class="cta-text">
                  <li>Respond within <span class="highlight">1 hour</span> to increase conversion chances by 7x</li>
                  <li>Address the specific service request in your response</li>
                  <li>Offer a clear next step (consultation, quote, site visit)</li>
                  <li>Include relevant case studies or testimonials if available</li>
                </ul>
              </div>
            </div>
            
            <div class="section">
              <p><strong>Priority Action:</strong> Contact this lead as soon as possible to maximise your chance of conversion.</p>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated message from ${content.business.name} website.</p>
            <p>© ${new Date().getFullYear()} ${content.business.name}. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.port === 465,
      auth: {
        user: emailConfig.username,
        pass: emailConfig.password,
      },
    });

    // Construct email
    const mailOptions = {
      from: emailConfig.from,
      to: recipients,
      subject: `🔥 NEW LEAD: ${content.business.name} - ${service || 'General Enquiry'} (${name || 'Website Visitor'})`,
      html: htmlTemplate,
      // Plain text version for email clients that don't support HTML
      text: `
NEW SALES LEAD - ${content.business.name}
${currentDate}

A potential customer has submitted an enquiry through your website.

LEAD INFORMATION:
Name: ${name || 'Not provided'}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service Interest: ${service || 'General Enquiry'}

CUSTOMER MESSAGE:
${message || 'No message provided'}

PRIORITY ACTION:
Respond to this lead quickly - leads contacted within 1 hour are 7x more likely to convert.

This is an automated message from ${content.business.name} website.
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 