const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Gemma API endpoint
app.post("/gemma2n/chat", (req, res) => {
  const { question } = req.body;

  console.log(`📩 Received question: "${question}"`);

  // Validate request
  if (!question || typeof question !== "string") {
    console.log("❌ Invalid request - missing question");
    return res.status(400).json({ error: "Question is required" });
  }

  // Simulate processing delay (200-600ms)
  const delay = Math.random() * 400 + 200;

  setTimeout(() => {
    // Generate a response based on the question
    const response = generateResponse(question);
    console.log(`✅ Sending response: "${response}"`);

    res.json({ response });
  }, delay);
});

// Generate contextual responses
function generateResponse(question) {
  const q = question.toLowerCase();

  if (q.includes("career") || q.includes("job")) {
    return "The National Careers Service offers free career advice and guidance to help you make decisions on learning and work.";
  }

  if (q.includes("apprentice")) {
    return "You can find information about apprenticeships and training opportunities on the GOV.UK website.";
  }

  if (q.includes("cv") || q.includes("resume")) {
    return "You can access CV writing tips and interview preparation resources through our employment support services.";
  }

  if (q.includes("training") || q.includes("course")) {
    return "We offer various training programs to help you develop new skills and improve your employability.";
  }

  if (q.includes("universal credit") || q.includes("benefit")) {
    return "For jobseeker support, you may be eligible for Universal Credit while looking for work.";
  }

  // Default response
  return `Thank you for your question about "${question}". The National Careers Service offers free career advice and guidance. You can also find support through your local Jobcentre Plus office.`;
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Mock Gemma API is running" });
});

// Start server
app.listen(PORT, () => {
  console.log("");
  console.log("🚀 Mock Gemma API Server Started");
  console.log("================================");
  console.log(`📍 Running on: http://localhost:${PORT}`);
  console.log(`📡 Endpoint: POST /gemma2n/chat`);
  console.log(`💚 Health check: GET /health`);
  console.log("");
  console.log("Ready to receive chat requests...");
  console.log("Press Ctrl+C to stop");
  console.log("");
});
