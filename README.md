# nootify_me

A lightweight, zero-dependency package for sending logs to the [nootify_me](https://nootifyme.com) platform.

## ✨ Features

- **Fire-and-Forget**: Send logs without blocking your code.
- **Zero-Dependency**: No external packages to weigh down your project.
- **Universal**: Works in Node.js, Next.js, Vite, React, and more.
- **TypeScript Ready**: Full TypeScript support out of the box.

## 📦 Installation

```bash
npm install nootifyme
```

## 🚀 Quick Start

Using `nootifyme` is simple. Import the `noot` function and call it anywhere you need to send logs. It's a "fire-and-forget" function, so you don't need to `await` it.

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

First, get your API key from your [nootify_me project dashboard](https://nootifyme.com) inside your nootifyme account. Then, set it as an environment variable in your project.

The package automatically detects the correct environment variable based on your framework. You need to set one of these variables in your `.env` file or as environment variables:

<details>
    <summary><b>Next.js</b></summary>

Add these environment variables to your `.env` file:

For **server-side** components or API routes:

```env
NOOTIFY_BACKEND_API_KEY=your_api_key_here
```

For **client-side** components:

```env
NEXT_PUBLIC_NOOTIFY_API_KEY=your_api_key_here
```

You can add both keys to the same `.env` file if you need to use nootifyme on both frontend and backend.

</details>

<details>
<summary><b>Vite / Create React App</b></summary>

Add the appropriate environment variable to your `.env` file:

For **Vite**:

```env
VITE_NOOTIFY_API_KEY=your_api_key_here
```

For **Create React App**:

```env
REACT_APP_NOOTIFY_API_KEY=your_api_key_here
```

</details>

<details>
<summary><b>Node.js (Backend)</b></summary>

For Node.js backends (Express, Fastify, etc.), add this to your `.env` file:

```env
NOOTIFY_BACKEND_API_KEY=your_api_key_here
```

Make sure to use a library like `dotenv` to load your environment variables.

</details>

### Disabling Logs

To disable logs (perfect for dev environments), set `NOOTIFY_ACTIVE` to `false`. This prevents logs from being created.

```env
NOOTIFY_ACTIVE=false
```

For frontend frameworks, use the appropriate prefix:

- Next.js: `NEXT_PUBLIC_NOOTIFY_ACTIVE=false`
- Vite: `VITE_NOOTIFY_ACTIVE=false`
- Create React App: `REACT_APP_NOOTIFY_ACTIVE=false`

## 📖 API Reference

### `noot(input)`

Sends logs. This is a non-blocking function and does not return a value.

#### `input: string`

When you pass a string, it becomes the log message. The title defaults to your project name.

```ts
noot("Something important happened.");
```

#### `input: object`

- `message` (string, **required**): The log message.
- `title` (string, optional): A custom title for the log.
- `broadcast` (boolean, optional): Set to `true` to send the log as a push notification to all your subscribers. Defaults to `false`.

```ts
noot({
  title: "User Action",
  message: "A user has upgraded their plan.",
  broadcast: false, // Default
});
```

<!-- ## 🧠 About nootify_me -->
<!---->
<!-- nootify_me is a notification service that delivers **critical alerts straight to your phone**. Designed for developers, small teams, and solopreneurs who are tired of missing important events buried in email or Slack. -->
<!---->
<!-- > Something breaks. You don't know. Time passes.   -->
<!-- > The server bill arrives. It's bad. You spiral.   -->
<!-- > Now you use **nootify_me**. -->

## 👨‍💻 Contributing

Contributions are welcome! Please open an issue or pull request if you have ideas for improvements.

## 📄 License

MIT © [JMPLABS LLC](https://nootifyme.com)
