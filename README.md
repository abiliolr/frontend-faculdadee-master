# Frontend Faculdade

This project is a frontend application for a university management system, built with **Angular 20**. It allows students, professors, and administrators to interact with the system, managing academic information, courses, and registrations.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development Server](#development-server)
- [Building](#building)
- [Project Structure](#project-structure)
- [Documentation](#documentation)

## Features

- **Authentication**: Login and Registration for users.
- **Student Portal**: View grades, attendance, and exam schedules.
- **Admin Dashboard**:
  - Register Students
  - Register Professors
  - Register Courses
  - Register Disciplines
- **SSR Support**: Server-Side Rendering enabled using Angular Universal/Express.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 18.19.1 or higher (as per Angular 20 requirements).
- **npm**: Typically installed with Node.js.
- **Angular CLI**: Install globally using `npm install -g @angular/cli`.

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd frontend-faculdade
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

## Development Server

To start the local development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Building

To build the project for production:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

To build and run the SSR version:

```bash
npm run build
npm run serve:ssr:frontend-faculdade
```

## Project Structure

The project follows a standard Angular architecture:

-   `src/app/components`: Contains the UI components, organized by feature (admin, aluno, login, etc.).
-   `src/app/services`: Contains services for data access and business logic (e.g., `AuthService`).
-   `src/main.ts`: The main entry point for the client-side application.
-   `src/main.server.ts`: The entry point for the server-side application (SSR).
-   `src/server.ts`: Express server configuration for SSR.

## Documentation

The codebase is fully documented using JSDoc. You can inspect the source files to see detailed documentation for classes, methods, and properties.

### Key Components

*   **AppComponent**: The root component.
*   **AuthService**: Handles login and registration logic.
*   **AdminComponent**: The main layout for administrative tasks.
*   **AlunoComponent**: The student dashboard.
