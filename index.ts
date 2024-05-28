#! /usr/bin/env node

import inquirer from "inquirer";

import chalk from "chalk";


// Initialize user balance and pin code.
let myBalance = 15000; // (In Dollars)
let myPin = 88661;

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
  console.log(chalk.cyan("PIN verified, Please choose an option to continue."));

  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      type: "list",
      message: chalk.grey("Please select options:"),
      choices: ["Withdraw Amount", "Check Balance"]
    }
  ]);

  if (operationAns.operation === "Withdraw Amount") {
    let withdrawAns = await inquirer.prompt([
      {
        name: "withdrawMethod",
        type: "list",
        message: chalk.yellow("Please select a withdrawal method:"),
        choices: ["Fast Cash", "Enter Amount"]
      }
    ]);
    if(withdrawAns.withdrawMethod === "Fast Cash"){
      let fastCashAns = await inquirer.prompt([
        {
          name: "fastcash",
          type: "list",
          message: chalk.green("Please enter the amount you wish to withdraw."),
          choices: [1000, 2000, 5000, 10000, 15000]
        }
      ]);
      // If fastCashAns is greater than myBalance;
      if(fastCashAns.fastcash > myBalance){
          console.log(chalk.red.bold("Unable to process. The amount exceeds your available balance.")); 
      }
      else{ 
        myBalance -= fastCashAns.fastcash // TotalBalance = TotalBalance - fastCashAns
        console.log(chalk.cyan(`You have withdrawn ${fastCashAns.fastcash}. Please collect your cash and receipt. Thank you for using our ATM.
        `));
        console.log(`Your remaining balance is $${chalk.green.bold(myBalance)}.`);
      }
    }
    else if(withdrawAns.withdrawMethod === "Enter Amount"){
      let amountAns = await inquirer.prompt([
        {
          name: "amount",
          type: "number",
          message: chalk.green("Please enter the amount you wish to withdraw.")
        }
      ]);
    // If amountAns is greater than myBalance;
      if (amountAns.amount > myBalance) {
        console.log(
          chalk.red("Unable to process. The amount exceeds your available balance."
        ));
      } else {
        myBalance -= amountAns.amount; // TotalBalance = TotalBalance - amountAns
        console.log(chalk.cyan(`You have withdrawn ${amountAns.amount}. Please collect your cash and receipt. Thank you for using our ATM.
        `));
        console.log(`Your remaining balance is $${chalk.green.bold(myBalance)}.`);
      }
    }
    
  } else if (operationAns.operation === "Check Balance") {
    console.log(`Balance check: Your available funds are $${chalk.blue.bold(myBalance)}.`);
  } 

 } else {
    console.log(chalk.red.bold("Incorrect PIN. Please enter your PIN carefully."));
  }

