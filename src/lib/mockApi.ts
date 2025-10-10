const MOCK_RESPONSES = [
  "Based on your question, I recommend exploring our career guidance services available through the National Careers Service.",
  "You can find information about apprenticeships and training opportunities on the GOV.UK website.",
  "For jobseeker support, you may be eligible for Universal Credit while looking for work.",
  "The National Careers Service offers free career advice and guidance to help you make decisions on learning and work.",
  "You can access CV writing tips and interview preparation resources through our employment support services.",
  "Consider exploring different career paths using our skills assessment tools available online.",
  "Job search assistance is available through your local Jobcentre Plus office.",
  "We offer various training programs to help you develop new skills and improve your employability.",
];

/**
 * Simulates an API call with a mock response
 * Supports error simulation for testing error handling:
 * - Type "error" or "fail" to simulate API errors
 * - Type "timeout" to simulate request timeout
 *
 * @param question - The user's question
 * @returns Promise resolving to a mock response
 * @throws Error when specific keywords are detected (for testing)
 */
export async function getMockResponse(question: string): Promise<string> {
  const lowerQuestion = question.toLowerCase();

  // Simulate API error for testing error handling
  if (lowerQuestion.includes("error") || lowerQuestion.includes("fail")) {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Brief delay
    throw new Error("Simulated API error - service temporarily unavailable");
  }

  // Simulate timeout for testing timeout handling
  if (lowerQuestion.includes("timeout")) {
    // Wait longer than the API timeout (10 seconds)
    await new Promise((resolve) => setTimeout(resolve, 15000));
  }

  // Simulate network delay (200-800ms)
  const delay = Math.random() * 600 + 200;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Select a random response
  const randomIndex = Math.floor(Math.random() * MOCK_RESPONSES.length);
  return MOCK_RESPONSES[randomIndex];
}
