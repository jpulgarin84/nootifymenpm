type advanced = {
    title?: string;
    message: string;
    silent?: boolean;
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
 * // Simple usage - just a string. This will send a notification with the messsage and the title will be set automatically to the project name.
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
 * // Advanced usage - setup message, title, and if you want to senda a push notification or just want to capture the log in nootifyme to view from the app without sending a push notification.
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
 * @returns {Promise<void>} A promise that resolves when the notification is sent.
 * 
 * @throws {Error} If:
 *   - Not in a Node.js environment
 *   - NOOTIFY_API_KEY is not set
 *   - No message is provided
 *   - Fetch API is not available
 */
export const nootifyMe = async (input: simple | advanced) => {
    // export const nootifyMe = async (input: string | { message: string, title?: string, silent?: boolean }) => {
    try {
        // Check if we're in a Node.js environment
        if (typeof process === 'undefined' || !process.env) {
            throw new Error("This package must be used in a Node.js environment");
        }

        const APIKEY = process.env.NOOTIFY_API_KEY;
        const ACTIVE = process.env.NOOTIFY_ACTIVE === "true";

        if (!APIKEY) {
            throw new Error("NOOTIFY_API_KEY environment variable is required. Please add it to your .env file.");
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

        let silent = typeof input === "string"
            ? false
            : input.silent ?? false

        console.log("From nootify_me: ", input);

        if (ACTIVE !== true) {
            console.log("nootify_me is not active");
            return;
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
                silent: silent,
            }),
        });

        // if (!response.ok) {
        //     const errorData = await response.json().catch(() => null);
        //     throw new Error(`Failed to send notification: ${response.status} ${response.statusText}${errorData ? ` - ${JSON.stringify(errorData)}` : ''}`);
        // }
    } catch (error) {
        console.error("nootify_me error:", error);
        throw error;
    }
};
