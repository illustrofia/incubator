# Dome: Routing and User Flow Revision

## Public Routes

### Landing Page (`/`)

- **Description:** Introduces "Dome" and its features, with options to log in or sign up.
- **Actions:** Navigate to Login or Registration page.

### Login (`/login`)

- **Description:** Login page for users to enter credentials and access the Dome dashboard.
- **Actions:** Redirects to the Dashboard upon successful login.

### Registration (`/register`)

- **Description:** Registration form for new users to create an account.
- **Actions:** Redirects to the Dashboard after successful registration.

## Private Route (Authenticated Users Only)

### Tasks (`/tasks`)

- **Description:** The main interface for users, serving as the dashboard where users can manage their tasks. Task details and the option to add a new task are accessible from this page.
- **Actions:**
  - **View Tasks:** Display all tasks in a user-friendly interface.
  - **Task Details:** Clicking on a task opens a dialog with full details, allowing for editing or marking as complete.
  - **Create Task:** A button or similar UI element opens a dialog to create a new task.

## Additional Considerations

### Navigation Bar

- Available on all pages for authenticated users, with quick access to the Tasks page and Profile Settings.

### Logout

- Option available through the Navigation Bar for users to securely exit their account.

### 404 Page (`/404`)

- **Description:** Custom page for undefined routes, with an option to return to the Tasks page or Landing Page.

## User Flow Summary

1. **New Users:** Start at Landing Page → Navigate to Registration → Access Tasks page after signing up.
2. **Returning Users:** Start at Landing Page → Navigate to Login → Access Tasks page.
3. **Task Management:** The Tasks page allows users to manage all aspects of their tasks, including viewing, adding, and editing, through a unified interface.
4. **Profile Management:** Users can access and update their profile settings at any time from the Navigation Bar.
