# nootifyMe

A lightweight helper package for integrating with the [NootifyMe](https://nootifyme.com) platform — a real-time push notification service that alerts developers and teams the moment something breaks.

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
NOOTIFY_API_KEY=your_api_key_here
NOOTIFY_ACTIVE=true  # Set to "true" to enable notifications, "false" to disable. Perfect for dev mode. Set to false to not incurr in usage.
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

### `nootifyMe(input: string | { message: string, title?: string, silent?: boolean }): Promise<void>`

Sends a push notification to NootifyMe from your backend service.

#### Simple Usage (String Input)

```ts
await nootifyMe("Your message here");
```

When using a string input:

- `message`: The notification message (required)
- `title`: Defaults to your project name (set automatically by NootifyMe)
- `silent`: Defaults to false (sends push notification)

#### Advanced Usage (Object Input)

```ts
await nootifyMe({
  message: "Your message here",
  title: "Custom Title", // Optional
  silent: false, // Optional: Set to true to only log without sending push notification
});
```

#### Parameters

- `input` can be either:
  - `string`: A simple message to send
  - `object`:
    - `message` (string) — Required. The alert message
    - `title` (string) — Optional. Custom title for the notification
    - `silent` (boolean) — Optional. Set to true to only log the message without sending a push notification

#### Error Handling

The function will throw an error if:

- Not in a Node.js environment
- NOOTIFY_API_KEY is not set
- No message is provided
- Fetch API is not available

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

MIT © [Jose Pulgarin](https://nootifyme.com)
