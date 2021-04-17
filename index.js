/* Document */
const retirement_monthly_income = document.getElementById('retirement_monthly_income');
const current_age = document.getElementById('current_age');
const fire_age = document.getElementById('fire_age');
const current_investments = document.getElementById('current_investments');
const estimated_returns = document.getElementById('estimated_returns');
const investment_goal = document.getElementById('investment_goal');

const monthly_spending = document.getElementById('monthly_spending');
const monthly_investing = document.getElementById('monthly_investing');
const state = document.getElementById('state');


const fire_number = document.getElementById('fire_number');
const fire_savings = document.getElementById('fire_savings');

/* Calculators */

// Calculate fire number
const CalculateFireNumber = (monthly_spending) => {
  return monthly_spending * 12 * 25;
}

retirement_monthly_income.onchange = () => {
  const fire_num = CalculateFireNumber(retirement_monthly_income.value);
  fire_number.textContent = "$" + fire_num;
}


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
}


current_age.onchange = () => {
   const to_save = SavingsRateCalculator(
    fire_age.value - current_age.value,
    current_investments.value,
    estimated_returns.value /100,
    investment_goal.value);
  fire_savings.textContent = "$" + to_save;
}


fire_age.onchange = () => {
   const to_save = SavingsRateCalculator(
    fire_age.value - current_age.value,
    current_investments.value,
    estimated_returns.value /100,
    investment_goal.value);
  fire_savings.textContent = "$" + to_save;
}

current_investments.onchange = () => {
   const to_save = SavingsRateCalculator(
    fire_age.value - current_age.value,
    current_investments.value,
    estimated_returns.value /100,
    investment_goal.value);
  fire_savings.textContent = "$" + to_save;
}

estimated_returns.onchange = () => {
   const to_save = SavingsRateCalculator(
    fire_age.value - current_age.value,
    current_investments.value,
    estimated_returns.value /100,
    investment_goal.value);
  fire_savings.textContent = "$" + to_save;
}

investment_goal.onchange = () => {
   const to_save = SavingsRateCalculator(
    fire_age.value - current_age.value,
    current_investments.value,
    estimated_returns.value /100,
    investment_goal.value);
  fire_savings.textContent = "$" + to_save;
}




/* On start */

const fire_num = CalculateFireNumber(retirement_monthly_income.value);
fire_number.textContent = "$" + fire_num;

const to_save = SavingsRateCalculator(
    fire_age.value - current_age.value,
    current_investments.value,
    estimated_returns.value /100,
    investment_goal.value);
fire_savings.textContent = "$" + to_save;