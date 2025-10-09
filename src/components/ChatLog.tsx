"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage as ChatMessageType } from "@/types/chat";
import { Message } from "./Message";

interface ChatLogProps {
  messages: ChatMessageType[];
  isLoading?: boolean;
}

/**
 * ChatLog component displays the conversation history and auto-scrolls to new messages
 */
export function ChatLog({ messages, isLoading = false }: ChatLogProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-inner focus:outline-none"
      role="log"
      aria-live="polite"
      aria-label="Chat conversation"
      tabIndex={0}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          {isLoading && (
            <div
              className="flex justify-start mb-4"
              role="status"
              aria-label="Assistant is typing"
            >
              <div className="max-w-[80%] md:max-w-[70%] rounded-lg px-4 py-3 bg-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-700">
                    Assistant
                  </span>
                </div>
                <div className="flex gap-1 mt-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-delay-0" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-delay-150" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-delay-300" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}
