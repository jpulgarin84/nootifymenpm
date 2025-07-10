# nootify_me

A lightweight, zero-dependency package for sending notifications to the [nootify_me](https://nootifyme.com) platform — a real-time notification service that alerts you the moment something important happens in your application.

## ✨ Features

- **Fire-and-Forget**: Send notifications without blocking your code.
- **Zero-Dependency**: No external packages to weigh down your project.
- **Universal**: Works in Node.js, Next.js, Vite, React, and more.
- **TypeScript Ready**: Full TypeScript support out of the box.

## 📦 Installation

```bash
npm install nootifyme
```

## 🚀 Quick Start

Using `nootifyme` is simple. Import the `noot` function and call it anywhere you need to send a notification. It's a "fire-and-forget" function, so you don't need to `await` it.

```ts
import { noot } from "nootifyme";

// Simple usage
noot("A user just signed up!");

// Advanced usage with a title
noot({
  title: "New Feature Used",
  message: "A user just used the new feature for the first time!",
});

// Send a push notification to all your subscribers
noot({
  title: "Big News!",
  message: "We just launched a new feature!",
  broadcast: true,
});
```

## ⚙️ Configuration

First, get your API key from the [nootify_me dashboard](https://nootifyme.com). Then, set it as an environment variable.

The package will automatically detect the correct variable based on your framework.

<details>
<summary><b>Next.js</b></summary>

For **server-side** components or API routes, use `.env.local`:
```env
# .env.local
NOOTIFY_BACKEND_API_KEY=your_api_key_here
```

For **client-side** components, prefix the variable with `NEXT_PUBLIC_`:
```env
# .env.local
NEXT_PUBLIC_NOOTIFY_API_KEY=your_api_key_here
```
</details>

<details>
<summary><b>Vite / Create React App</b></summary>

For Vite or Create React App, use `.env.local` and prefix the variable:
```env
# .env.local
# For Vite
VITE_NOOTIFY_API_KEY=your_api_key_here

# For Create React App
REACT_APP_NOOTIFY_API_KEY=your_api_key_here
```
</details>

<details>
<summary><b>Node.js (Backend)</b></summary>

For a standard Node.js backend (e.g., Express, Fastify), use a `.env` file with a library like `dotenv`:
```env
# .env
NOOTIFY_BACKEND_API_KEY=your_api_key_here
```
</details>

### Disabling Notifications

To temporarily disable notifications without removing the key (e.g., in development), you can set the `NOOTIFY_ACTIVE` variable.

```env
# Set to "false" to disable, "true" or leave undefined to enable.
NOOTIFY_ACTIVE=false
```
The package checks for `NOOTIFY_ACTIVE`, `NEXT_PUBLIC_NOOTIFY_ACTIVE`, `VITE_NOOTIFY_ACTIVE`, etc.

## 📖 API Reference

### `noot(input)`

Sends a notification. This is a non-blocking function and does not return a value.

#### `input: string`

When you pass a string, it becomes the notification message. The title defaults to your project name.

```ts
noot("Something important happened.");
```

#### `input: object`

- `message` (string, **required**): The notification message.
- `title` (string, optional): A custom title for the notification.
- `broadcast` (boolean, optional): Set to `true` to send the notification as a push notification to all your subscribers. Defaults to `false`.

```ts
noot({
  title: "User Action",
  message: "A user has upgraded their plan.",
  broadcast: false, // Default
});
```

## 🧠 About nootify_me

nootify_me is a notification service that delivers **critical alerts straight to your phone**. Designed for developers, small teams, and solopreneurs who are tired of missing important events buried in email or Slack.

> Something breaks. You don't know. Time passes.  
> The AWS bill arrives. It's bad. You spiral.  
> Now you use **nootify_me**.

## 👨‍💻 Contributing

Contributions are welcome! Please open an issue or pull request if you have ideas for improvements.

## 📄 License

MIT © [JMPLABS LLC](https://nootifyme.com)