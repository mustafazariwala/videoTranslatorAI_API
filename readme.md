# Node.js Express RESTful API

This is a RESTful API built with Node.js and Express. It uses PostgreSQL for database persistence and Multer for file handling. The API features user authentication using bcrypt for password hashing and JSON Web Tokens (JWT) for generating and verifying authentication tokens.

## Features
- User Authentication: Secure user login with password hashing and token-based authentication.
- Video Management: Fetch and upload videos.
- File Storage: Efficiently handle file uploads using Multer.
- Middleware: Authentication middleware to protect routes.

## Technologies Used
- Backend: Node.js, Express
- Database: PostgreSQL
- Authentication: bcrypt, JWT
- File Upload: Multer
- Other: dotenv, Pg

## Getting Started

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Create a `.env` file and add the necessary environment variables.
4. Start the server using `npm start`.

## Project Structure
```
.
├── routes/
│   ├── index.js           # Main router file
│   └── users.js           # User routes
│   └── videos.js          # Video routes
├── controllers/
│   └── users.js           # Controller for user routes
│   └── videos.js          # Controller for video routes
├── middleware/
│   └── authMiddleware.js  # Token Auth for protected routes
├── middleware/
│   └── videoUpload.js     # Video upload multer initialization
│   └── databasepg.js      # Database initialization
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
└── server.js              # Main server file
```

## Environment Variables

The following environment variables are used in this project:

- `PORT`: The port number on which the server will run. Default value is 3000.
- `POSTGRES_HOST`: Postgres hostname 
- `POSTGRES_USER`: Postgres Username 
- `POSTGRES_PORT`: Postgres Port 
- `POSTGRES_PASSWORD`: Postgres Password 
- `POSTGRES_DATABASE`: Postgres Database Name 

## API Routes

- `/api`: Root route for the API.
- `/api/users`: Route for user-related operations.

## API Endpoints

### User Routes

- POST /users/login: User login
  - Request Body
  ```
  {
  "email": "user@example.com",
  "password": "password123"
  }
  ```
  - Response
  ```
  {
    "token": 'JWT token'
      user: {
      "email": "user@example.com",
      "password": "password123"
    }
  }
  ```

### Video Routes

- POST /videos: Upload Video
  - Request Body
  ```
  {
    "filename": "Test Filename"
    "file": FILE
  }
  ```
  - Response
  ```
  {
    "message": "File uploaded and Saved successfully"
  }
  ```

- GET /videos: Upload Video
  - Authorization Header required in request
  - Response
  ```
    [
      {
        "id": 1,
        "filename": "Video Title",
        "filepath": "uploads/video.mp4"
      }
    ]
  ```
## Controllers

The controllers for handling user-related requests can be found in the `controllers/users.js` file.

The controllers for handling videos-related requests can be found in the `controllers/videos.js` file.


## Postgres Data Sample

- Users table

| email           | password | user_id |   |   |
|-----------------|----------|---------|---|---|
| test@gmail.com  | 12345    | 1       |   |   |
| test1@gmail.com | 123456   | 2       |   |   |
|                 |          |         |   |   |

- Video table

| filename    | filepath                                       | user_id | video_id |   |
|-------------|------------------------------------------------|---------|----------|---|
| Test Bunny  | uploads\Test Bunny-1717930498131-890540035.mp4 | 1       | 1        |   |
| Hello World | uploads\Test-1717931715000-293614911.mp4       | 2       | 1        |   |
|             |                                                |         |          |   |

## Contributing

Contributions are welcome!
