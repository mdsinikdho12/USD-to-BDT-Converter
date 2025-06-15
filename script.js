// Example API: https://open.er-api.com/v6/latest/USD
// (No API key required, but subject to public limits. You can swap for another free API if needed.)

async function fetchUsdToBdtRate() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await res.json();
    if (data && data.result === 'success' && data.rates && data.rates.BDT) {
      return data.rates.BDT;
    } else {
      throw new Error("Failed to get rate");
    }
  } catch (e) {
    throw new Error("রেট পাওয়া যাচ্ছে না, পরে আবার চেষ্টা করুন।");
  }
}

async function convertCurrency() {
  const usdInput = parseFloat(document.getElementById("usdInput").value);
  const resultDiv = document.getElementById("result");
  const rateInfoDiv = document.getElementById("rateInfo");

  resultDiv.innerText = "";
  rateInfoDiv.innerText = "";

  if (isNaN(usdInput) || usdInput < 0) {
    resultDiv.innerText = "ভাই কিছুতো একটা দিন ?";
    return;
  }

  resultDiv.innerText = "রেট লোড হচ্ছে... দয়া করে অপেক্ষা করুন";
  try {
    const rate = await fetchUsdToBdtRate();
    const bdt = usdInput * rate;
    resultDiv.innerText = `${usdInput} USD = ${bdt.toLocaleString('en-BD', {maximumFractionDigits: 2})} BDT`;
    rateInfoDiv.innerText = `আজকের রেট: 1 USD = ${rate.toFixed(2)} BDT`;
  } catch (e) {
    resultDiv.innerText = e.message;
  }
}

document.getElementById("convertBtn").addEventListener('click', convertCurrency);
document.getElementById("usdInput").addEventListener('keydown', function(e) {
  if (e.key === 'Enter') convertCurrency();
});