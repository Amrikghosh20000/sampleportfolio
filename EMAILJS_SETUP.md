# EmailJS Setup Instructions

This guide will help you set up EmailJS to enable the contact form to send emails to **mmoupriyabiswas53@gmail.com**.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Important**: Make sure the service is connected to **mmoupriyabiswas53@gmail.com**
6. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create an Email Template

1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Use the following template settings:

   **Template Name**: Contact Form Template
   
   **Subject**: New Contact Form Message from {{from_name}}
   
   **Content**:
   ```
   You have received a new message from your portfolio contact form.
   
   From: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   
   ---
   Reply to: {{reply_to}}
   ```

4. Click **Save**
5. Note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **Account** > **General** in your EmailJS dashboard
2. Find your **Public Key** (e.g., `abcdefghijklmnop`)
3. Copy this key

## Step 5: Configure Environment Variables

1. In your project root, create a file named `.env` (not `.env.example`)
2. Add the following content with your actual values:

```env
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
```

**Example:**
```env
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
```

## Step 6: Restart Development Server

After creating the `.env` file:

1. Stop your development server (Ctrl+C)
2. Start it again: `npm run dev`
3. The contact form should now work!

## Step 7: Test the Form

1. Fill out the contact form on your website
2. Click "Send Message"
3. Check **mmoupriyabiswas53@gmail.com** for the email

## Troubleshooting

### Form shows "EmailJS is not configured"
- Make sure you created a `.env` file (not just `.env.example`)
- Verify all three environment variables are set correctly
- Restart your development server after creating/updating `.env`

### Emails not being received
- Check your EmailJS dashboard for error logs
- Verify your email service is properly connected
- Make sure the template variables match ({{from_name}}, {{from_email}}, {{message}})
- Check your spam folder

### For Production Deployment

When deploying to production (Netlify, Vercel, etc.):

1. Add the same environment variables in your hosting platform's settings
2. For Netlify: Site Settings > Environment Variables
3. For Vercel: Project Settings > Environment Variables
4. Make sure to add them for "Production" environment
5. Redeploy your site after adding the variables

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Perfect for portfolio websites

If you need more, consider upgrading to a paid plan.
