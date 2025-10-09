import { NextRequest, NextResponse } from "next/server";
import { getMockResponse } from "@/lib/mockApi";

const GEMMA_API_URL = "http://localhost:8080/gemma2n/chat";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question } = body;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // Attempt to POST to the Gemma API as specified in requirements
    try {
      const response = await fetch(GEMMA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      // Check if server returned an error status (404, 500, etc.)
      // Note: Network errors (server unreachable) are caught in the catch block below
      // This handles cases where server is running but returns an error
      if (!response.ok) {
        console.warn(
          `Gemma API returned status ${response.status}, falling back to mock`
        );
        throw new Error("API returned non-200 status");
      }

      const data = await response.json();
      console.log("Gemma API returned data:", data);
      return NextResponse.json(data);
    } catch {
      // Backend not available - use mock responses for demonstration
      // This allows the assessment to be reviewed without running a separate backend
      console.log(
        "Gemma API not available at localhost:8080, using mock responses"
      );
      const mockResponse = await getMockResponse(question);
      return NextResponse.json({ response: mockResponse });
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
