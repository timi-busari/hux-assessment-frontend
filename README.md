# Contact Management System Frontend

This is the frontend repository for Contact Management System, a web application that allows users to save and manage contact information. This project was created as part of the Hux Ventures Fullstack Developer Assessment.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)


## Features

- User authentication (Signup/Login)
- Create, read, update, and delete contacts
- Secure API calls to the backend

## Technologies Used

- React
- Next Js
- Tailwind CSS 

## Getting Started

### Prerequisites

- Node.js version >= v18.18.0

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/timi-busari/hux-assessment-frontend
   cd hux-assessment-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   BASE_URL=http://localhost:8080
   ```
   Replace the URL with your backend API URL.

## Running the Application

To start the development server:

```
npm start
```

The application will be available at `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## Testing

To run the tests:

```
npm test
```

## Deployment

To create a production build:

```
npm run build
```

This will create a `build` folder with production-ready files.
