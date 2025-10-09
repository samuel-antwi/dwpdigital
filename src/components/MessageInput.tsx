"use client";

import { useState, FormEvent, KeyboardEvent, useRef, useEffect } from "react";
import {
  validateMessage,
  MAX_MESSAGE_LENGTH,
  VALIDATION_ERRORS,
} from "@/utils/validation";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

/**
 * MessageInput component handles user input with validation and character counter
 */
export function MessageInput({
  onSendMessage,
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled) {
      textareaRef.current?.focus();
    }
  }, [disabled]);

  const remaining = MAX_MESSAGE_LENGTH - message.length;
  const isOverLimit = remaining < 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validation = validateMessage(message);

    if (!validation.isValid) {
      setError(validation.error || "Invalid message");
      return;
    }

    setError(null);
    onSendMessage(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  const handleChange = (value: string) => {
    setMessage(value);

    // Show error in real-time when over limit
    if (value.length > MAX_MESSAGE_LENGTH) {
      setError(VALIDATION_ERRORS.MESSAGE_TOO_LONG);
    } else if (error) {
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg">
      <div className="space-y-2">
        <div className="relative">
          <label htmlFor="message-input" className="sr-only">
            Type your message
          </label>
          <textarea
            ref={textareaRef}
            id="message-input"
            value={message}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Type your question here..."
            rows={3}
            className={`w-full px-4 py-3 border-2 rounded-lg resize-none
                       text-gray-900 placeholder:text-gray-400
                       focus:outline-none focus:ring-2
                       disabled:bg-gray-100 disabled:cursor-not-allowed
                       ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-govuk-blue"}
                       `}
            aria-invalid={!!error || isOverLimit}
            aria-describedby={error ? "message-error" : "character-count"}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span
              id="character-count"
              className={`text-sm ${
                isOverLimit ? "text-red-600 font-semibold" : "text-gray-600"
              }`}
              aria-live="polite"
            >
              {Math.max(0, remaining)} character
              {Math.max(0, remaining) !== 1 ? "s" : ""} remaining
            </span>
            {error && (
              <span
                id="message-error"
                className="text-sm text-red-600 font-semibold"
                role="alert"
              >
                {error}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={disabled || isOverLimit}
            className="px-6 py-2 bg-govuk-blue hover:bg-govuk-blue-hover
                     text-white font-semibold rounded-lg
                     focus:outline-none focus:ring-4 focus:ring-govuk-blue
                     disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed
                     transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
}
