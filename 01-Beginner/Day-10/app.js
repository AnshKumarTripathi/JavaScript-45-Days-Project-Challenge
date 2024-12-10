// Calculation functions
function calculateTip(billAmount, tipPercentage) {
  return (tipPercentage * billAmount) / 100;
}

function calculateTotal(billAmount, tipAmount) {
  return billAmount + tipAmount;
}

// Event listener function
function calculate() {
  const billAmount = parseFloat(document.getElementById("billAmount").value);
  const tipPercentage = parseFloat(
    document.getElementById("tipPercentage").value
  );

  if (isNaN(billAmount) || isNaN(tipPercentage)) {
    alert("Please enter valid numbers for bill amount and tip percentage.");
    return;
  }

  const tipAmount = calculateTip(billAmount, tipPercentage);
  const totalAmount = calculateTotal(billAmount, tipAmount);

  document.getElementById(
    "tipAmount"
  ).innerText = `Tip Amount: $${tipAmount.toFixed(2)}`;
  document.getElementById(
    "totalAmount"
  ).innerText = `Total Amount: $${totalAmount.toFixed(2)}`;
}

// Attach event listener to the button
document.getElementById("calculateButton").addEventListener("click", calculate);
