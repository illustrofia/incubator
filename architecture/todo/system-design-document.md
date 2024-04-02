# Dome: System Design Document

## Project Overview

**Purpose:**
Dome is designed to help users efficiently manage their todos. It provides functionalities to add, update, delete todos, with personalized todo management through user authentication.

## System Architecture

### Frontend:

- **Technologies:** TypeScript with React.
- **Features:** User Authentication, Todo CRUD operations, filtering.

### Backend:

- **Technologies:** Node.js with TypeScript, Hono for RESTful API and Prisma for database management.
- **Database:** PostgreSQL for storing user and todo data.
- **Authentication:** JWT for secure authentication and session management.

### Infrastructure:

- **Deployment:** Use of Docker containers for both frontend and backend services.
- **CI/CD:** Implementation with GitHub Actions or GitLab CI for continuous integration and deployment.

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