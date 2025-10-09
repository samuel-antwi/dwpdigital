import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
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
            href="/chat"
            className="inline-block px-8 py-4 bg-govuk-blue hover:bg-govuk-blue-hover
                       text-white font-semibold text-lg rounded-lg
                       focus:outline-none focus:ring-4 focus:ring-govuk-blue
                       transition-colors duration-200"
          >
            Start Chatting
          </Link>
        </div>
      </div>
    </div>
  );
}
