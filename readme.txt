ASSUMPTIONS MADE
================

1. BACKEND AVAILABILITY
   - Assumed the Gemma API backend at http://localhost:8080/gemma2n/chat may not always be available during testing/review
   - Implemented graceful fallback to mock responses to allow the application to be fully functional standalone
   - Mock responses provide realistic career guidance content to demonstrate the full user experience
   - Assumed it's acceptable to log backend unavailability to console for debugging purposes

2. STYLING & BRANDING
   - Used GOV.UK brand color (#1D71B8) for consistency with government services (color contrast verified to meet WCAG AA standards)
   - Implemented clean, accessible design without full GDS components (as per instructions: "not required to use GovUK / GDS")
   - Assumed modern browser support (ES6+, Flexbox, CSS Grid)
   - Focused on readability and usability over complex styling

3. VALIDATION SPECIFICS
   - Assumed 100 character limit should be applied to the trimmed message (whitespace removed before validation)
   - Assumed empty messages (including whitespace-only) should be rejected
   - Assumed real-time validation feedback improves user experience and is acceptable
   - Character counter shows remaining characters to help users stay within the limit

4. USER EXPERIENCE ENHANCEMENTS
   - Assumed chat should auto-scroll to latest message for better conversation flow
   - Assumed Enter key should submit message (with Shift+Enter for new line) as this is standard chat UX
   - Assumed input should be disabled during message processing to prevent duplicate submissions
   - Assumed loading state (animated dots) provides better feedback than no indicator
   - Assumed displaying timestamps for each message improves user experience and context

5. API INTEGRATION APPROACH
   - Assumed the API route should proxy requests through Next.js rather than calling localhost:8080 directly from the browser
   - This hides implementation details and allows for future middleware/authentication if needed
   - Assumed it's acceptable to catch and handle both network errors and non-200 status responses
   - Assumed fallback to mock responses when backend is unavailable or returns errors is acceptable

6. COMPONENT ARCHITECTURE
   - Assumed separation of concerns is important (ChatLog for display, MessageInput for input/validation, Message for individual messages)
   - Assumed React hooks (useState) are sufficient for state management (no need for Redux/Context for this scope)
   - Assumed reusable components following single responsibility principle is preferred

7. LAYOUT & SCROLLING BEHAVIOR
   - Assumed the page should not scroll at the page level (only the chat log should scroll)
   - Assumed the message input should remain fixed at the bottom and always visible
   - Assumed chat messages should scroll independently within their container
   - This required careful flexbox layout with overflow management

8. TESTING APPROACH
   - Implemented unit tests for critical business logic (validation) and component tests (Message component)
   - Focused on testing pure functions and presentational components with high test coverage
   - Assumed Jest with React Testing Library is the appropriate testing framework for Next.js projects
   - Did not implement E2E tests or API route tests to keep scope manageable

9. SCOPE & PRIORITIES
   - Assumed the focus is on demonstrating clean, maintainable, production-quality code
   - Did not implement features not mentioned in requirements (e.g., message history persistence, user authentication)
   - Focused on code quality and meeting requirements over additional features
