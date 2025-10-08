import type { ChatMessage } from "@/types/chat";

interface MessageProps {
  message: ChatMessage;
}

/**
 * Formats timestamp to display as "HH:MM AM/PM"
 */
function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Message component displays a single chat message from either the user or bot
 */
export function Message({ message }: MessageProps) {
  const isBot = message.role === "bot";

  return (
    <div
      className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}
      role="article"
      aria-label={`${isBot ? "Assistant" : "You"} message`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] px-4 py-3 shadow-sm ${
          isBot
            ? "bg-gray-200 text-gray-900 rounded-t-2xl rounded-br-2xl rounded-bl-md"
            : "text-white rounded-t-2xl rounded-bl-2xl rounded-br-md"
        }`}
        style={!isBot ? { backgroundColor: "#1D71B8" } : {}}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-xs font-semibold ${
              isBot ? "text-gray-700" : "text-white"
            }`}
          >
            {isBot ? "Assistant" : "You"}
          </span>
        </div>
        <p className="text-sm md:text-base break-words whitespace-pre-wrap mb-1">
          {message.content}
        </p>
        <p className={`text-xs ${isBot ? "text-gray-600" : "text-white"}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
