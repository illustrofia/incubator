# Todo App: System Design Document

## Project Overview

**Purpose:**
Dome is designed to help users efficiently manage their todos. It provides functionalities to add, update, delete todos, with personalized todo management through user authentication.

## System Architecture

### Frontend:

- **Technologies:** React with TypeScript, Tanstack Router for routing, and React Query for data fetching and caching.
- **Features:** User Authentication, Todo CRUD operations, and responsive design.

### Backend:

- **Technologies:** Node.js with TypeScript, Hono for RESTful API and Prisma for database management.
- **Database:** PostgreSQL for storing user and todo data.
- **Authentication:** JWT for secure authentication and session management.

### Infrastructure:

- **Deployment:** Google Cloud Run for backend service and Vercel for frontend deployment.
- **CI/CD:** Google Cloud Build for backend, and Vercel for frontend.
- **Monitoring:** Sentry for both frontend and backend error tracking.
- **Code Quality:** ESLint and Prettier for code formatting and linting, Husky for pre-commit hooks and Sonarcloud for code analysis.

## Data Model

### User:

- `id`: Unique identifier
- `username`: String
- `email`: String
- `password`: Hashed password
- `todos`: Array of Todo IDs

### Todo:

- `id`: Unique identifier
- `title`: String
- `completed`: Boolean
- `createdAt`: Date
- `userId`: ID of the User who created the todo

## API Endpoints

### User Authentication:

- `POST /auth/signup`: Signup a new user and setup a JWT session.
- `POST /auth/login`: Authenticate a user and setup a JWT session.

### Todo Management:

- `GET /todos`: Fetch all todos for the logged-in user.
- `POST /todos`: Create a new todo.
- `PATCH /todos/:id`: Update a todo by ID.
- `DELETE /todos/:id`: Delete a todo by ID.

## Security Considerations

- **Authentication:** Secure user sessions with JWTs.
- **Passwords:** Store passwords securely by hashing.
- **Input Validation:** Prevent SQL injection and XSS attacks through rigorous input validation.
- **HTTPS:** Encrypt data in transit using HTTPS.
