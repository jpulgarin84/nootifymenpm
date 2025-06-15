type options = {
    title?: string;
    message: string;
    silent?: boolean;
}
type message = string
type input = message | options

/**
 * Sends a notification to the nootifyme API.
 * Parameters can be either:
 * - string: will send log message to console, and send a push notification. For Title will default to project name.
 * - object: { message: string, title?: string, silent?: boolean }: Where you can speficy more details an also set silent to true to not send a push notification but still capture the log in nootifyme to view from the app. 
 * @param {string } input The message to send.
 * or
 * @param {object} input Full object with message, title, and silent.
 * @returns {Promise<void>} A promise that resolves when the notification is sent.
 */
export const nootifyMe = async (input: string | { message: string, title?: string, silent?: boolean }) => {
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
