# GraphQL API Endpoints

## Required For MVP

### Loan Products

- **Queries**
  - `loanProducts`: Fetch all loan products
  - `loanProduct(productId: ID!)`: Fetch a specific loan product by ID
- **Mutations**
  - `createLoanProduct(input: LoanProductInput!)`: Create a new loan product
  - `updateLoanProduct(productId: ID!, input: LoanProductInput!)`: Update an existing loan product
  - `deleteLoanProduct(productId: ID!)`: Delete a loan product

### Assets

- **Queries**
  - `assets`: Fetch all assets
  - `asset(assetId: ID!)`: Fetch a specific asset by ID

### Creditors

- **Queries**
  - `creditors`: Fetch all creditors
  - `creditor(creditorId: ID!)`: Fetch a specific creditor by ID

## Nice To Have

### Loan Applications

- **Queries**
  - `loanApplications`: Fetch all loan applications
  - `loanApplication(applicationId: ID!)`: Fetch a specific loan application by ID

### Credit Products

- **Queries**
  - `creditProducts`: Fetch all credit products
  - `creditProduct(productId: ID!)`: Fetch a specific credit product by ID
- **Mutations**
  - `createCreditProduct(input: CreditProductInput!)`: Create a new credit product
  - `updateCreditProduct(productId: ID!, input: CreditProductInput!)`: Update an existing credit product
  - `deleteCreditProduct(productId: ID!)`: Delete a credit product

### Non-Credit Products

- **Queries**
  - `nonCreditProducts`: Fetch all non-credit products
  - `nonCreditProduct(productId: ID!)`: Fetch a specific non-credit product by ID
- **Mutations**
  - `createNonCreditProduct(input: NonCreditProductInput!)`: Create a new non-credit product
  - `updateNonCreditProduct(productId: ID!, input: NonCreditProductInput!)`: Update an existing non-credit product
  - `deleteNonCreditProduct(productId: ID!)`: Delete a non-credit product
