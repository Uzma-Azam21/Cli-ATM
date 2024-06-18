#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Initialize user balance and pin code.
let myBalance = 15000; // (In Dollars)
let myPin = 88661;

async function atmOperations() {
  // Print welcome message when user enter their pin code.
  console.log(chalk.blue.bold("\n \tWelcome back! How can we assist you today?\n"));

  let pinAnswer = await inquirer.prompt([
    {
      name: "pin",
      type: "number",
      message: chalk.green("Please enter your PIN code to access your account.")
    }
  ]);

  if (pinAnswer.pin === myPin) {
    console.log(chalk.cyan("\nPIN verified, Please choose an option to continue."));

    let continueOperation = true;
    
    while (continueOperation) {
      let operationAns = await inquirer.prompt([
        {
          name: "operation",
          type: "list",
          message: chalk.grey("\nPlease select options:"),
          choices: ["Withdraw Amount", "Check Balance"]
        }
      ]);

      if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
          {
            name: "withdrawMethod",
            type: "list",
            message: chalk.yellow("\nPlease select a withdrawal method:"),
            choices: ["Fast Cash", "Enter Amount"]
          }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
          let fastCashAns = await inquirer.prompt([
            {
              name: "fastcash",
              type: "list",
              message: chalk.green("\nPlease enter the amount you wish to withdraw."),
              choices: [1000, 2000, 5000, 10000, 15000]
            }
          ]);

          // If fastCashAns is greater than myBalance;
          if (fastCashAns.fastcash > myBalance) {
            console.log(chalk.red.bold("\nUnable to process. The amount exceeds your available balance.\n"));
          } else {
            myBalance -= fastCashAns.fastcash; // TotalBalance = TotalBalance - fastCashAns
            console.log(chalk.cyan(`\nYou have withdrawn ${fastCashAns.fastcash}. Please collect your cash and receipt. Thank you for using our ATM.
            `));
            console.log(`Your remaining balance is $${chalk.green.bold(myBalance)}.`);
          }
        } else if (withdrawAns.withdrawMethod === "Enter Amount") {
          let amountAns = await inquirer.prompt([
            {
              name: "amount",
              type: "number",
              message: chalk.green("\nPlease enter the amount you wish to withdraw.")
            }
          ]);

          // If amountAns is greater than myBalance;
          if (amountAns.amount > myBalance) {
            console.log(
              chalk.red("\nUnable to process. The amount exceeds your available balance."
              ));
          } else {
            myBalance -= amountAns.amount; // TotalBalance = TotalBalance - amountAns
            console.log(chalk.cyan(`\nYou have withdrawn ${amountAns.amount}. Please collect your cash and receipt. Thank you for using our ATM.
            `));
            console.log(`Your remaining balance is $${chalk.green.bold(myBalance)}.`);
          }
        }

      } else if (operationAns.operation === "Check Balance") {
        console.log(chalk.bold(`\nBalance check: Your available funds are $${chalk.blue.bold(myBalance)}.`));
      }

      let continueAns = await inquirer.prompt([
        {
          name: "continue",
          type: "confirm",
          message: chalk.cyan.bold("\nDo you want to continue?")
        }
      ]);

      continueOperation = continueAns.continue;
    }

    console.log(chalk.yellow.bold("\nThank you for using our ATM. Have a great day!"));

  } else {
    console.log(chalk.red.bold("\nIncorrect PIN. Please enter your PIN carefully.\n"));
  }
}

atmOperations();
