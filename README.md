# SlidelyAItask-2_Backend-Server

# Backend Server

This is a backend server built with Express and TypeScript. It uses a JSON file as a database to store submissions.

## Endpoints

### /ping
- Method: GET
- Description: Returns true to indicate the server is running.

### /submit
- Method: POST
- Description: Submits a new form entry.
- Parameters: `name`, `email`, `phone`, `github_link`, `stopwatch_time`

### /read
- Method: GET
- Description: Reads a specific form entry by index.
- Query Parameter: `index` (0-indexed)

### /delete
- Method: DELETE
- Description: Deletes a form entry by index.
- URL Parameter: `index` (0-indexed)

### /edit
- Method: PUT
- Description: Edits a form entry by index.
- URL Parameter: `index` (0-indexed)
- Parameters: `name`, `email`, `phone`, `github_link`, `stopwatch_time`

## Running the Server

1. Install dependencies:
   ```bash
   npm install

2. Run the server:
   ```bash
   npx ts-node src/server.ts

