# nootify_me

A lightweight helper package for integrating with the [nootify_me](https://nootifyme.com) platform — a real-time push notification service that alerts developers and teams the moment something breaks.

## ✨ Features

- Simple API for sending real-time push notifications
- Built-in support for silent logging mode
- TypeScript support included
- Lightweight and easy to integrate

## 📦 Installation

```bash
npm install nootifyme
```

## 🚀 Quick Start

1. Create an account at [nootifyme.com](https://nootifyme.com) and get your API key from the dashboard

2. Set up your environment variables in your `.env` file:

```env
NEXT_PUBLIC_NOOTIFY_API_KEY=your_api_key_here
NEXT_PUBLIC_NOOTIFY_ACTIVE=true  # Set to "true" to enable notifications, "false" to disable. Perfect for dev mode. Set to false to not incur in usage.
```

3. Use the package in your code:

```ts
import { nootifyMe } from "nootifyme";

// Simple usage with just a message
await nootifyMe("🚨 API error on production!");

// Advanced usage with custom title and silent mode
await nootifyMe({
  message: "🚨 API error on production!",
  title: "Production Alert",
  silent: false, // Set to true to only log without sending push notification
});
```

## 📖 API Reference

### `nootifyMe(input: string | { message: string, title?: string, silent?: boolean }): Promise<{success: true} | {error: any}>`

Sends a push notification to NootifyMe from your backend service.

#### Simple Usage (String Input)

```ts
await nootifyMe("Your message here");
```

#### Parameters for Simple usage

- `string`: A simple message to send

When using a with simple usage all you need to do is pass in a string. The title of the push notification will default to your project name (set automatically by the nootify_me API)

#### Advanced Usage (Object Input)

```ts
await nootifyMe({
  message: "Your message here",
  title: "Custom Title", // Optional
  silent: false, // Optional: Set to true to only log without sending push notification
});
```

#### Parameters for Advanced usage

- `object`:
  - `message` (string) — Required. The alert message
  - `title` (string) — Optional. Custom title for the notification
  - `silent` (boolean) — Optional. Set to true to only log the message without sending a push notification

#### Return Value

The function returns a Promise that resolves to:

- `{ success: true }` when the notification is sent successfully
- `{ error: any }` when an error occurs (instead of throwing)

#### Error Handling

The function will return an error object (not throw) if:

- Not in a Node.js environment
- NEXT_PUBLIC_NOOTIFY_API_KEY is not set
- No message is provided
- Fetch API is not available
- API returns an error response

#### Environment Variables

- `NEXT_PUBLIC_NOOTIFY_API_KEY` (required): Your nootify_me API key
- `NEXT_PUBLIC_NOOTIFY_ACTIVE` (optional): Set to "true" to enable notifications, any other value disables them

## 🛡️ Requirements

- Node.js environment
- NootifyMe API key
- Fetch API support

## 🧠 About

NootifyMe is a push notification service that delivers **critical backend alerts straight to your phone**. Designed for small dev teams, solopreneurs, and anyone tired of missing errors in email or Slack.

> Something breaks. You don't know. No alert. Time passes.  
> The AWS bill arrives. It's bad. You spiral.  
> Now you use **NootifyMe**.

## 👨‍💻 Contributing

Contributions welcome! Please open issues or pull requests if you have ideas for improvements or new helper utilities.

## 📄 License

MIT © [JMPLABS LLC](https://nootifyme.com)
