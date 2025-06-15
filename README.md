# @nootifyme/helper

BETA.

Helper functions for integrating with the [NootifyMe](https://nootifyme.com) platform — a real-time push notification service that alerts developers and teams the moment something breaks.

## ✨ Features

- Easy-to-use utilities for authenticating and interacting with NootifyMe
- Built-in support for sending server alerts
- Helper methods for formatting payloads and validating tokens
- TypeScript support included

## 📦 Installation

```bash
npm install @nootifyme/helpers
# or
yarn add @nootifyme/helpers
```

## 🚀 Usage

First, set up your environment variables in your `.env` file:

```env
NOOTIFY_API_KEY=your_api_key_here
NOOTIFY_ACTIVE=true  # Set to "true" to enable notifications, "false" to disable
```

Then use the package in your code:

```ts
import { nootifyMe } from "@nootifyme/helper";

// Simple usage with just a message
await nootifyMe("🚨 API error on production!");

// Advanced usage with options
await nootifyMe({
  message: "🚨 API error on production!",
  title: "Production Alert",
  silent: false,
});
```

## 🔧 Available Functions

### `nootifyMe(input: string | { message: string, title?: string, silent?: boolean }): Promise<void>`

Sends a push notification to NootifyMe from your backend service.

**Parameters:**

- `input` can be either:
  - `string`: A simple message to send
  - `object`:
    - `message` (string) — Required. The alert message
    - `title` (string) — Optional. Custom title for the notification
    - `silent` (boolean) — Optional. Set to true to only log the message without sending a push notification

### `validatePayload(payload: any): boolean`

Lightweight helper to ensure your alert payload is correctly structured before sending.

### `formatMessage(service: string, error: string): string`

Formats a clean, readable message for the notification.

## ✅ Example

```ts
import { sendAlert, formatMessage } from "@nootifyme/helpers";

const service = "aws-spend-monitor";
const error = "Threshold exceeded: $210.52";

const message = formatMessage(service, error);

await sendAlert({
  message,
  level: "critical",
  service,
});
```

## 🧪 Testing

You can use tools like:

- [Smee.io](https://smee.io/) for webhook testing
- [ngrok](https://ngrok.com/) to expose your local server for testing alerts

## 🛡️ Requirements

- Node.js v14 or later
- Used with NootifyMe backend API credentials

## 🧠 About

NootifyMe is a push notification service that delivers **critical backend alerts straight to your phone**. Designed for small dev teams, solopreneurs, and anyone tired of missing errors in email or Slack.

> Something breaks. You don't know. No alert. Time passes.  
> The AWS bill arrives. It's bad. You spiral.  
> Now you use **NootifyMe**.

## 👨‍💻 Contributing

Contributions welcome! Please open issues or pull requests if you have ideas for improvements or new helper utilities.

## 📄 License

MIT © [Jose Pulgarin](https://nootifyme.com)
