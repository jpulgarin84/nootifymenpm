// --- Type Definitions ---
type AdvancedInput = {
    title?: string;
    message: string;
    broadcast?: boolean;
};

type SimpleInput = string;

// --- Environment-Aware Functions ---

function getApiKey(): string | null {
    if (typeof process === 'undefined' || !process.env) return null;
    return process.env.NOOTIFY_BACKEND_API_KEY ||
        process.env.NEXT_PUBLIC_NOOTIFY_API_KEY ||
        process.env.VITE_NOOTIFY_API_KEY ||
        process.env.REACT_APP_NOOTIFY_API_KEY ||
        null;
}

/**
 * Intelligently checks if notifications are enabled from conventional environment variables.
 * It prioritizes backend keys over frontend keys.
 * @returns {boolean} True if active, false otherwise.
 */
function isNootifyActive(): boolean {
    if (typeof process === 'undefined' || !process.env) {
        return true; // Default to active in non-Node.js environments
    }

    const activeEnv = process.env.NOOTIFY_ACTIVE ||
        process.env.NEXT_PUBLIC_NOOTIFY_ACTIVE ||
        process.env.VITE_NOOTIFY_ACTIVE ||
        process.env.REACT_APP_NOOTIFY_ACTIVE;

    // If no active variable is set, it's active by default.
    // If it is set, it must be explicitly "true".
    return activeEnv === undefined || activeEnv.toLowerCase() === 'true';
}

// --- Core `noot` Logic ---

/**
 * Sends a notification without blocking the main thread.
 * This function is not meant to be called directly.
 * @param {SimpleInput | AdvancedInput} input The notification to send.
 */
async function sendNootification(input: SimpleInput | AdvancedInput) {
    try {
        const apiKey = getApiKey();
        const isActive = isNootifyActive();

        if (!apiKey) {
            const errorMessage = "Nootify API Key not found. Please set one of the following environment variables: NOOTIFY_BACKEND_API_KEY, NEXT_PUBLIC_NOOTIFY_API_KEY, VITE_NOOTIFY_API_KEY, REACT_APP_NOOTIFY_API_KEY";
            console.error(errorMessage);
            return; // No throw to avoid unhandled promise rejection
        }

        if (!isActive) {
            // This is not an error, so a simple log is fine.
            console.log("Nootify is disabled (NOOTIFY_ACTIVE is not 'true'). Notification not sent.");
            return;
        }

        const message = typeof input === "string" ? input : input.message;
        if (!message) {
            console.error("A message is required to send a notification.");
            return;
        }

        const title = typeof input === "object" ? input.title : undefined;
        const broadcast = typeof input === "object" ? input.broadcast ?? false : false;

        if (typeof fetch !== 'function') {
            console.error("Fetch API is not available in this environment. If on Node.js, consider using a polyfill like 'node-fetch'.");
            return;
        }

        const response = await fetch("https://www.nootifyme.com/api/notification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: apiKey, title, message, broadcast }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: "Failed to parse error response." }));
            console.error("Nootify API Error:", errorData.error || `HTTP error! status: ${response.status}`);
            return;
        }

        const responseData = await response.json();
        if (responseData.error) {
            console.error("Nootify API Error:", responseData.error);
        }
    } catch (error) {
        console.error("Nootify Error:", error);
    }
}


/**
 * The universal noot function. Just import and use.
 * It automatically detects the environment and API key.
 * This function is non-blocking and does not return a promise.
 *
 * @param {SimpleInput | AdvancedInput} input The notification to send. Can be a simple string or an object with title, message, and broadcast options.
 *
 * @example
 * import { noot } from 'nootifyme';
 *
 * // Send a simple notification
 * noot('This just works!');
 *
 * // Send a notification with a custom title
 * noot({ title: 'Custom', message: 'Noot noot!' });
 *
 * // Send a push notification to all subscribers
 * noot({ title: 'Big News', message: 'We just launched a new feature!', broadcast: true });
 */
function noot(input: SimpleInput | AdvancedInput) {
    sendNootification(input);
}

// --- Named Export ---
// Export the `noot` function as a named export to enforce its usage.
export { noot };
