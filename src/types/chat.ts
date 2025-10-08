/**
 * Chat message types and API interfaces
 */

export type MessageRole = "user" | "bot";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface ChatApiRequest {
  question: string;
}

export interface ChatApiResponse {
  response: string;
}

export interface ChatApiError {
  error: string;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
