import {
  validateMessage,
  MAX_MESSAGE_LENGTH,
  VALIDATION_ERRORS,
} from "../validation";

describe("validateMessage", () => {
  describe("empty message validation", () => {
    it("should reject empty string", () => {
      const result = validateMessage("");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(VALIDATION_ERRORS.EMPTY_MESSAGE);
    });

    it("should reject whitespace-only message", () => {
      const result = validateMessage("   ");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(VALIDATION_ERRORS.EMPTY_MESSAGE);
    });

    it("should reject message with tabs and spaces", () => {
      const result = validateMessage("\t  \n  ");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(VALIDATION_ERRORS.EMPTY_MESSAGE);
    });
  });

  describe("length validation", () => {
    it("should accept message under 100 characters", () => {
      const result = validateMessage("Hello, this is a test message");
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should accept message at exactly 100 characters", () => {
      const message = "a".repeat(100);
      const result = validateMessage(message);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should reject message over 100 characters", () => {
      const message = "a".repeat(101);
      const result = validateMessage(message);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(VALIDATION_ERRORS.MESSAGE_TOO_LONG);
    });

    it("should reject message significantly over limit", () => {
      const message = "a".repeat(200);
      const result = validateMessage(message);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(VALIDATION_ERRORS.MESSAGE_TOO_LONG);
    });
  });

  describe("whitespace handling", () => {
    it("should trim leading whitespace before validation", () => {
      const result = validateMessage("   Hello");
      expect(result.isValid).toBe(true);
    });

    it("should trim trailing whitespace before validation", () => {
      const result = validateMessage("Hello   ");
      expect(result.isValid).toBe(true);
    });

    it("should trim both leading and trailing whitespace", () => {
      const result = validateMessage("   Hello   ");
      expect(result.isValid).toBe(true);
    });

    it("should count characters after trimming", () => {
      // 100 'a' characters plus surrounding whitespace
      const message = "   " + "a".repeat(100) + "   ";
      const result = validateMessage(message);
      expect(result.isValid).toBe(true);
    });

    it("should reject if trimmed message exceeds limit", () => {
      // 101 'a' characters plus surrounding whitespace
      const message = "   " + "a".repeat(101) + "   ";
      const result = validateMessage(message);
      expect(result.isValid).toBe(false);
    });
  });

  describe("special characters", () => {
    it("should accept message with emojis", () => {
      const result = validateMessage("Hello 👋 World 🌍");
      expect(result.isValid).toBe(true);
    });

    it("should accept message with punctuation", () => {
      const result = validateMessage("Hello! How are you? I'm fine, thanks.");
      expect(result.isValid).toBe(true);
    });

    it("should accept message with numbers", () => {
      const result = validateMessage("My number is 123456789");
      expect(result.isValid).toBe(true);
    });

    it("should accept message with newlines", () => {
      const result = validateMessage("Line 1\nLine 2");
      expect(result.isValid).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should handle single character message", () => {
      const result = validateMessage("a");
      expect(result.isValid).toBe(true);
    });

    it("should handle message at 99 characters", () => {
      const message = "a".repeat(99);
      const result = validateMessage(message);
      expect(result.isValid).toBe(true);
    });

    it("should handle message at 101 characters", () => {
      const message = "a".repeat(101);
      const result = validateMessage(message);
      expect(result.isValid).toBe(false);
    });
  });

  describe("return value structure", () => {
    it("should return object with isValid true and no error for valid message", () => {
      const result = validateMessage("Valid message");
      expect(result).toEqual({
        isValid: true,
      });
    });

    it("should return object with isValid false and error for invalid message", () => {
      const result = validateMessage("");
      expect(result).toHaveProperty("isValid", false);
      expect(result).toHaveProperty("error");
      expect(typeof result.error).toBe("string");
    });
  });
});

describe("validation constants", () => {
  it("should have MAX_MESSAGE_LENGTH set to 100", () => {
    expect(MAX_MESSAGE_LENGTH).toBe(100);
  });

  it("should have EMPTY_MESSAGE error defined", () => {
    expect(VALIDATION_ERRORS.EMPTY_MESSAGE).toBeDefined();
    expect(typeof VALIDATION_ERRORS.EMPTY_MESSAGE).toBe("string");
  });

  it("should have MESSAGE_TOO_LONG error defined", () => {
    expect(VALIDATION_ERRORS.MESSAGE_TOO_LONG).toBeDefined();
    expect(typeof VALIDATION_ERRORS.MESSAGE_TOO_LONG).toBe("string");
  });

  it("should include character limit in error message", () => {
    expect(VALIDATION_ERRORS.MESSAGE_TOO_LONG).toContain("100");
  });
});
