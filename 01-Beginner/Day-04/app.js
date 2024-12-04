// Temperature Converter Project

// Theory:
// Temperature conversion involves converting a temperature reading from one unit (Celsius, Fahrenheit, or Kelvin) to another.
// The formulas for converting between these temperature units are as follows:
// 1. Celsius to Fahrenheit: (Celsius * 9/5) + 32
// 2. Fahrenheit to Celsius: (Fahrenheit - 32) * 5/9
// 3. Celsius to Kelvin: Celsius + 273.15
// 4. Kelvin to Celsius: Kelvin - 273.15
// 5. Fahrenheit to Kelvin: (Fahrenheit - 32) * 5/9 + 273.15
// 6. Kelvin to Fahrenheit: (Kelvin - 273.15) * 9/5 + 32

// Logic:
// 1. Define functions for each conversion formula.
//    - Function for Celsius to Fahrenheit
//    - Function for Fahrenheit to Celsius
//    - Function for Celsius to Kelvin
//    - Function for Kelvin to Celsius
//    - Function for Fahrenheit to Kelvin
//    - Function for Kelvin to Fahrenheit

// 2. Create a user interface to select the input temperature unit and the target temperature unit.
//    - Create input fields for the user to enter the temperature value.
//    - Create dropdown menus for the user to choose the input temperature unit (Celsius, Fahrenheit, Kelvin).
//    - Create dropdown menus for the user to choose the target temperature unit (Celsius, Fahrenheit, Kelvin).

// 3. Based on the user's input, call the appropriate conversion function.
//    - Use conditional statements (if-else) or switch-case to determine which conversion function to call.

// 4. Display the converted temperature value to the user.
//    - Output the converted temperature along with the target unit on the webpage.

// Example Conversion Functions:
// function celsiusToFahrenheit(celsius) {
//     return (celsius * 9/5) + 32;
// }

// function fahrenheitToCelsius(fahrenheit) {
//     return (fahrenheit - 32) * 5/9;
// }

// function celsiusToKelvin(celsius) {
//     return celsius + 273.15;
// }

// function kelvinToCelsius(kelvin) {
//     return kelvin - 273.15;
// }

// function fahrenheitToKelvin(fahrenheit) {
//     return (fahrenheit - 32) * 5/9 + 273.15;
// }

// function kelvinToFahrenheit(kelvin) {
//     return (kelvin - 273.15) * 9/5 + 32;
// }

// With these steps and functions, you can create a temperature converter tool in JavaScript to convert between Celsius, Fahrenheit, and Kelvin.

let inputUser = parseFloat(
  prompt("Enter the Temperature value you want to convert.")
);

let tempInput = prompt(
  "Enter the current unit of the temperature. \n Enter 1:celsius \n Enter 2:fahrenheit \n Enter 3:kelvin"
);
let convertTempInput = prompt(
  "Enter the converted unit of the temperature. \n Enter 1:celsius \n Enter 2:fahrenheit \n Enter 3:kelvin"
);

function celsiusToFahrenheit(celsius) {
  console.log("The conversion from celsius to fahrenheit is:");
  console.log((celsius * 9) / 5 + 32);
}

function fahrenheitToCelsius(fahrenheit) {
  console.log("The conversion from fahrenheit tp celsius is:");
  console.log(((fahrenheit - 32) * 5) / 9);
}

function celsiusToKelvin(celsius) {
  console.log("The conversion from celsius to kelvin is:");
  console.log(celsius + 273.15);
}

function kelvinToCelsius(kelvin) {
  console.log("The conversion from kelvin to celsius is:");
  console.log(kelvin - 273.15);
}

function fahrenheitToKelvin(fahrenheit) {
  console.log("The conversion from fahrenheit to kelvin is:");
  console.log(((fahrenheit - 32) * 5) / 9 + 273.15);
}

function kelvinToFahrenheit(kelvin) {
  console.log("The conversion from fahrenheit to kelvin is:");
  console.log(((kelvin - 273.15) * 9) / 5 + 32);
}

switch (tempInput) {
  case "1":
    switch (convertTempInput) {
      case "1":
        console.log("Bro stop choosing the same unit.");
        break;
      case "2":
        celsiusToFahrenheit(inputUser);
        break;
      case "3":
        celsiusToKelvin(inputUser);
        break;
      default:
        console.log("Chose valid number. :(");
        break;
    }
    break;

  case "2":
    switch (convertTempInput) {
      case "1":
        fahrenheitToCelsius(inputUser);
        break;
      case "2":
        console.log("Bro stop choosing the same unit.");
        break;
      case "3":
        fahrenheitToKelvin(inputUser);
        break;
      default:
        console.log("Chose valid number. :(");
        break;
    }
    break;

  case "3":
    switch (convertTempInput) {
      case "1":
        kelvinToCelsius(inputUser);
        break;
      case "2":
        kelvinToFahrenheit(inputUser);
        break;
      case "3":
        console.log("Bro stop choosing the same unit.");
        break;
      default:
        console.log("Chose valid number. :(");
        break;
    }
    break;

  default:
    console.log("Chose valid number. :(");
    break;
}

alert("Check the console to see the answer.");
