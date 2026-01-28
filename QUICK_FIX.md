# Quick Fix for EmailJS "Account not found" Error

## Issue
The error "EmailJS account not found" appears when submitting the contact form.

## Solution Steps

### 1. **Restart Your Development Server** (IMPORTANT!)
Environment variables are only loaded when the server starts. You MUST restart:

```bash
# Stop the current server (Ctrl+C or Cmd+C)
# Then start it again:
npm run dev
```

### 2. **Verify Your EmailJS Template Configuration**

Go to your EmailJS dashboard → Email Templates → Edit "Contact Us" template:

**Required Template Variables:**
Make sure your template includes these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email  
- `{{message}}` - Message content
- `{{to_email}}` - Recipient email (optional, can be hardcoded)

**Recipient Email:**
In your template settings, set the "To Email" field to:
```
mmoupriyabiswas53@gmail.com
```

**Template Example:**
```
Subject: New Contact Form Message from {{from_name}}

You have received a new message from your portfolio contact form.

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

### 3. **Verify Service Connection**

Make sure your Gmail service (`service_5tst959`) is:
- ✅ Connected to a Gmail account
- ✅ Status shows "Connected" or "DEFAULT"
- ✅ Has permission to send emails

### 4. **Check Browser Console**

After restarting the server, open browser console (F12) and check:
- Look for "EmailJS Config:" log message
- Verify all three values are present (not "your_service_id", etc.)

### 5. **Test Again**

1. Fill out the contact form
2. Click "Send Message"
3. Check the console for any errors
4. Check `mmoupriyabiswas53@gmail.com` inbox

## Common Issues

**If still getting "Account not found":**
- The Public Key, Service ID, or Template ID might not belong to the same EmailJS account
- Make sure all three are from the same EmailJS account
- Try refreshing your EmailJS API keys

**If emails aren't being received:**
- Check spam folder
- Verify the "To Email" in template is `mmoupriyabiswas53@gmail.com`
- Check EmailJS dashboard for delivery logs/errors
