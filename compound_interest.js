import { ToMoney } from './utils.js';

const beginning_principle = document.getElementById('beginning_principle');
const monthly_addition = document.getElementById('monthly_addition');
const years_to_compound = document.getElementById('years_to_compound');
const rate_of_return = document.getElementById('rate_of_return');

const compound_interest = document.getElementById('compound_interest');

const interest_chart = document.getElementById('interest_chart');
var chart;

const CalculateCompoundInterest = (principle, addition, years, rate, n=12) => {
  const total_for_principle = principle * (Math.pow((1 + (rate/n)), (n*years)));
  const total_for_addition = addition * ((Math.pow(1 + rate/n, (n * years)) - 1) / (rate/n)) * (1+rate / n);
  return total_for_principle +  total_for_addition;
};

const GenerateChart = (monthly = true) => {
  const data = {};

  // Generate Years
  let years = [];
  let num_years = Number(years_to_compound.value);
  for (let i = 0; i <= num_years; i++) {
    years.push(i);
  }
  data.labels = years;

  let principle = [Number(beginning_principle.value)];
  let interest = [0];

  let addition, r, n;
  if (monthly) {
    addition = Number(monthly_addition.value);
    r = (Number(rate_of_return.value) / 12) / 100;
    n = 12;
  } else {
    addition = Number(monthly_addition.value)  * 12;
    r = Number(rate_of_return.value) / 100;
    n = 1;
  }

  for (let i = 0; i < num_years; i++) {
    let principle_next = principle[i];
    let interest_next = interest[i];
    for (let j = 0; j < n; j++) {
      principle_next = principle_next + addition;
      interest_next = interest_next + ((principle_next + interest_next) * r);
    }
    principle.push(principle_next);
    interest_next = Math.round(interest_next * 100) / 100;
    interest.push(interest_next);
  }

  data.datasets = [
    {
      label: 'Principle',
      backgroundColor: 'rgba(0, 0, 150, .5)',
      borderColor: 'rgb(0, 0, 150)',
      data: principle
    },
    {
      label: 'Interest Earned',
      backgroundColor: 'rgba(0, 150, 0, .5)',
      borderColor: 'rgb(0, 150, 0)',
      data: interest
    }
  ];

  let ctx = interest_chart.getContext('2d');
  if (chart) {
    chart.destroy();
  }

  const options = {
    scales: {
      yAxes: [{
        stacked: true,
        scaleLabel: {
          display: true,
          labelString: "Value"
        },
        ticks: {
          beginAtZero: true, 
          callback: function(value, index, values) {
            return ToMoney(value);
          }
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Years"
        }
      }]
    }
  };

  chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options
  });	

}

const RunCompoundInterestCalc = () => {
  const end_val = CalculateCompoundInterest(
    beginning_principle.value,
    monthly_addition.value,
    years_to_compound.value,
    rate_of_return.value / 100
  );
  compound_interest.textContent = "Ending value: " + ToMoney(end_val);

  GenerateChart();
};  

beginning_principle.onchange = () => {
  RunCompoundInterestCalc();
};

monthly_addition.onchange = () => {
  RunCompoundInterestCalc();
};

years_to_compound.onchange = () => {
  RunCompoundInterestCalc();
};

rate_of_return.onchange = () => {
  RunCompoundInterestCalc();
};

RunCompoundInterestCalc();