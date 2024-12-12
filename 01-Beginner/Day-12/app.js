document.addEventListener("DOMContentLoaded", () => {
  const amount = document.getElementById("amount");
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const convertButton = document.getElementById("convertButton");
  const result = document.getElementById("result");

  // Fixed exchange rates (just for demonstration purposes)
  const exchangeRates = {
    USD: { EUR: 0.85, GBP: 0.75, INR: 73.57, JPY: 110.57 },
    EUR: { USD: 1.18, GBP: 0.88, INR: 86.66, JPY: 130.15 },
    GBP: { USD: 1.33, EUR: 1.14, INR: 98.23, JPY: 147.67 },
    INR: { USD: 0.014, EUR: 0.012, GBP: 0.01, JPY: 1.5 },
    JPY: { USD: 0.009, EUR: 0.007, GBP: 0.006, INR: 0.67 },
  };

  const currencies = Object.keys(exchangeRates);

  // Populate the currency dropdown
  function populateCurrencyDropdown(dropdown) {
    for (const currency of currencies) {
      const option = document.createElement("option");
      option.value = currency;
      option.textContent = currency;
      dropdown.appendChild(option);
    }
  }

  populateCurrencyDropdown(fromCurrency);
  populateCurrencyDropdown(toCurrency);

  // Handle conversion
  convertButton.addEventListener("click", () => {
    const amountValue = parseFloat(amount.value);
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;

    if (isNaN(amountValue)) {
      result.textContent = "Please enter a valid amount";
      return;
    }

    const conversionRate = exchangeRates[fromCurrencyValue][toCurrencyValue];
    const conversionResult = (amountValue * conversionRate).toFixed(2);

    result.textContent = `${amountValue} ${fromCurrencyValue} = ${conversionResult} ${toCurrencyValue}`;
  });
});
