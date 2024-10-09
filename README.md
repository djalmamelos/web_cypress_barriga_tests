# BarrigaTestCypress Automation Project 🧪

This repository contains automated test cases for the **Barriga** application using Cypress. The tests cover various functionalities of managing accounts, transactions, and balances in the application.

## Table of Contents 📚

- [Introduction](#introduction)
- [Features](#features)
- [Testing Approach](#testing-approach)
- [Test Scenarios Covered](#test-scenarios-covered)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Test Cases](#test-cases)
  - [1. Create Account](#1-create-account)
  - [2. Alter Account](#2-alter-account)
  - [3. Prevent Account Name Duplication](#3-prevent-account-name-duplication)
  - [4. Create Transaction](#4-create-transaction)
  - [5. Get Balance](#5-get-balance)
  - [6. Remove Transaction](#6-remove-transaction)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

The **BarrigaTestCypress** project automates critical functionalities of the Barriga application. These include creating, altering, and managing accounts, creating and removing transactions, and verifying balances. The goal of this project is to ensure that core business functionalities of the Barriga application work as expected by running automated tests.

### Testing Approach 🔍

Each test case in the **BarrigaTestCypress** project is executed three times for thorough validation:
  
1. **API Level**: 
   - Tests are performed directly on the backend using `backend-barrigatest.cy.js`. These tests validate the business logic and core functionalities of the API, ensuring the backend behaves as expected when performing operations like creating accounts and transactions.

2. **Frontend Level with Mocking**: 
   - The same scenarios are tested at the frontend level using `frontend-barrigatest.cy.js`. Here, we leverage `cy.intercept` to mock the API responses, allowing us to simulate how the frontend should behave without relying on the actual backend.
   
   This dual approach allows us to:
   - **Validate UI behavior**: Ensure that the application’s UI properly reflects changes in the backend, such as showing success or error messages.
   - **Compare Backend and Frontend**: By mocking responses, we can directly compare the visual behavior of the UI against the expected backend responses to ensure they align correctly.

The tests ensure that the backend logic (API level) and the frontend user experience (UI level) are functioning in harmony. If there’s any discrepancy between the two, it can be easily identified and resolved through this approach.

### Test Scenarios Covered

The automated tests cover the following scenarios:

- **Account Management**: Creating, altering, and ensuring the non-duplication of account names.
- **Transactions**: Creating and removing transactions, verifying their presence in the statements, and checking if balances are updated correctly.
- **Balance Validation**: Ensuring that the balance is updated properly after transactions are created or modified.

By running the tests on both the API and frontend levels and using `cy.intercept` to mock API calls for the frontend tests, we ensure that both the backend logic and user interface deliver consistent and accurate results.


## Features ✨

- 🏦 Account Management: Create, alter, and manage accounts.
- 💸 Transaction Management: Create, edit, and remove financial transactions.
- 📊 Balance Verification: Check and update account balances.
- 🔄 Reset Functionality: Reset the app before executing tests.

## Prerequisites ✅

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress) (follow the installation guide)

## Installation ⚙️

Follow these steps to set up and run the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/BarrigaTestCypress.git
    ```

2. Navigate into the project directory:
    ```bash
    cd BarrigaTestCypress
    ```

3. Install the necessary dependencies:
    ```bash
    npm install
    ```

4. Run Cypress:
    ```bash
    npx cypress open
    ```

## Usage 🚀

To run all tests in the Cypress Test Runner, follow these steps:

1. Open Cypress:
    ```bash
    npx cypress open
    ```

2. Select the test suite (e.g., `BarrigaTestCypress with Reset`) to execute the test cases.

## Test Cases 📝

### 1. Create Account
- **Scenario:** User should be able to create an account.
- **Assertions:** Verify if the account creation message is displayed.

### 2. Alter Account
- **Scenario:** User should be able to alter an account's details.
- **Assertions:** Confirm the account update success message.

### 3. Prevent Account Name Duplication
- **Scenario:** User should not be able to create an account with the same name.
- **Assertions:** Check if the application returns an error.

### 4. Create Transaction
- **Scenario:** User can create a financial transaction and validate the balance.
- **Assertions:** Check if the transaction appears in the statements and the balance is updated correctly.

### 5. Get Balance
- **Scenario:** Retrieve account balance after a transaction update.
- **Assertions:** Validate the balance before and after the transaction modification.

### 6. Remove Transaction
- **Scenario:** User should be able to remove a transaction.
- **Assertions:** Check if the transaction was successfully removed.

## Project Structure 📁

```plaintext
web_cypress_barriga_tests/
├── cypress/
│   ├── e2e/
│   │   ├── backend-barrigatest.cy.js
│   │   ├── frontend-barrigatest.cy.js
│   │   ├── functional-barrigatest.cy.js
│   └── support/
│       ├── AccountCommands.js
│       ├── buildEnv.js
│       ├── e2e.js
│       ├── locators.js
│       ├── commands.js
├── cypress.comfig.js
├── package.json
├── README.md
