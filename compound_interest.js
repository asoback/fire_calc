import { ToMoney } from './utils.js';

const beginning_principle = document.getElementById('beginning_principle');
const monthly_addition = document.getElementById('monthly_addition');
const years_to_compound = document.getElementById('years_to_compound');
const rate_of_return = document.getElementById('rate_of_return');

const compound_interest = document.getElementById('compound_interest');

const CalculateCompoundInterest = (principle, addition, years, rate, n=12) => {
  const total_for_principle = principle * (Math.pow((1 + (rate/n)), (n*years)));
  const total_for_addition = addition * ((Math.pow(1 + rate/n, (n * years)) - 1) / (rate/n)) * (1+rate / n);
  return total_for_principle +  total_for_addition;
};

const RunCompoundInterestCalc = () => {
  const end_val = CalculateCompoundInterest(
    beginning_principle.value,
    monthly_addition.value,
    years_to_compound.value,
    rate_of_return.value / 100
  );
  compound_interest.textContent = "Ending value: " + ToMoney(end_val);
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