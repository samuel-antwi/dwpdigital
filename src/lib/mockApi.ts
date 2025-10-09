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
 * @param _question - The user's question (currently unused, returns random response)
 * @returns Promise resolving to a mock response
 */
export async function getMockResponse(_question: string): Promise<string> {
  // Simulate network delay (200-800ms)
  const delay = Math.random() * 600 + 200;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Select a random response
  const randomIndex = Math.floor(Math.random() * MOCK_RESPONSES.length);
  return MOCK_RESPONSES[randomIndex];
}
