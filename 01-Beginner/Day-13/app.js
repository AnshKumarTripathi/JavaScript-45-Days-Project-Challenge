// app.js

function calculateBMI() {
  // Get user input values
  const userWeight = parseFloat(document.getElementById("weight").value);
  const userHeight = parseFloat(document.getElementById("height").value);

  // Check for valid inputs
  if (
    isNaN(userWeight) ||
    isNaN(userHeight) ||
    userWeight <= 0 ||
    userHeight <= 0
  ) {
    document.getElementById("bmi-value").textContent =
      "Please enter valid weight and height!";
    document.getElementById("remarks").textContent = "";
    return;
  }

  // Calculate BMI
  const bmiValue = userWeight / (userHeight * userHeight);

  // Display BMI value
  document.getElementById(
    "bmi-value"
  ).textContent = `Your BMI is ${bmiValue.toFixed(2)}`;

  // Display remarks based on BMI value
  let remarks = "";
  if (bmiValue < 18.5) {
    remarks = "Underweight";
  } else if (bmiValue >= 30) {
    remarks = "Obesity";
  } else if (bmiValue >= 18.5 && bmiValue < 25) {
    remarks = "Normal Weight";
  } else {
    remarks = "Overweight";
  }

  document.getElementById("remarks").textContent = remarks;
}
