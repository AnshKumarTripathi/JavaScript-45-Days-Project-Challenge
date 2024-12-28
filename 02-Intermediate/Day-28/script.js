// app.js
const appID = "appID";
const url = `https://openexchangerates.org/api/latest.json?app_id=${appID}`;
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const rates = data.rates;
    const currencies = Object.keys(rates);
    currencies.forEach((currency) => {
      const optionFrom = document.createElement("option");
      optionFrom.value = currency;
      optionFrom.textContent = currency;
      fromCurrency.appendChild(optionFrom);

      const optionTo = document.createElement("option");
      optionTo.value = currency;
      optionTo.textContent = currency;
      toCurrency.appendChild(optionTo);
    });
  })
  .catch((error) => {
    console.log("Error", error);
  });

convertBtn.addEventListener("click", () => {
  const amountValue = amount.value;
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  if (
    amountValue === "" ||
    fromCurrencyValue === "" ||
    toCurrencyValue === ""
  ) {
    alert("Please fill out all fields.");
    return;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const rates = data.rates;
      const rate = rates[toCurrencyValue] / rates[fromCurrencyValue];
      const convertedAmount = amountValue * rate;
      result.textContent = `${amountValue} ${fromCurrencyValue} = ${convertedAmount.toFixed(
        2
      )} ${toCurrencyValue}`;
    })
    .catch((error) => {
      console.log("Error", error);
    });
});
