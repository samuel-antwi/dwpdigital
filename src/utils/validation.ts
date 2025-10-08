import type { ValidationResult } from "@/types/chat";

/**
 * Maximum allowed character length for chat messages
 */
export const MAX_MESSAGE_LENGTH = 100;

/**
 * Error messages for validation
 */
export const VALIDATION_ERRORS = {
  EMPTY_MESSAGE: "Please enter a message",
  MESSAGE_TOO_LONG: `Message must be ${MAX_MESSAGE_LENGTH} characters or less`,
} as const;

/**
 * Validates a chat message input
 * @param message - The message to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export function validateMessage(message: string): ValidationResult {
  // Trim whitespace for validation
  const trimmedMessage = message.trim();

  // Check if message is empty
  if (trimmedMessage.length === 0) {
    return {
      isValid: false,
      error: VALIDATION_ERRORS.EMPTY_MESSAGE,
    };
  }

  // Check if message exceeds max length
  if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
    return {
      isValid: false,
      error: VALIDATION_ERRORS.MESSAGE_TOO_LONG,
    };
  }

  return {
    isValid: true,
  };
}
