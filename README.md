# Request Management System

## Introduction

Welcome to the Request Management System, a full stack web application developed using Laravel 11 and React with TypeScript (tsx). This application allows users to manage service requests efficiently. Users can create, read, update, and delete requests through a simple and intuitive interface. Additionally, the application supports real-time updates and integrates authentication and authorization for secure access.


## Features

- **CRUD Operations:** Create, read, update, and delete requests.
- **Real-time Updates:** Automatic updates of request data in the table.
- **Authentication and Authorization:** Secure access to the application.
- **API Endpoints:** Well-defined endpoints for managing requests.
- **Validation and Error Handling:** Robust request validation and error management.
- **Responsive Design:** Usable on various devices with a responsive frontend.

## Included in the Project

- Full source code of the application.
- MySQL database dump.
- Postman collection with API tests.
- Demo video demonstrating the application’s features and functionalities.

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your machine:

- PHP 8.1 or higher
- Composer
- Node.js and npm
- MySQL

### Cloning the Repository

1. Clone the repository to your local machine:
    ```sh
    git clone https://github.com/lankeshhalangoda/Parallax-Request-Management-System.git
    cd request-management-system
    ```

### Backend Setup

1. Install PHP dependencies:
    ```sh
    composer install
    ```

2. Create a copy of the `.env.example` file and rename it to `.env`:
    ```sh
    cp .env.example .env
    ```

3. Update the `.env` file with your database configuration:
    ```sh
    DB_DATABASE=request_management
    DB_USERNAME=root
    DB_PASSWORD=your_password
    ```

4. Generate an application key:
    ```sh
    php artisan key:generate
    ```

5. Run database migrations and seeders:
    ```sh
    php artisan migrate --seed
    ```

### Frontend Setup

1. Install Node.js dependencies:
    ```sh
    npm install
    ```

2. Build the frontend assets:
    ```sh
    npm run dev
    ```

### Running the Application

1. Start the Laravel development server:
    ```sh
    php artisan serve
    ```

2. Open your browser and navigate to `http://localhost:8000`.

## Testing the API

1. Import the provided Postman collection into Postman.
2. Run the collection to test the API endpoints.

## Additional Information

- **Demo Video:** [Link to demo video](#)
- **Database Dump:** Included in the `database` directory.
- **Postman Collection:** Included in the `postman` directory.

## Contributing

If you wish to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

