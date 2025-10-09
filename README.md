# GOV.UK Chat - Career Guidance Assistant

A Next.js chatbot application that allows UK citizens to ask questions and receive AI-powered guidance on government career services.

## 📋 Project Overview

This application was developed as a coding exercise for the DWP Digital Front End Developer role. It demonstrates:

- Modern React/Next.js development with App Router and TypeScript
- Accessible, user-friendly interface meeting WCAG 2.2 AA standards
- Robust error handling and graceful degradation
- Clean, maintainable code architecture
- Integration with external AI services (Gemma API)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd dwp_digital
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Optional: Backend API

The application is designed to work with or without a backend API:

- **With Backend**: Start the Gemma API server at `http://localhost:8080/gemma2n/chat`
- **Without Backend**: The app automatically falls back to mock responses for demonstration purposes

#### Testing Backend (Included for Convenience)

A simple Express server is provided in the `test-backend/` directory to facilitate testing the Gemma API integration. This is optional and provided solely for reviewer convenience.

**To start the test backend:**

```bash
cd test-backend
npm install
npm start
```

The backend will start on `http://localhost:8080`. You can then test the full integration by running the Next.js app in a separate terminal.

**Note:** This test backend is not part of the core deliverable - it's included as a testing convenience to demonstrate the full API integration flow.

## 🏗️ Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components
- **Accessibility**: WCAG 2.2 AA compliant
- **Testing**: Manual testing against acceptance criteria

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with navigation
│   ├── page.tsx                # Home page
│   ├── chat/
│   │   └── page.tsx            # Chat interface
│   └── api/
│       └── chat/
│           └── route.ts        # API proxy to Gemma backend
├── components/
│   ├── ChatLog.tsx             # Chat history display
│   ├── Message.tsx             # Individual message component
│   ├── MessageInput.tsx        # Text input with validation
│   ├── NavBar.tsx              # GOV.UK navigation header
│   ├── HeroSection.tsx         # Home page hero section
│   └── ErrorBoundary.tsx       # Error catching boundary
├── lib/
│   └── mockApi.ts              # Mock response generator
├── utils/
│   ├── api.ts                  # Client-side API helpers
│   └── validation.ts           # Input validation logic
└── types/
    └── chat.ts                 # TypeScript interfaces
```

## ✅ Acceptance Criteria Implementation

All 8 acceptance criteria have been fully implemented:

### AC1: Home Page ✅

- Root path (`/`) displays "Welcome to GOV.UK Chat"
- Paragraph: "Use this to find answers to your career questions, powered by AI"
- Located in: `src/app/page.tsx` and `src/components/HeroSection.tsx`

### AC2: Navigation ✅

- "Start Chatting" button navigates to `/chat`
- Implemented with Next.js Link component for client-side navigation

### AC3: Initial Bot Message ✅

- Chat page displays initial message: "What would you like to know?"
- Pre-populated in chat state on page load
- Located in: `src/app/chat/page.tsx`

### AC4: Message Sending ✅

- Text input with "Send" button
- POSTs to `http://localhost:8080/gemma2n/chat`
  -Request format: `{ question: "<typed message>" }`
- Implemented in: `src/app/api/chat/route.ts`

### AC5: Response Handling ✅

- Receives response: `{ response: "<response>" }`
- Appends bot response to chat log
- Auto-scrolls to latest message

### AC6: WCAG 2.2 AA Compliance ✅

- Semantic HTML landmarks (`<main>`, `<header>`, `<nav>`)
- ARIA labels and live regions
- Keyboard navigation support
- Color contrast ratios meet AA standards
- Screen reader compatible
- Focus indicators visible

### AC7: Validation ✅

- Messages must be 100 characters or less
- Real-time character counter
- Clear error messages for invalid input
- Implemented in: `src/utils/validation.ts`

### AC8: Error Handling ✅

- React Error Boundaries for rendering errors
- Network error handling with fallback to mock responses
- Server error handling (4xx, 5xx status codes)
- Graceful degradation when backend unavailable

## 🎨 Features

### User Experience

- **Auto-scroll**: Chat automatically scrolls to the latest message
- **Keyboard shortcuts**: Press Enter to send (Shift+Enter for new line)
- **Loading states**: Animated dots while waiting for response
- **Character counter**: Real-time feedback on remaining characters
- **Input protection**: Disabled during message processing to prevent duplicates

### Accessibility

- **Screen reader support**: ARIA labels and live regions
- **Keyboard navigation**: All functionality accessible via keyboard
- **Focus management**: Clear focus indicators
- **Semantic HTML**: Proper use of landmarks and headings
- **Color contrast**: Meets WCAG 2.2 AA standards
- **Error announcements**: Screen readers announce errors and updates

### Error Handling

- **Network errors**: Graceful fallback to mock responses
- **Server errors**: Handled with user-friendly messages
- **Rendering errors**: Caught by Error Boundaries
- **Validation errors**: Clear, actionable feedback

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Home Page**

   - [ ] Navigate to `http://localhost:3000`
   - [ ] Verify "Welcome to GOV.UK Chat" heading is displayed
   - [ ] Verify description paragraph is present
   - [ ] Click "Start Chatting" button
   - [ ] Confirm navigation to `/chat` page

2. **Chat Functionality**

   - [ ] Verify initial bot message appears
   - [ ] Type a message and click "Send"
   - [ ] Verify user message appears in chat
   - [ ] Verify bot response appears below
   - [ ] Verify chat auto-scrolls to latest message

3. **Validation**

   - [ ] Type a message under 100 characters → should work
   - [ ] Type a message over 100 characters → should show error
   - [ ] Verify character counter updates in real-time
   - [ ] Try to send empty message → should show error
   - [ ] Try to send whitespace-only message → should show error

4. **Keyboard Navigation**

   - [ ] Tab through all interactive elements
   - [ ] Verify focus indicators are visible
   - [ ] Press Enter in textarea → submits message
   - [ ] Press Shift+Enter → creates new line

5. **Accessibility**

   - [ ] Use browser accessibility tools to check WCAG compliance
   - [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
   - [ ] Zoom to 200% → verify functionality maintained
   - [ ] Check color contrast ratios

6. **Error Handling**
   - [ ] With backend running: verify real responses
   - [ ] Without backend: verify mock responses work
   - [ ] Check browser console for error logs

## 🔧 API Integration

### Endpoint: `/api/chat`

**Request:**

```json
POST /api/chat
Content-Type: application/json

{
  "question": "What career guidance is available?"
}
```

**Response:**

```json
{
  "response": "The National Careers Service offers free career advice..."
}
```

### Backend Integration Flow

1. User submits message via `MessageInput` component
2. Message is validated (100 character limit, not empty)
3. Valid message sent to Next.js API route (`/api/chat`)
4. API route attempts to POST to Gemma API at `localhost:8080/gemma2n/chat`
5. On success: Returns Gemma response
6. On failure: Falls back to mock response
7. Response displayed in chat log

### Mock Responses

When the Gemma API is unavailable, the application uses mock responses defined in `src/lib/mockApi.ts`. These simulate realistic career guidance content and include a network delay (200-800ms) to mimic real API behavior.

## 🎯 Code Quality Standards

This codebase follows professional development practices:

- **TypeScript**: Strong typing throughout for type safety
- **Component Architecture**: Single responsibility principle
- **Error Handling**: Defensive programming with graceful degradation
- **Accessibility**: WCAG 2.2 AA compliant from the ground up
- **Code Organization**: Clear separation of concerns
- **Documentation**: Inline comments for complex logic
- **Validation**: Centralized and testable validation logic

## 📝 Design Decisions

### Why Next.js App Router?

- Modern React patterns with Server Components
- Built-in API routes for backend integration
- File-based routing for simplicity
- TypeScript support out of the box

### Why Tailwind CSS?

- Rapid development with utility classes
- Consistent spacing and sizing
- Built-in responsive design utilities
- No CSS naming conflicts

### Why Mock Fallback?

- Allows reviewers to test without backend setup
- Demonstrates error handling capabilities
- Provides better demo experience
- Mirrors real-world graceful degradation

### Why Client-Side State Only?

- Application scope is limited (single chat session)
- No need for complex state management
- React hooks are sufficient
- Easier to understand and maintain

## 🚨 Known Limitations

- No message persistence (refresh clears history)
- No user authentication
- Single conversation context (no threading)
- Mock responses are random (not context-aware)
- No rate limiting implemented

These are intentional trade-offs to keep scope manageable while demonstrating core competencies.

## 📚 Additional Documentation

For detailed information about assumptions made during development, see [`readme.txt`](./readme.txt).

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [GOV.UK Design System](https://design-system.service.gov.uk/)

## 👤 Author

**Samuel Antwi**
Submission for DWP Digital Front End Developer role.

---

## 📄 License

This project is created for evaluation purposes as part of a job application process.
