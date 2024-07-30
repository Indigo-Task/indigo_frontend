# Indigo Frontend
## Overview
The Flight Status Tracker frontend application provides a user-friendly interface for tracking real-time flight information. 

## Technologies Used
1. Vite: Fast and optimized build tool for modern web applications.
2. Axios: Promise-based HTTP client for making API requests.
3. Firebase: Platform for authentication, real-time database, and cloud functions.
4. Material-UI (MUI): React component library for building user interfaces with pre-designed components.
5. Toastify: Library for creating stylish toast notifications.
## Getting Started
### Prerequisites
Ensure you have the following installed:

1. Node.js (v14 or higher)
2. npm (comes with Node.js)

### Installation
1. Clone the Repository:
```
git clone https://github.com/Indigo-Task/indigo_frontend.git
```
2. Install Dependencies:
```
npm install
```
3. Configure Firebase:

Create a Firebase project and add your configuration to a .env file in the root directory. Example .env file:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the Development Server:

```
npm run dev
```
The application will be available at http://localhost:5173.
## Usage
1. Home Page: Displays flight search functionality and current flight statuses.
2. Search Flights: Use the search bar to find flights by number or route.
3. Notifications: Get real-time updates on flight statuses through Toastify notifications.
## API Integration
The frontend communicates with the backend API to fetch flight statuses and manage user subscriptions. Axios is used to make HTTP requests to the backend services.

## Firebase Integration
Firebase is used for user authentication and data management. Ensure your Firebase configuration is correctly set up in the .env file.

## Material-UI (MUI)
Material-UI components are used throughout the app for consistent and responsive design. 
## Toastify
Toastify is used for displaying notifications. The notifications inform users about flight status changes and other important updates.



