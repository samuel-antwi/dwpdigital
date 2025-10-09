# Mock Gemma API Server

A simple Express server that mimics the Gemma API for testing the chat application.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:8080`

## Testing

### Test the backend directly:
```bash
curl -X POST http://localhost:8080/gemma2n/chat \
  -H "Content-Type: application/json" \
  -d '{"question":"What career help is available?"}'
```

### Health check:
```bash
curl http://localhost:8080/health
```

## Usage with Chat App

1. Start this backend server: `npm start`
2. In another terminal, run the Next.js app: `npm run dev`
3. Open http://localhost:3000 and test the chat
4. You should see real responses from this backend (logged in this terminal)

## To Test Fallback

1. Stop this server (Ctrl+C)
2. Chat app should automatically fall back to mock responses
3. Check browser console for "Gemma API not available" message

## Features

- ✅ Accepts POST to `/gemma2n/chat`
- ✅ Expects `{ question: "..." }` format
- ✅ Returns `{ response: "..." }` format
- ✅ CORS enabled for localhost:3000
- ✅ Contextual responses based on keywords
- ✅ Simulated processing delay (200-600ms)
- ✅ Request logging for debugging
