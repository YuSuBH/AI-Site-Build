# AI Site Build

AI Site Build is a powerful tool designed to streamline the process of creating and managing AI-powered websites.

## Project Structure

The project is split into two main parts:

- **client**: The frontend application built with React, Vite, and Tailwind CSS.
- **sever**: The backend API built with Express, Prisma, and OpenAI integration.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A PostgreSQL database (for the backend)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YuSuBH/AI-Site-Build.git
   cd AI-Site-Build
   ```

2. **Setup the Backend (sever):**
   ```bash
   cd sever
   npm install
   ```
   - Create a `.env` file based on the provided configuration (ensure you have your database URL and OpenAI API key).
   - Run Prisma migrations:
     ```bash
     npx prisma db push
     ```

3. **Setup the Frontend (client):**
   ```bash
   cd ../client
   npm install
   ```
   - Create a `.env` file if necessary for frontend configurations.

## Running the Application

### Start the Backend
From the `sever` directory:
```bash
npm run server
```

### Start the Frontend
From the `client` directory:
```bash
npm run dev
```

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Lucide React, Axios, Better Auth.
- **Backend**: Node.js, Express, Prisma, PostgreSQL, OpenAI API, Better Auth.

## License

This project is licensed under the ISC License.
