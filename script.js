function convertCurrency(rate = 121.41) {
    const usdInput = parseFloat(document.getElementById("usdInput").value);
    const resultDiv = document.getElementById("result");

    if (isNaN(usdInput) || usdInput < 0) {
        resultDiv.innerText = "ভাই কিছুতো একটা দিন ? ";
        return;
    }

    const bdt = usdInput * rate;
    resultDiv.innerText = `${usdInput} USD = ${bdt.toFixed(2)} BDT`;

    return bdt;
}
