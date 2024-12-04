// Get references to the HTML elements
const userInput = document.getElementById("temp-input");
const tempInput = document.getElementById("unit-temp");
const convertTempInput = document.getElementById("converted-temp");
const tempConverted = document.getElementById("temp-Converted");

// Conversion Functions
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function celsiusToKelvin(celsius) {
  return celsius + 273.15;
}

function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

function fahrenheitToKelvin(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9 + 273.15;
}

function kelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9) / 5 + 32;
}

// Update converted temperature based on user input and selections
function updateConvertedTemperature() {
  const inputTemp = parseFloat(inputUser.value);
  const inputUnit = tempInput.value;
  const outputUnit = convertTempInput.value;
  let convertedTemp;

  if (isNaN(inputTemp)) {
    tempConverted.value = "";
    return;
  }

  if (inputUnit === outputUnit) {
    tempConverted.value = inputTemp;
    return;
  }

  switch (inputUnit) {
    case "celsius":
      switch (outputUnit) {
        case "fahrenheit":
          convertedTemp = celsiusToFahrenheit(inputTemp);
          break;
        case "kelvin":
          convertedTemp = celsiusToKelvin(inputTemp);
          break;
      }
      break;
    case "fahrenheit":
      switch (outputUnit) {
        case "celsius":
          convertedTemp = fahrenheitToCelsius(inputTemp);
          break;
        case "kelvin":
          convertedTemp = fahrenheitToKelvin(inputTemp);
          break;
      }
      break;
    case "kelvin":
      switch (outputUnit) {
        case "celsius":
          convertedTemp = kelvinToCelsius(inputTemp);
          break;
        case "fahrenheit":
          convertedTemp = kelvinToFahrenheit(inputTemp);
          break;
      }
      break;
  }

  tempConverted.value = convertedTemp;
}

// Attach event listeners
inputUser.addEventListener("input", updateConvertedTemperature);
tempInput.addEventListener("change", updateConvertedTemperature);
convertTempInput.addEventListener("change", updateConvertedTemperature);
