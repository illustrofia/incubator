# Dome: Routing and User Flow Revision

## Public Routes

### Login (`/login`)

- **Description:** Login page for users to enter credentials and access the Dome dashboard.
- **Actions:** Redirects to the Dashboard upon successful login.

### Registration (`/signup`)

- **Description:** Registration form for new users to create an account.
- **Actions:** Redirects to the Dashboard after successful registration.

## Private Route (Authenticated Users Only)

### Todos Page (`/`)

- **Description:** The page containing the user todos. If the user is not logged in, they will be redirected to the login page.
- **Actions:** If logged in, the user can:
  - **View Todos:** Display all todos in a user-friendly interface.
  - **Create Todo:** A simple form to add a new todo.
  - **Toggle Todo Status:** A checkbox or similar UI element to mark a todo as complete.
  - **Delete Todo:** A button or similar UI element to delete a todo.

## Additional Considerations

### Navigation Bar

- Available on all pages for authenticated users, with quick access to to log out.

### Logout

- Option available through the Navigation Bar for users to securely exit their account.

## User Flow Summary

1. **New Users:** Start at Todos page → Redirected to Login → Click on _Sign Up_ link → Fill in details → Redirect to Todos page after successful registration.
2. **Returning Users:** Open Todos page. If session expired → Navigate to Login → Redirect to access Todos page.
3. **Todos Management:** The Todos page allows users to manage all aspects of their tasks, including viewing, adding, and editing, through a unified interface.
