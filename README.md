# Budget and Transaction Management API

## Overview

This API provides endpoints for managing transactions, categories, and budgets. It supports operations like adding, updating, and deleting transactions, managing categories, generating reports, and tracking budget status.

## Endpoints

### **1. Add Transaction**

- **Endpoint**: `POST /transactions`
- **Description**: Adds a new transaction. If a category or subcategory does not exist, it is created.
- **Request Body**:
  ```json
  {
    "type": "income/expense",
    "amount": number,
    "account": string,
    "category": string,
    "subcategory": string,
    "budget_id": string
  }
  ```
- **Response**: The newly created transaction.

---

### **2. Update Transaction**

- **Endpoint**: `PUT /transactions/:id`
- **Description**: Updates an existing transaction by ID.
- **Request Body**:
  ```json
  {
    "type": "income/expense",
    "amount": number,
    "account": string,
    "category": string,
    "subcategory": string,
    "budget_id": string
  }
  ```
- **Response**: The updated transaction.

---

### **3. Delete Transaction**

- **Endpoint**: `DELETE /transactions/:id`
- **Description**: Deletes a transaction by ID.
- **Response**: Success or failure message.

---

### **4. Get Transactions**

- **Endpoint**: `GET /transactions`
- **Description**: Retrieves all transactions, supports filtering by query parameters.
- **Response**: List of transactions.

---

### **5. Generate Report**

- **Endpoint**: `GET /transactions/report`
- **Description**: Generates a report for transactions within a specific date range.
- **Query Parameters**:
  - `startDate`: Start date (ISO 8601 format).
  - `endDate`: End date (ISO 8601 format).
- **Response**: List of transactions within the date range.

---

### **6. Set Budget**

- **Endpoint**: `POST /budgets`
- **Description**: Creates a new budget with a specified limit.
- **Request Body**:
  ```json
  {
    "name": "string",
    "limit": number
  }
  ```
- **Response**: The newly created budget.

---

### **7. Get Budget Status**

- **Endpoint**: `GET /budgets/status`
- **Description**: Retrieves the current status of a budget, including total spent and whether the limit has been exceeded.
- **Request Body**:
  ```json
  {
    "id": "string"
  }
  ```
- **Response**: Budget status, including whether the budget has been exceeded.

---

### **8. Summary Data**

- **Endpoint**: `GET /transactions/summary`
- **Description**: Retrieves a summary of transactions, grouped by category, account, or other criteria.
- **Query Parameters**:
  - `groupBy`: Field to group by (default: `category`).
  - `filterKey`: Optional filter key.
  - `filterValue`: Optional filter value.
- **Response**: Aggregated transaction data.

---

### **9. Create Category**

- **Endpoint**: `POST /categories`
- **Description**: Creates a new category.
- **Request Body**:
  ```json
  {
    "name": "string",
    "parentId": "string (optional)"
  }
  ```
- **Response**: The newly created category.

---

### **10. Update Category**

- **Endpoint**: `PUT /categories/:id`
- **Description**: Updates an existing category by ID.
- **Request Body**:
  ```json
  {
    "name": "string",
    "parentId": "string (optional)"
  }
  ```
- **Response**: The updated category.

---

### **11. Delete Category**

- **Endpoint**: `DELETE /categories/:id`
- **Description**: Deletes a category by ID.
- **Response**: Success or failure message.

---

## Error Handling

- **Status Code 500**: For unexpected errors.
- **Status Code 404**: When a resource (e.g., transaction, category) is not found.

## Notes

- Ensure proper references are maintained when adding or updating transactions related to categories.
- Budget tracking for expenses ensures that the total spent does not exceed the set limit.
