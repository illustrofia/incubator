# Dome: System Design Document

## Project Overview

**Purpose:**
Dome is designed to help users efficiently manage their tasks. It provides functionalities to add, update, delete, and categorize tasks, with personalized task management through user authentication.

## System Architecture

### Frontend:

- **Technologies:** TypeScript with React (alternative frameworks supporting TypeScript are also viable).
- **Features:** User Authentication, Task CRUD operations, Task categorization, Deadline reminders.

### Backend:

- **Technologies:** Node.js with TypeScript, Express for RESTful API.
- **Database:** Choice between MongoDB or PostgreSQL.
- **Authentication:** JWT for secure authentication and session management.

### Infrastructure:

- **Deployment:** Use of Docker containers for both frontend and backend services. Kubernetes for orchestration if necessary.
- **CI/CD:** Implementation with GitHub Actions or GitLab CI for continuous integration and deployment.

## Data Model

### User:

- `id`: Unique identifier
- `username`: String
- `email`: String
- `password`: Hashed password
- `tasks`: Array of Task IDs

### Task:

- `id`: Unique identifier
- `title`: String
- `description`: String (optional)
- `category`: String
- `deadline`: Date
- `completed`: Boolean
- `userId`: ID of the User who created the task

## API Endpoints

### User Authentication:

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Authenticate a user and return a JWT.

### Task Management:

- `GET /tasks`: Fetch all tasks for the logged-in user.
- `POST /tasks`: Create a new task.
- `PUT /tasks/:id`: Update a task by ID.
- `DELETE /tasks/:id`: Delete a task by ID.

## Security Considerations

- **Authentication:** Secure user sessions with JWTs.
- **Passwords:** Store passwords securely by hashing.
- **Input Validation:** Prevent SQL injection and XSS attacks through rigorous input validation.
- **HTTPS:** Encrypt data in transit using HTTPS.

## Scalability and Performance

- **Stateless Design:** Facilitates scaling by keeping the backend stateless.
- **Database Indexing:** Improve search speeds with database indexing on frequently queried fields.
- **Caching:** Reduce database load through effective caching of frequently accessed data.

## Testing

- **Unit Tests:** For testing individual components and functions.
- **Integration Tests:** To test interactions between different parts of the application, such as API endpoints and the database.
- **End-to-End Tests:** Simulate user interactions with the frontend to ensure the system operates as intended from the user's perspective.
