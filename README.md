# JWT-project

## Overview
This project is a full-stack web application for user role management with secure authentication using JSON Web Tokens (JWT). It consists of a React frontend and Node.js/Express backend, providing a robust system for managing user roles and permissions.

## Features
- User authentication using JWT
- Role-based access control
- Secure password handling with bcrypt
- MySQL database integration with Sequelize ORM
- Responsive UI built with React and Bootstrap
- Protected routes and API endpoints

## Tech Stack

### Frontend
- React 17.x
- React Router DOM for navigation
- React Bootstrap for UI components
- Axios for API requests
- FontAwesome icons
- React Toastify for notifications
- SASS for styling

### Backend
- Node.js with Express
- MySQL database
- Sequelize ORM
- JWT for authentication
- bcryptjs for password hashing
- Body-parser for request parsing
- CORS enabled
- nodemon for development

## Prerequisites
- Node.js (v12 or higher)
- MySQL Server
- npm or yarn package manager

The application will be available at `http://localhost:3000`

## Project Structure

```
├── FE/           # Frontend React application
│   ├── src/
│   ├── public/
│   └── package.json
│
└── BE/        # Backend Node.js application
    ├── src/
    ├── .env
    └── package.json
```

## Authentication Flow

1. User registers or logs in
2. Server validates credentials and issues JWT
3. JWT is stored in cookies
4. Subsequent requests include JWT in Authorization header
5. Protected routes/resources verify JWT before granting access

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
ISC License - See LICENSE file for details

## Author
Bảo Duy (git: vitmetmoi)

## Acknowledgments
- React team for the amazing frontend library
- Node.js community for the robust backend ecosystem
- All contributors and package maintainers used in this project

