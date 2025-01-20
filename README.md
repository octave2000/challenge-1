
# Budget App

This is a simple budget management app built with **Express.js**, **MongoDB**, and **TypeScript**. It allows users to track their transactions, manage their budget limits, and generate reports. The app also provides endpoints for querying transaction data and checking if the budget has been exceeded.

## Features

- **Add Transactions**: Allows users to add transactions of type `income` or `expense`.
- **Get Transactions**: Retrieve all transactions or filter by account.
- **Generate Report by Time Range**: Get transactions within a specific time range.
- **Set Budget**: Set or update a budget limit.
- **Get Budget Status**: Check if the total spent has exceeded the budget limit.
- **Transaction Summary**: Get a summary of transactions grouped by category and subcategory for visualization.

## Technologies Used

- **Node.js** with **Express.js**: Server-side framework to handle HTTP requests and routing.
- **MongoDB** with **Mongoose**: Database for storing transactions and budget data.
- **TypeScript**: Static type checking for better code quality and developer experience.

## Project Structure

```plaintext
budget-app/
├── src/
│   ├── config/
│   │   └── db.ts          # Database connection setup
│   ├── models/
│   │   └── Budget.ts      # Budget model
│   │   └── Transaction.ts # Transaction model
│   ├── routes/
│   │   └── transactions.ts # API routes for transactions and budget
│   ├── controllers/
│   │   └── transactionController.ts # Controllers handling API logic
│   ├── index.ts           # Main server setup
│   └── types/
│       └── transaction.d.ts # Type definitions for transactions
├── .env                   # Environment variables
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies and scripts
```

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/budget-app.git
   cd budget-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the root of the project with the following content:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. Run the app:

   ```bash
   npm start
   ```

   The app will start running on `http://localhost:3000`.

## API Endpoints

### 1. Add Transaction

- **URL**: `/api/transactions`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "type": "income | expense",
    "amount": 100,
    "account": "checking",
    "category": "food",
    "subcategory": "dining"
  }
  ```
- **Response**: 
  - `201`: Transaction added successfully.
  - `500`: Internal Server Error.

### 2. Get Transactions

- **URL**: `/api/transactions`
- **Method**: `GET`
- **Query Params**:
  - `account` (optional): Filter transactions by account.
- **Response**:
  - `200`: List of transactions.
  - `500`: Internal Server Error.

### 3. Generate Report by Time Range

- **URL**: `/api/transactions/report`
- **Method**: `GET`
- **Query Params**:
  - `startDate`: Start date of the report (ISO string).
  - `endDate`: End date of the report (ISO string).
- **Response**:
  - `200`: List of transactions in the specified date range.
  - `500`: Internal Server Error.

### 4. Set Budget

- **URL**: `/api/budget`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "limit": 500
  }
  ```
- **Response**: 
  - `201`: Budget set successfully.
  - `500`: Internal Server Error.

### 5. Get Budget Status

- **URL**: `/api/budget/status`
- **Method**: `GET`
- **Response**:
  - `200`: Budget status (limit, total spent, and exceeded status).
  - `404`: Budget not set.
  - `500`: Internal Server Error.

### 6. Transaction Summary for Visualization

- **URL**: `/api/transactions/summary`
- **Method**: `GET`
- **Response**:
  - `200`: Summary of transactions grouped by category and subcategory.
  - `500`: Internal Server Error.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make changes, and submit a pull request. Ensure that your code adheres to the following guidelines:

- Follow TypeScript best practices.
- Add tests for any new features or fixes.
- Ensure that all existing tests pass.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
