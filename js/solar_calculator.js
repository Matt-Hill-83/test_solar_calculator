// Monkey patch in new function on String.prototype to format currency numbers
String.prototype.insertComma = function() {
  if (this.length >= 4) {
    return (this.slice(0,-3) + "," + this.slice(-3 + Math.abs(0)));
  }
};

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Expense', 'Per Month'],
    ['Principal & Interest',     2912],
    ['Property Taxes',      785],
    ['Insurance',  283]
  ]);

  var options = {
    pieHole: 0.6,
    'legend':'none',
    backgroundColor: 'transparent',
    pieSliceTextStyle: {
    color: 'transparent',
    },
  };

function getValuesFromSliders(){
  this.homePrice = document.getElementById("home-price-slider").value;
  this.downPayment = document.getElementById("down-payment-slider").value;
  this.interestRate = Number(document.getElementById("interest-rate-slider").value);
}

function updateNumericResults() {
    // Set result field next to slider to slider value
    var homePriceResultEl = document.getElementById("home-price-result");
    homePriceResultEl.innerHTML = this.homePrice.insertComma();

    var downPaymentResultEl = document.getElementById("down-payment-result");
    downPaymentResultEl.innerHTML = this.downPayment;

    var interestRateResultEl = document.getElementById("interest-rate-result");
    interestRateResultEl.innerHTML = this.interestRate;

};

function updateDisplay() {
  getValuesFromSliders();
  updateNumericResults();

    // Breakout of monthly payment calculation
    var monthlyInterestRate = this.interestRate/12/100;
    var termInYears = 1;
    var loanAmount = this.homePrice - (this.downPayment/100)*this.homePrice;
    var monthlyPayment;

    var numerator = monthlyInterestRate *(Math.pow(1.0 + monthlyInterestRate, 12.0 * termInYears));
    var denominator = Math.pow((1 + monthlyInterestRate), (12.0 * termInYears)) - 1.0;
    var numOverDenom = numerator/denominator;
    monthlyPayment = loanAmount * numOverDenom;
    // monthlyPayment = monthlyPayment.toFixed(0);
    var monthlyPaymentStr = "$" + monthlyPayment.toFixed(0).insertComma();

    var monthlyPaymentResult = document.getElementById("monthly-payment-result");
    monthlyPaymentResult.innerHTML = monthlyPaymentStr;

    console.log(loanAmount)
    console.log(numOverDenom)
    console.log(this.interestRate)
    console.log(monthlyPayment)
    console.log('--------------------')
  this.chart.draw(data, options);
  };

 this.chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  // chart.draw(data, options);
  updateDisplay();

  // Set up UI events.
  document.getElementById("home-price-slider").onchange = function (){updateDisplay()};
  document.getElementById("down-payment-slider").onchange = function (){updateDisplay()};
  document.getElementById("interest-rate-slider").onchange = function (){updateDisplay()};
}
