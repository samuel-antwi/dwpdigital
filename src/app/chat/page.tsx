"use client";

/**
 * Chat page component - main interface for the chatbot
 */
export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6 overflow-hidden">
        <h1 className="sr-only">GOV.UK Chat - Career Guidance Assistant</h1>
        <div className="mt-4">Chat page</div>
      </main>
    </div>
  );
}
