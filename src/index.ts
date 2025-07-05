type advanced = {
    title?: string;
    message: string;
    broadcast?: boolean;
}
type simple = string
/**
 * Sends a notification to the nootifyme API.
 * 
 * 
 * 
 * Simple Usage:
 * -------------
 * 
 * // Simple usage - just a string. This will send a notification with the message and the title will be set automatically to the project name.
 * 
 * @example
 * await nootifyMe("Hello world");
 * 
 * When using a string input, the function will:
 * - message: The notification message (required)
 * - title: Will default to your project name. This will be set automatically by the nootify_me API.
 * - silent: Will default to false (sends push notification). This will be set automatically by the nootify_me API.
 * 
 * Advanced Usage:
 * --------------
 * // Advanced usage - setup message, title, and if you want to send a push notification or just want to capture the log in nootify_me to view from the app without sending a push notification.
 * 
 * @example
 * await nootifyMe({
 *   message: "Hello world",
 *   title: "Custom Title",
 *   silent: false
 * });
 * 
 * 
 * When using an object input, you can configure:
 * - message: (Required) The notification message 
 * - title: (Optional) custom title for the notification. If not provided, defaults to project name
 * - silent: (Optional) boolean flag. If true, only logs the message without sending a push notification.
 *           If not provided, defaults to false (sends push notification)
 * 
 * @param {simple | advanced} input - The notification input. Can be either a string (simple) or an object (advanced)
 * 
 * @returns {Promise<{success: true} | {error: any}>} A promise that resolves with success object or error object.
 * 
 * @throws {Error} If:
 *   - Not in a Node.js environment
 *   - NEXT_PUBLIC_NOOTIFY_API_KEY is not set
 *   - No message is provided
 *   - Fetch API is not available
 *   - API returns an error response
 * 
 * Environment Variables:
 * ---------------------
 * - NEXT_PUBLIC_NOOTIFY_API_KEY: Your nootifyme API key (required)
 * - NEXT_PUBLIC_NOOTIFY_ACTIVE: Set to "true" to enable notifications, any other value disables them
 */
export const nootifyMe = async (input: simple | advanced) => {
    // export const nootifyMe = async (input: string | { message: string, title?: string, silent?: boolean }) => {
    try {
        // Check if we're in a Node.js environment
        if (typeof process === 'undefined' || !process.env) {
            throw new Error("This package must be used in a Node.js environment");
        }

        const APIKEY = process.env.NEXT_PUBLIC_NOOTIFY_API_KEY;
        const ACTIVE = process.env.NEXT_PUBLIC_NOOTIFY_ACTIVE === "true";

        if (!APIKEY) {
            throw new Error("NOOTIFY_API_KEY environment variable is required. Please add it to your .env file.");// fix this name is wrong
        }

        let message = typeof input === "string"
            ? input
            : typeof input === "object"
                ? input.message
                : undefined
        if (message === undefined || message === null) throw new Error("No message provided");

        let title = typeof input === "string"
            ? undefined
            : input.title ?? undefined;

        let broadcast = typeof input === "string"
            ? false
            : input.broadcast ?? false

        console.log("From nootify_me: ", input);

        if (ACTIVE !== true) {
            console.log("nootify_me is not active");
            return
        }

        if (typeof fetch !== 'function') {
            throw new Error("Fetch API is not available in this environment");
        }

        const response = await fetch("https://www.nootifyme.com/api/notification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: APIKEY,
                title: title,
                message: message,
                broadcast: broadcast,
            }),
        });

        const responseData = await response.json();

        if (responseData.error) throw new Error(responseData.error);
        return { success: true }
    } catch (error) {
        return { error: error }
    }
};
