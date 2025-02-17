# Vercel Serverless API

This project is a simple serverless API for managing rooms and events using Vercel. It allows clients to join and leave rooms, send events, and retrieve events and members associated with specific rooms.

## Project Structure

```
vercel-serverless-api
├── api
│   ├── join.js        # Handles joining a room
│   ├── leave.js       # Handles leaving a room
│   ├── event.js       # Handles sending an event to a room
│   ├── events.js      # Handles retrieving events for a room
│   └── members.js     # Handles retrieving members of a room
├── vercel.json        # Vercel configuration file
└── README.md          # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd vercel-serverless-api
   ```

2. **Install dependencies:**
   This project does not require any additional dependencies as it uses built-in Node.js features.

3. **Deploy to Vercel:**
   - Make sure you have the Vercel CLI installed. If not, you can install it using npm:
     ```
     npm install -g vercel
     ```
   - Run the following command to deploy:
     ```
     vercel
     ```

## Usage

### Join a Room

- **Endpoint:** `POST /api/join`
- **Request Body:**
  ```json
  {
    "room_id": "string",
    "client_id": "string"
  }
  ```
- **Response:**
  ```json
  {
    "members": ["client_id1", "client_id2", ...]
  }
  ```

### Leave a Room

- **Endpoint:** `POST /api/leave`
- **Request Body:**
  ```json
  {
    "room_id": "string",
    "client_id": "string"
  }
  ```
- **Response:**
  ```json
  {
    "members": ["client_id1", "client_id2", ...]
  }
  ```

### Send an Event to a Room

- **Endpoint:** `POST /api/event`
- **Request Body:**
  ```json
  {
    "room_id": "string",
    "message": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true
  }
  ```

### Get Events for a Room

- **Endpoint:** `GET /api/events`
- **Query Parameters:**
  - `room_id`: The ID of the room
- **Response:**
  ```json
  {
    "events": ["event1", "event2", ...]
  }
  ```

### Get Room Members

- **Endpoint:** `GET /api/members`
- **Query Parameters:**
  - `room_id`: The ID of the room
- **Response:**
  ```json
  {
    "members": ["client_id1", "client_id2", ...]
  }
  ```

## License

This project is licensed under the MIT License.