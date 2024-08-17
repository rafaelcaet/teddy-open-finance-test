
# URL Shortener Project - (Teddy Open Finance Test)

## Overview
This project is a URL shortener application built with Fastify, TypeScript, and Prisma. It allows users to shorten URLs, manage their links, and perform user authentication.

## Author
- [@rafaelcaet](https://github.com/rafaelcaet)

## Features

- **User Registration and Management**
  - Create a user account.
  - Delete your account (requires authentication).
  - Retrieve user information by email (requires authentication).
  - Add, retrieve, update, and delete shortened URLs (requires authentication).

- **URL Management**
  - Add and manage shortened URLs linked to your user account.
  - Update and delete URLs as needed.

- **Authentication**
  - Login with email and password.
  - Secure routes using JWT authentication.

## Prerequisites
- **Docker**: Ensure Docker is installed and running on your machine.
- **Yarn or npm**: Choose one of these package managers to install dependencies.
- **Prisma**: This project uses Prisma as the ORM, so it will need to be initialized.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies:**
   - Using Yarn:
     ```bash
     yarn
     ```
   - Using npm:
     ```bash
     npm install
     ```

3. **Set up the environment:**
   - Configure your `.env` file with the necessary environment variables for your database and JWT secrets. `.env-example`
   - To connect to the database, just fill up the following variables on .env file:
          DATABASE_URL=

4. **Initialize Prisma:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start the application:**
   ```bash
   docker compose up
   ```

## Routes

### User Routes

- **POST `/user`**: Create a new user.
- **POST `/user/sendurl`**: Add a shortened URL.
    - We get the following object as a Response:

        ```json
        {
            "original": "https://github.com/rafaelcaet/teddy-open-finance-test",
            "shorted": "http://localhost:PORT/zCMX3S"
        }
        
        ```
- **DELETE `/user`**: Delete your user account (requires authentication).
- **GET `/user`**: Retrieve user details by email (requires authentication).
- **GET `/user/urls`**: Retrieve all your shortened URLs (requires authentication).
- **PUT `/user/updateUrl`**: Update a specific URL (requires authentication).

### Auth Routes

- **POST `/auth/login`**: Login to the application and receive a JWT.

## Contact
For any questions or feedback, please reach out to [fael.caetsantos@gmail.com.com](mailto:fael.caetsantos@gmail.com).
