/* Document */
const retirement_monthly_income = document.getElementById('retirement_monthly_income');
const current_age = document.getElementById('current_age');
const fire_age = document.getElementById('fire_age');
const current_investments = document.getElementById('current_investments');
const estimated_returns = document.getElementById('estimated_returns');
const investment_goal = document.getElementById('investment_goal');
const safe_withdrawal_rate = document.getElementById('safe_withdrawal_rate');

const current_age_2 = document.getElementById('current_age_2');
const current_investments_2 = document.getElementById('current_investments_2');
const estimated_returns_2 = document.getElementById('estimated_returns_2');
const investment_goal_2 = document.getElementById('investment_goal_2');
const current_additions = document.getElementById('current_additions');

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

/* Utils */

const ToMoney = (num) => {
 const dollars = Math.round(num * 100) / 100;
 return "$" + dollars.toLocaleString();
};


/* Form Inputs */

retirement_monthly_income.onchange = () => {
  const fire_num = CalculateFireNumber(retirement_monthly_income.value, safe_withdrawal_rate.value / 100);
  fire_number.textContent = ToMoney(fire_num);
};

safe_withdrawal_rate.onchange = () => {
  const fire_num = CalculateFireNumber(retirement_monthly_income.value, safe_withdrawal_rate.value / 100);
  fire_number.textContent = ToMoney(fire_num);
};

current_age.onchange = () => {
   const to_save = SavingsRateCalculator(
    fire_age.value - current_age.value,
    current_investments.value,
    estimated_returns.value /100,
    investment_goal.value);
  fire_savings.textContent = ToMoney(to_save);
}


fire_age.onchange = () => {
   const to_save = SavingsRateCalculator(
    fire_age.value - current_age.value,
    current_investments.value,
    estimated_returns.value /100,
    investment_goal.value);
  fire_savings.textContent = ToMoney(to_save);
}

current_investments.onchange = () => {
   const to_save = SavingsRateCalculator(
    fire_age.value - current_age.value,
    current_investments.value,
    estimated_returns.value /100,
    investment_goal.value);
  fire_savings.textContent = ToMoney(to_save);
}

estimated_returns.onchange = () => {
   const to_save = SavingsRateCalculator(
    fire_age.value - current_age.value,
    current_investments.value,
    estimated_returns.value /100,
    investment_goal.value);
  fire_savings.textContent = ToMoney(to_save);
}

investment_goal.onchange = () => {
   const to_save = SavingsRateCalculator(
    fire_age.value - current_age.value,
    current_investments.value,
    estimated_returns.value /100,
    investment_goal.value);
  fire_savings.textContent = ToMoney(to_save);
}

current_age_2.onchange = () => {
  const age = FireAgeCalculator(
    current_age_2.value,
    current_investments_2.value,
    current_additions.value,
    estimated_returns_2.value / 100,
    investment_goal_2.value);
  predicted_fire_age.textContent = "Expect to retire at age " + age;
}

current_additions.onchange = () => {
  const age = FireAgeCalculator(
    current_age_2.value,
    current_investments_2.value,
    current_additions.value,
    estimated_returns_2.value / 100,
    investment_goal_2.value);
  predicted_fire_age.textContent = "Expect to retire at age " + age;
}

current_investments_2.onchange = () => {
  const age = FireAgeCalculator(
    current_age_2.value,
    current_investments_2.value,
    current_additions.value,
    estimated_returns_2.value / 100,
    investment_goal_2.value);
  predicted_fire_age.textContent = "Expect to retire at age " + age;
}

estimated_returns_2.onchange = () => {
  const age = FireAgeCalculator(
    current_age_2.value,
    current_investments_2.value,
    current_additions.value,
    estimated_returns_2.value / 100,
    investment_goal_2.value);
  predicted_fire_age.textContent = "Expect to retire at age " + age;
}

investment_goal_2.onchange = () => {
  const age = FireAgeCalculator(
    current_age_2.value,
    current_investments_2.value,
    current_additions.value,
    estimated_returns_2.value / 100,
    investment_goal_2.value);
  predicted_fire_age.textContent = "Expect to retire at age " + age;
}



/* On start */

const fire_num = CalculateFireNumber(retirement_monthly_income.value, safe_withdrawal_rate.value / 100);
fire_number.textContent = ToMoney(fire_num);

const to_save = SavingsRateCalculator(
    fire_age.value - current_age.value,
    current_investments.value,
    estimated_returns.value /100,
    investment_goal.value);
fire_savings.textContent = ToMoney(to_save);

const age = FireAgeCalculator(
  current_age_2.value,
  current_investments_2.value,
  current_additions.value,
  estimated_returns_2.value / 100,
  investment_goal_2.value);
predicted_fire_age.textContent = "Expect to retire at age " + age;