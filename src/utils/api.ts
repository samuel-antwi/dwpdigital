import type { ChatApiRequest, ChatApiResponse } from "@/types/chat";

/**
 * API endpoint for chat service (Next.js API route)
 */
const API_ENDPOINT = "/api/chat";

/**
 * Timeout for API requests (10 seconds)
 */
const API_TIMEOUT = 10000;

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Sends a chat message to the API
 * @param question - The user's question
 * @returns Promise resolving to the bot's response
 * @throws ApiError if the request fails
 */
export async function sendChatMessage(question: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const requestBody: ChatApiRequest = { question };

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = "Failed to get response from chat service";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // Ignore JSON parse errors
      }

      throw new ApiError(errorMessage, response.status);
    }

    const data: ChatApiResponse = await response.json();

    if (!data.response || typeof data.response !== "string") {
      throw new ApiError("Invalid response format from chat service");
    }

    return data.response;
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle abort/timeout
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError("Request timed out. Please try again.");
    }

    // Re-throw ApiError instances
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle other errors
    throw new ApiError(
      "An unexpected error occurred. Please try again.",
      undefined,
      error
    );
  }
}

/**
 * User-friendly error message for display in chat
 * @param error - The error that occurred
 * @returns A user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Sorry, something went wrong. Please try again.";
}
