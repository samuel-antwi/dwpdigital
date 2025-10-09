import { render, screen } from "@testing-library/react";
import { Message } from "../Message";
import type { ChatMessage } from "@/types/chat";

describe("Message Component", () => {
  const mockTimestamp = new Date("2025-10-09T12:00:00");

  describe("bot messages", () => {
    const botMessage: ChatMessage = {
      id: "1",
      role: "bot",
      content: "Hello, how can I help you?",
      timestamp: mockTimestamp,
    };

    it("should render bot message content", () => {
      render(<Message message={botMessage} />);
      expect(
        screen.getByText("Hello, how can I help you?")
      ).toBeInTheDocument();
    });

    it('should display "Assistant" label for bot messages', () => {
      render(<Message message={botMessage} />);
      expect(screen.getByText("Assistant")).toBeInTheDocument();
    });

    it("should have correct aria-label for bot messages", () => {
      render(<Message message={botMessage} />);
      const messageElement = screen.getByRole("article");
      expect(messageElement).toHaveAttribute("aria-label", "Assistant message");
    });

    it("should apply correct styling for bot messages", () => {
      render(<Message message={botMessage} />);
      const container = screen
        .getByText("Hello, how can I help you?")
        .closest("div");
      expect(container).toHaveClass("bg-gray-200");
    });
  });

  describe("user messages", () => {
    const userMessage: ChatMessage = {
      id: "2",
      role: "user",
      content: "I need help with my career",
      timestamp: mockTimestamp,
    };

    it("should render user message content", () => {
      render(<Message message={userMessage} />);
      expect(
        screen.getByText("I need help with my career")
      ).toBeInTheDocument();
    });

    it('should display "You" label for user messages', () => {
      render(<Message message={userMessage} />);
      expect(screen.getByText("You")).toBeInTheDocument();
    });

    it("should have correct aria-label for user messages", () => {
      render(<Message message={userMessage} />);
      const messageElement = screen.getByRole("article");
      expect(messageElement).toHaveAttribute("aria-label", "You message");
    });

    it("should apply correct styling for user messages", () => {
      render(<Message message={userMessage} />);
      const container = screen
        .getByText("I need help with my career")
        .closest("div");
      expect(container).toHaveClass("text-white");
    });
  });

  describe("timestamp formatting", () => {
    it("should display formatted timestamp", () => {
      const message: ChatMessage = {
        id: "3",
        role: "bot",
        content: "Test message",
        timestamp: new Date("2025-10-09T14:30:00"),
      };

      render(<Message message={message} />);
      // The exact format depends on locale, but we can check it's rendered
      const timeElement = screen.getByText(/\d{1,2}:\d{2}\s*(AM|PM)/i);
      expect(timeElement).toBeInTheDocument();
    });
  });

  describe("content handling", () => {
    it("should handle multiline content", () => {
      const message: ChatMessage = {
        id: "4",
        role: "bot",
        content: "Line 1\nLine 2\nLine 3",
        timestamp: mockTimestamp,
      };

      render(<Message message={message} />);
      expect(screen.getByText(/Line 1/)).toBeInTheDocument();
    });

    it("should handle long content", () => {
      const longContent =
        "This is a very long message that should wrap properly within the message bubble without breaking the layout";
      const message: ChatMessage = {
        id: "5",
        role: "user",
        content: longContent,
        timestamp: mockTimestamp,
      };

      render(<Message message={message} />);
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });

    it("should handle special characters", () => {
      const message: ChatMessage = {
        id: "6",
        role: "bot",
        content: "Hello! How are you? I'm fine 😊",
        timestamp: mockTimestamp,
      };

      render(<Message message={message} />);
      expect(screen.getByText(/Hello!/)).toBeInTheDocument();
    });

    it("should handle empty content", () => {
      const message: ChatMessage = {
        id: "7",
        role: "bot",
        content: "",
        timestamp: mockTimestamp,
      };

      render(<Message message={message} />);
      expect(screen.getByRole("article")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it('should have role="article"', () => {
      const message: ChatMessage = {
        id: "8",
        role: "bot",
        content: "Test",
        timestamp: mockTimestamp,
      };

      render(<Message message={message} />);
      expect(screen.getByRole("article")).toBeInTheDocument();
    });

    it("should have appropriate aria-label", () => {
      const message: ChatMessage = {
        id: "9",
        role: "bot",
        content: "Test",
        timestamp: mockTimestamp,
      };

      render(<Message message={message} />);
      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("aria-label");
    });
  });
});
