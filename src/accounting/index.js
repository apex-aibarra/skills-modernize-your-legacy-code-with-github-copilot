#!/usr/bin/env node

/**
 * Student Account Management System
 * 
 * Node.js modernization of legacy COBOL application
 * Preserves original business logic, data integrity, and menu options
 * 
 * Original COBOL Components:
 * - data.cob (DataProgram): Persistent storage layer
 * - operations.cob (Operations): Business logic layer
 * - main.cob (MainProgram): User interface and menu
 */

const prompt = require('prompt-sync')();

/**
 * DataProgram equivalent: Handles persistent data storage and retrieval
 * Manages the account balance state
 */
class DataProgram {
  constructor() {
    // Initial account balance - same as COBOL STORAGE-BALANCE VALUE 1000.00
    this.storageBalance = 1000.00;
  }

  /**
   * READ operation: Retrieves the current account balance from storage
   * @returns {number} Current balance
   */
  read() {
    return this.storageBalance;
  }

  /**
   * WRITE operation: Persists the account balance to storage
   * @param {number} newBalance - New balance to store
   */
  write(newBalance) {
    this.storageBalance = newBalance;
  }
}

/**
 * Operations equivalent: Implements the core business logic
 * Processes balance inquiries, credit transactions, and debit transactions
 */
class Operations {
  constructor(dataProgram) {
    this.dataProgram = dataProgram;
  }

  /**
   * TOTAL operation: Display the current account balance
   */
  total() {
    const currentBalance = this.dataProgram.read();
    console.log(`Current balance: ${currentBalance.toFixed(2)}`);
  }

  /**
   * CREDIT operation: Add a specified amount to the account balance
   * Business Rule: Students can add funds to their account in any amount
   */
  credit() {
    const amountStr = prompt('Enter credit amount: ');
    const amount = parseFloat(amountStr);

    if (isNaN(amount) || amount <= 0) {
      console.log('Invalid amount. Please enter a positive number.');
      return;
    }

    // Read current balance
    let finalBalance = this.dataProgram.read();

    // Add the credit amount to the balance
    finalBalance += amount;

    // Write updated balance to storage
    this.dataProgram.write(finalBalance);

    // Display the updated balance
    console.log(`Amount credited. New balance: ${finalBalance.toFixed(2)}`);
  }

  /**
   * DEBIT operation: Subtract a specified amount from the account balance
   * Business Rule: Students can only debit if sufficient balance exists
   * Business Rule: The system prevents overdrafts by validating debit amounts
   */
  debit() {
    const amountStr = prompt('Enter debit amount: ');
    const amount = parseFloat(amountStr);

    if (isNaN(amount) || amount <= 0) {
      console.log('Invalid amount. Please enter a positive number.');
      return;
    }

    // Read current balance
    let finalBalance = this.dataProgram.read();

    // Validate sufficient funds before debit
    if (finalBalance >= amount) {
      // Subtract amount from balance
      finalBalance -= amount;

      // Write updated balance to storage
      this.dataProgram.write(finalBalance);

      // Display the updated balance
      console.log(`Amount debited. New balance: ${finalBalance.toFixed(2)}`);
    } else {
      // Insufficient funds protection - prevent overdrafts
      console.log('Insufficient funds for this debit.');
    }
  }
}

/**
 * MainProgram equivalent: Entry point and user interface
 * Provides a menu-driven interface for system interaction
 */
class MainProgram {
  constructor(operations) {
    this.operations = operations;
    this.continueFlag = true;
  }

  /**
   * Display the main menu and return user choice
   * @returns {number} User menu selection (1-4)
   */
  displayMenu() {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
    
    const choiceStr = prompt('Enter your choice (1-4): ');
    return parseInt(choiceStr, 10);
  }

  /**
   * Route user choice to appropriate operation
   * @param {number} userChoice - User's menu selection
   */
  routeOperation(userChoice) {
    switch (userChoice) {
      case 1:
        // View Balance
        this.operations.total();
        break;
      case 2:
        // Credit Account
        this.operations.credit();
        break;
      case 3:
        // Debit Account
        this.operations.debit();
        break;
      case 4:
        // Exit
        this.continueFlag = false;
        break;
      default:
        // Invalid choice
        console.log('Invalid choice, please select 1-4.');
    }
  }

  /**
   * Main execution loop: Display menu and handle operations until exit
   * Mirrors the original COBOL PERFORM UNTIL loop
   */
  mainLogic() {
    while (this.continueFlag) {
      const userChoice = this.displayMenu();
      this.routeOperation(userChoice);

      if (this.continueFlag) {
        console.log(''); // Add spacing for readability
      }
    }

    console.log('Exiting the program. Goodbye!');
  }
}

/**
 * Application Entry Point
 * Initializes all components and starts the main program
 * 
 * Data Flow:
 * MainProgram -> Operations -> DataProgram
 * 
 * The architecture mirrors the original COBOL program structure:
 * - DataProgram: In-memory storage layer (original PIC 9(6)V99 field)
 * - Operations: Business logic (CREDIT, DEBIT, TOTAL operations)
 * - MainProgram: User interface (menu loop and operation routing)
 */
function main() {
  // Initialize the data storage layer
  const dataProgram = new DataProgram();

  // Initialize the operations layer with access to data layer
  const operations = new Operations(dataProgram);

  // Initialize the main program with access to operations layer
  const mainProgram = new MainProgram(operations);

  // Start the main execution loop
  mainProgram.mainLogic();
}

// Export classes for testing
module.exports = {
  DataProgram,
  Operations,
  MainProgram,
  main
};

// Run the application if this is the main module
if (require.main === module) {
  main();
}
