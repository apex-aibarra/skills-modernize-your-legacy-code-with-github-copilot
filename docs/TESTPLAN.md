# Test Plan for COBOL Account Management System

This test plan covers the business logic of the current COBOL application, which is an Account Management System. The system allows users to view account balance, credit (add) amounts to the account, debit (subtract) amounts from the account, and exit the application. The initial balance is set to 1000.00.

The test plan is designed to validate the functionality and will be used to create unit and integration tests in the Node.js transformation.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|-----------------------|----------------|------------|----------------|----------------|-------------------|-----------|
| TC001 | View initial account balance | Application is started and menu is displayed. Initial balance is 1000.00. | 1. Select option 1 (View Balance) from the menu. | Displays "Current balance: 001000.00" |  |  |  |
| TC002 | Credit account with a valid positive amount | Application is running. Current balance is 1000.00. | 1. Select option 2 (Credit Account).<br>2. Enter a positive amount, e.g., 50.00. | Prompts for amount, adds to balance, displays "Amount credited. New balance: 001050.00" |  |  |  |
| TC003 | Debit account with sufficient funds | Application is running. Current balance is 1050.00 (after TC002). | 1. Select option 3 (Debit Account).<br>2. Enter an amount less than or equal to current balance, e.g., 60.00. | Prompts for amount, subtracts from balance, displays "Amount debited. New balance: 000990.00" |  |  |  |
| TC004 | Attempt to debit account with insufficient funds | Application is running. Current balance is 990.00 (after TC003). | 1. Select option 3 (Debit Account).<br>2. Enter an amount greater than current balance, e.g., 2000.00. | Prompts for amount, displays "Insufficient funds for this debit." Balance remains unchanged. |  |  |  |
| TC005 | Select invalid menu option | Application is running. Menu is displayed. | 1. Enter an invalid choice, e.g., 5. | Displays "Invalid choice, please select 1-4." Menu redisplays. |  |  |  |
| TC006 | Exit the application | Application is running. Menu is displayed. | 1. Select option 4 (Exit). | Displays "Exiting the program. Goodbye!" and terminates. |  |  |  |
| TC007 | Multiple credit operations | Application is running. Current balance is 990.00. | 1. Select option 2 (Credit Account).<br>2. Enter 100.00.<br>3. Select option 2 again.<br>4. Enter 50.00. | First credit: New balance 1090.00<br>Second credit: New balance 1140.00 |  |  | Test accumulation of credits |
| TC008 | Multiple debit operations with sufficient funds | Application is running. Current balance is 1140.00. | 1. Select option 3 (Debit Account).<br>2. Enter 200.00.<br>3. Select option 3 again.<br>4. Enter 100.00. | First debit: New balance 0940.00<br>Second debit: New balance 0840.00 |  |  | Test accumulation of debits |
| TC009 | Debit exactly the current balance | Application is running. Current balance is 840.00. | 1. Select option 3 (Debit Account).<br>2. Enter 840.00. | Subtracts amount, displays "Amount debited. New balance: 000000.00" |  |  | Edge case: debit full balance |
| TC010 | View balance after multiple operations | Application is running. After TC009, balance is 0.00. | 1. Select option 1 (View Balance). | Displays "Current balance: 000000.00" |  |  | Verify balance persistence |

This test plan covers all main business logic paths: viewing balance, crediting, debiting with sufficient/insufficient funds, invalid inputs, and exiting. It includes edge cases like debiting the full balance and multiple operations to test data persistence.</content>
<parameter name="filePath">/workspaces/skills-modernize-your-legacy-code-with-github-copilot/docs/TESTPLAN.md