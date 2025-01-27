# My API Documentation

Welcome to the API documentation for My App! This document will guide you through the available endpoints and provide examples for interacting with the API. If you'd like to explore the API in an interactive format, you can access the Swagger UI at the URL below:

**Swagger UI**: [https://your-api-url.com/swagger](https://your-api-url.com/swagger)

---

## API Endpoints

### /api/v1/transactions

- **POST**: Add a new transaction

  - Request Body:
    - `name` (string): Name of the transaction (e.g., "Lunch", "Salary")
    - `user_id` (string): The user associated with the transaction
    - `type` (string): Type of the transaction ("expense" or "money in")
    - `amount` (number): Amount of the transaction
    - `account` (string): Type of account (bank or mobile money)
    - `category` (string): Category of the transaction
  - Response:
    - **201**: Transaction added successfully

- **GET**: Get a list of transactions
  - Response:
    - **200**: List of transactions

---

### /api/v1/transactions/update/{id}

- **POST**: Update a transaction by ID
  - Parameters:
    - `id` (string): ID of the transaction to be updated
  - Response:
    - **200**: Transaction updated successfully

---

### /api/v1/transactions/delete/{id}

- **POST**: Delete a transaction by ID
  - Parameters:
    - `id` (string): ID of the transaction to be deleted
  - Response:
    - **200**: Transaction deleted successfully

---

### /api/v1/transactions/report

- **GET**: Generate a transaction report
  - Response:
    - **200**: Transaction report generated

---

### /api/v1/budget

- **POST**: Set a budget

  - Request Body:
    - `name` (string): Name of the budget (e.g., "Monthly Budget", "Vacation Fund")
    - `user_id` (string): The user associated with the budget
    - `limit` (number): Spending limit for the budget
  - Response:
    - **201**: Budget set successfully

- **GET**: List all budgets
  - Response:
    - **200**: List of budgets

---

### /api/v1/budget/status

- **GET**: Get current budget status
  - Response:
    - **200**: Current budget status

---

### /api/v1/transactions/summary

- **GET**: Get transaction summary
  - Response:
    - **200**: Summary data

---

### /api/v1/categories

- **GET**: List all categories

  - Response:
    - **200**: List of categories

- **POST**: Create a new category
  - Request Body:
    - `name` (string): Name of the category (e.g., "Groceries", "Entertainment")
    - `user_id` (string): The user associated with the category
  - Response:
    - **201**: Category created successfully

---

### /api/v1/categories/delete/{id}

- **POST**: Delete a category by ID
  - Parameters:
    - `id` (string): ID of the category to be deleted
  - Response:
    - **200**: Category deleted successfully

---

### /api/v1/register

- **POST**: Register a new user
  - Request Body:
    - `name` (string): The user's name
    - `email` (string): The user's email
    - `password` (string): The user's password (hashed before saving)
  - Response:
    - **201**: User registered successfully

---

### /api/v1/login

- **POST**: User login
  - Request Body:
    - `email` (string): The user's email
    - `password` (string): The user's password
  - Response:
    - **200**: Login successful
    - **Response Body**: `token`: JWT Token for authentication

---

### /api/v1/me

- **GET**: Get current logged-in user's information
  - Response:
    - **200**: User information

---

### /api/v1/logout

- **GET**: Log out the current user
  - Response:
    - **200**: User logged out successfully

---

### /api/v1/update

- **PUT**: Update user information
  - Request Body:
    - `name` (string): Updated name of the user
    - `email` (string): Updated email of the user
  - Response:
    - **200**: User information updated successfully

---

### /api/v1/password/update

- **PUT**: Update user password
  - Request Body:
    - `password` (string): Updated password (hashed before saving)
  - Response:
    - **200**: Password updated successfully

---

## Schema Definitions

### Transaction

- `name`: The name of the transaction
- `user_id`: The unique identifier for the user associated with the transaction
- `type`: The type of transaction ("expense" or "money in")
- `amount`: The amount of money involved in the transaction
- `account`: Type of account ("bank" or "mobile money")
- `category`: The category associated with the transaction
- `subcategory`: Optional subcategory reference
- `date`: The date when the transaction was created

### Budget

- `name`: The name of the budget
- `user_id`: The unique identifier of the user associated with the budget
- `limit`: The spending limit for the budget
- `totalSpent`: The amount spent so far from the budget

### Category

- `name`: The name of the category
- `user_id`: The unique identifier of the user who owns the category
- `parentId`: The optional parent category to form a hierarchical structure

### User

- `name`: The name of the user
- `email`: The email of the user
- `password`: The user's password
- `phoneNumber`: The user's phone number (optional)
- `createdAt`: The creation time of the user
- `resetPasswordToken`: Optional token for password reset
- `resetPasswordTime`: Time when the reset password token was generated

---

### Note
https://challenge-1-1bom.onrender.com

You can access the interactive API documentation via **Swagger UI** at:  
[https://challenge-1-1bom.onrender.com](https://challenge-1-1bom.onrender.com)

Feel free to explore the API with the help of the above documentation!
