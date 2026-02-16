const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swap");

const apiKey = "https://v6.exchangerate-api.com/v6/8161ea633695bed1976869a7/latest/USD";

// Common currencies
const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"];

function populateCurrencies() {
    currencies.forEach(currency => {
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");

        option1.value = option2.value = currency;
        option1.text = option2.text = currency;

        fromCurrency.add(option1);
        toCurrency.add(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";
}

async function convertCurrency() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    try {
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`
        );
        const data = await response.json();

        const rate = data.conversion_rates[to];
        const converted = (amount * rate).toFixed(2);

        result.innerText = `${amount} ${from} = ${converted} ${to}`;
    } catch (error) {
        result.innerText = "Error fetching data!";
    }
}

swapBtn.addEventListener("click", () => {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
});

convertBtn.addEventListener("click", convertCurrency);

populateCurrencies();
