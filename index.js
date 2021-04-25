import { ToMoney } from './utils.js';

/* Document */
const current_age = document.getElementById('current_age');
const fire_age = document.getElementById('fire_age');
const retirement_monthly_income = document.getElementById('retirement_monthly_income');
const safe_withdrawal_rate = document.getElementById('safe_withdrawal_rate');
const current_investments = document.getElementById('current_investments');
const current_additions = document.getElementById('current_additions');
const estimated_returns = document.getElementById('estimated_returns');

const predicted_fire_age = document.getElementById('predicted_fire_age');
const fire_number = document.getElementById('fire_number');
const fire_savings = document.getElementById('fire_savings');
const yearly_retirement_spending = document.getElementById('yearly_retirement_spending');

const investment_chart = document.getElementById('investment_chart');
var chart;

/* Calculators */
const MonthlyToYearly = (monthly) => {
  return monthly * 12;
}

// Calculate fire number
const CalculateFireNumber = (monthly_spending, swr) => {
  return monthly_spending * 12 / swr;
};

// Calculate savings rate
const SavingsRateCalculator = (years, current_invest, rate, target, n=12) => {
  // Compound interest for principal:
  // P(1+r/n)(nt)
  const total_for_principle = current_invest * (Math.pow((1 + (rate/n)), (n*years)));

  // Future value with regular investment:
  // PMT × {[(1 + r/n)(nt) - 1] / (r/n)} × (1+r/n)
  const new_target = target - Math.round(total_for_principle);

  const save_monthly = 
    new_target / (((Math.pow((1 + rate/n), (n*years)) -1 ) / (rate/n)) * (1 + (rate/n)));
  
  return Math.round(save_monthly * 100) /100;
};

// Fire age calc
const FireAgeCalculator = (current_age, current_investments, current_invest, rate, target, n=12) => {
  let val = Number(current_investments);
  let age = Number(current_age);

  while (val < target) {
    val = Number(current_invest) + val * (1 + rate/n);
    age = age + 1/n;
  }

  return Math.round(age * 10) / 10;
};

/* Charting */

const GenerateChart = (investment_target, investment_target_monthly_addition, max_num_years, n=12) => {
  const data = {};

  // Generate Years
  let years = [];
  let num_years = 0;
  if (fire_age.value - current_age.value < (2/3) * max_num_years) {
    num_years = Math.round((fire_age.value - current_age.value) * 1.5) + 2;
  } else {
    num_years = Math.round(max_num_years) + 2;
  }
  const age = Number(current_age.value);
  for (let i = 0; i < num_years; i++) {
    years.push(age + i);
  }
  data.labels = years;

  // Generate Investment Data
  const starting_value = Number(current_investments.value);
  const monthly_addition = Number(current_additions.value);
  const rate = 1 + ((Number(estimated_returns.value)/100) / n);
  let investment_goal_data = [starting_value];
  let investment_current_data = [starting_value];
  for (let i = 0; i < num_years - 1; i++) {
    let investment_goal_next = investment_goal_data[investment_goal_data.length - 1];
    let investment_current_next = investment_current_data[investment_current_data.length - 1];
    for (let j = 0; j < n; j++) {
      investment_goal_next = investment_goal_next * rate + investment_target_monthly_addition;
      investment_current_next = investment_current_next * rate + monthly_addition;
    }
    investment_goal_data.push(Math.round(investment_goal_next * 100) / 100);
    investment_current_data.push(Math.round(investment_current_next * 100) / 100);
  }

  const max_ticks = Math.round(investment_target * 1.5);
  
  data.datasets = [
    {
      label: 'Investment Goal',
      backgroundColor: 'rgba(0, 0, 150, 0)',
      borderColor: 'rgb(0, 0, 200)',
      data: investment_goal_data
    },
    {
      label: 'Current Investment Rate',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgb(0, 0, 0)',
      data: investment_current_data
    }
  ];

  let ctx = investment_chart.getContext('2d');
  if (chart) {
    chart.destroy();
  }

  const options = {
    scales: {
      yAxes: [{
        stacked: false,
        ticks: {
          beginAtZero: true,
          min: 0,
          max: max_ticks
        },
        scaleLabel: {
          display: true,
          labelString: "Invested"
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Age"
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

/* Form Inputs */

const RunCalculateFireNumber = () => {
  const fire_num = CalculateFireNumber(retirement_monthly_income.value, safe_withdrawal_rate.value / 100);
  fire_number.textContent = "Financial independence at " + ToMoney(fire_num);
  return Math.round(fire_num * 100) / 100;
};

const RunSavingsRateCalculator = (goal) => {
  const to_save = SavingsRateCalculator(
    fire_age.value - current_age.value,
    current_investments.value,
    Number(estimated_returns.value) /100,
    goal);
  fire_savings.textContent = "Save " + ToMoney(to_save) + " monthly in order to be financially independent in " + (fire_age.value - current_age.value) + " years"
  return to_save;
};

const RunFireAgeCalculator = (goal) => {
  const age = FireAgeCalculator(
    current_age.value,
    current_investments.value,
    current_additions.value,
    Number(estimated_returns.value) / 100,
    goal);
  predicted_fire_age.textContent = "Expect to retire at age " + age;
  return age - current_age.value;
};

const RunYearlySpendingCalc = () => {
  const monthly = Number(retirement_monthly_income.value);
  const yearly = MonthlyToYearly(monthly);
  yearly_retirement_spending.textContent = "Spending " + ToMoney(yearly) + " per year";
};

const RunAllCalculatorFunctions = () => {
  const investment_goal = RunCalculateFireNumber();
  const target = RunSavingsRateCalculator(investment_goal);
  const age = RunFireAgeCalculator(investment_goal);
  GenerateChart(investment_goal, target, age);
  RunYearlySpendingCalc();
};



current_age.onchange = () => {
  RunAllCalculatorFunctions();
};

fire_age.onchange = () => {
  RunAllCalculatorFunctions();
};

retirement_monthly_income.onchange = () => {
  RunAllCalculatorFunctions();
};

safe_withdrawal_rate.onchange = () => {
  RunAllCalculatorFunctions();
};

current_investments.onchange = () => {
  RunAllCalculatorFunctions();
};

current_additions.onchange = () => {
  RunAllCalculatorFunctions();
};

estimated_returns.onchange = () => {
  RunAllCalculatorFunctions();
};





/* On start */
RunAllCalculatorFunctions();
