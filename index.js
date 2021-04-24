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

/* Calculators */

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
    val = Number(current_invest) + val * (1 + Number(rate)/n);
    age = age + 1/n;
  }

  return Math.round(age * 10) / 10;
};


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
    estimated_returns.value /100,
    goal);
  fire_savings.textContent = "Save " + ToMoney(to_save) + " monthly in order to be financially independent in " + (fire_age.value - current_age.value) + " years"
  return to_save;
};

const RunFireAgeCalculator = (goal) => {
  const age = FireAgeCalculator(
    current_age.value,
    current_investments.value,
    current_additions.value,
    estimated_returns.value / 100,
    goal);
  predicted_fire_age.textContent = "Expect to retire at age " + age;
};


const RunAllCalculatorFunctions = () => {
  let investment_goal = RunCalculateFireNumber();
  RunSavingsRateCalculator(investment_goal);
  RunFireAgeCalculator(investment_goal);
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
