# DevTools Hub Backend

This is the backend server for the DevTools Hub application, providing API endpoints for JSON formatting, code snippets, and user authentication.

## Features

- User authentication (register, login, profile)
- JSON formatting and conversion (to YAML, TypeScript)
- Code snippet management
- MongoDB database integration
- JWT authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Installation

1. Clone the repository
2. Navigate to the server directory
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/devtools-hub
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## Running the Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/settings` - Update user settings

### JSON Formatter

- `POST /api/json/format` - Format JSON with options
- `POST /api/json/to-yaml` - Convert JSON to YAML
- `POST /api/json/to-typescript` - Convert JSON to TypeScript interface
- `GET /api/json` - Get all JSON data for the current user
- `GET /api/json/:id` - Get a specific JSON data
- `POST /api/json` - Create new JSON data
- `PUT /api/json/:id` - Update JSON data
- `DELETE /api/json/:id` - Delete JSON data

### Code Snippets

- `GET /api/snippets` - Get all snippets for the current user
- `GET /api/snippets/search` - Search snippets
- `GET /api/snippets/:id` - Get a specific snippet
- `POST /api/snippets` - Create new snippet
- `PUT /api/snippets/:id` - Update snippet
- `DELETE /api/snippets/:id` - Delete snippet

## Connecting to Frontend

The backend is designed to work with the DevTools Hub frontend. To connect them:

1. Update the frontend API base URL to point to this backend
2. Ensure CORS is properly configured (already set up in the server)
3. Use the JWT token from login/register for authenticated requests