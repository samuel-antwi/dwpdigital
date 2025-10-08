"use client";

import Link from "next/link";

export default function HeroItem() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <main className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Welcome to GOV.UK Chat
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Use this to find answers to your career questions, powered by AI
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-block px-8 py-4 text-white font-semibold text-lg rounded-lg
                       focus:outline-none focus:ring-4 transition-colors duration-200
                       hover:opacity-90 active:opacity-100"
            style={{ backgroundColor: "#1D71B8" }}
          >
            Start Chatting
          </Link>
        </div>
      </main>
    </div>
  );
}
