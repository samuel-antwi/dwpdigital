"use client";

import { useState } from "react";
import type { ChatMessage } from "@/types/chat";
import { ChatLog } from "@/components/ChatLog";
import { MessageInput } from "@/components/MessageInput";
import { sendChatMessage, getErrorMessage } from "@/utils/api";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "bot",
      content: "What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (messageContent: string) => {
    // Create user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to API
      const response = await sendChatMessage(messageContent);

      // Create bot response message
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: response,
        timestamp: new Date(),
      };

      // Add bot response to chat
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Handle error gracefully
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: `I'm sorry, ${getErrorMessage(error)}`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col flex-1 bg-gray-50 overflow-hidden">
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full overflow-hidden px-4 pt-4">
          <h1 className="sr-only">GOV.UK Chat - Career Guidance Assistant</h1>
          <ChatLog messages={messages} isLoading={isLoading} />
        </div>
        <div className="max-w-4xl mx-auto mt-4 w-full px-4">
          <MessageInput
            onSendMessage={handleSendMessage}
            disabled={isLoading}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}
