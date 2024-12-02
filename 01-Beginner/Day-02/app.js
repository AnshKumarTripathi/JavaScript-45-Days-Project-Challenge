// Day 2: Basic Calculator in JavaScript

/*
 * Topic:
 * Today, I'll build a simple calculator that can perform basic arithmetic operations such as addition, subtraction, multiplication, and division.
 * This exercise will help me understand how to handle user inputs, perform calculations, and display results in JavaScript.
 */

// Function to add two numbers
// Hint: You can use the '+' operator to perform addition.
// function add(a, b) {
//     // Implement the addition logic here
//     // return a + b;
// }

// Function to subtract two numbers
// Hint: You can use the '-' operator to perform subtraction.
// function subtract(a, b) {
//     // Implement the subtraction logic here
//     // return a - b;
// }

// Function to multiply two numbers
// Hint: You can use the '*' operator to perform multiplication.
// function multiply(a, b) {
//     // Implement the multiplication logic here
//     // return a * b;
// }

// Function to divide two numbers
// Hint: You can use the '/' operator to perform division. Be careful with division by zero.
// function divide(a, b) {
//     // Implement the division logic here
//     // if (b !== 0) {
//     //    return a / b;
//     // } else {
//     //    return 'Cannot divide by zero';
//     // }
// }

// Test Cases
// Example 1: Adding 5 and 3 should return 8
// console.log(add(5, 3)); // Expected output: 8

// Example 2: Subtracting 5 from 3 should return -2
// console.log(subtract(3, 5)); // Expected output: -2

// Example 3: Multiplying 5 and 3 should return 15
// console.log(multiply(5, 3)); // Expected output: 15

// Example 4: Dividing 6 by 3 should return 2
// console.log(divide(6, 3)); // Expected output: 2

// Reference: To learn more about functions and arithmetic operations, visit the MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

const x = prompt("Enter Your First Number:");
const y = prompt("Enter Your Second Number:");

var firstNumber = parseInt(x);
var secondNumber = parseInt(y);

// Addition
function addNumbers(a, b) {
  const c = a + b;
  return c;
}

// Subtraction
function subtractNumber(a, b) {
  return a - b;
}

// Multiply
function multiplyNumbers(a, b) {
  return a * b;
}

// Division
function divideNumbers(a, b) {
  if (b == 0) {
    return "This is something a scientist are working on. So choose different numbers...";
  } else {
    return a / b;
  }
}

console.log(addNumbers(firstNumber, secondNumber));
console.log(subtractNumber(firstNumber, secondNumber));
console.log(multiplyNumbers(firstNumber, secondNumber));
console.log(divideNumbers(firstNumber, secondNumber));
