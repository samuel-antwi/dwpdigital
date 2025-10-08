"use client";

import { useState } from "react";
import type { ChatMessage } from "@/types/chat";
import { ChatLog } from "@/components/ChatLog";

/**
 * Chat page component - main interface for the chatbot
 */
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6 overflow-hidden">
        <h1 className="sr-only">GOV.UK Chat - Career Guidance Assistant</h1>
        <ChatLog messages={messages} isLoading={isLoading} />
        <div className="mt-4"></div>
      </main>
    </div>
  );
}
