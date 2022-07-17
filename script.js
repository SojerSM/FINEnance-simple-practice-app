'use strict';

////////////////////////
// SELECTING ELEMENTS */
////////////////////////
const labelRandLogin = document.getElementById('generated-login-label');
const labelUserWelcome = document.getElementById('welcome-user');
const labelDateMessage = document.getElementById('date-message');
const labelTotalIncome = document.getElementById('total-incomes');
const labelTotalSpending = document.getElementById('total-spendings');
const labelSummary = document.getElementById('summary-amount');
const labelHintFirst = document.getElementById('hint-first');
const labelHintSecond = document.getElementById('hint-second');

const btnNewAccount = document.querySelector('.btn-create-new-account');
const btnMainPage = document.querySelector('.btn-back-to-main-page');
const btnSignUp = document.querySelector('.btn-sign-up-submit');
const btnLogin = document.querySelector('.btn-login-submit');
const btnModal = document.querySelector('.btn-sign-in');
const btnLogout = document.querySelector('.btn-logout');
const btnAdd = document.querySelector('.btn-income-spending');
const btnSort = document.querySelector('.btn-sort-lists');
const btnClearAll = document.querySelector('.btn-clear-all');
const btnSavingsSubmit = document.querySelector('.btn-savings-submit');

const containerLogin = document.querySelector('.login-container');
const containerSignUp = document.querySelector('.sign-up-container');
const containerApp = document.querySelector('.app-container');
const wrapperModal = document.querySelector('.sign-up-modal-wrapper');
const overlay = document.querySelector('.overlay');
const wrapperWelcome = document.querySelector('.welcome-wrapper');
const containerIncomes = document.querySelector('.incomes-container');
const containerSpendings = document.querySelector('.spendings-container');
const containerSummary = document.querySelector('.summary-bottom-container');

const inputSignUpName = document.querySelector('.sign-up-name');
const inputSignUpYear = document.querySelector('.sign-up-birth-year');
const inputSignUpPass = document.querySelector('.sign-up-password');
const inputSignUpPassRep = document.querySelector('.sign-up-password-rep');
const inputLoginUser = document.querySelector('.login-user');
const inputLoginPass = document.querySelector('.login-password');
const inputDesignation = document.querySelector('.income-spending-bar');
const selectTypesList = document.querySelector('.income-spending-types-list');
const inputAmount = document.querySelector('.amount-bar');
const inputSavings = document.querySelector('.input-savings');

const warnSignUpName = document.querySelector('.sign-up-name-warning');
const warnSignUpYear = document.querySelector('.sign-up-birth-year-warning');
const warnSignUpPass = document.querySelector('.sign-up-password-warning');
const warnSignUpPassRep = document.querySelector(
  '.sign-up-password-rep-warning'
);
const warnSignUpSubmit = document.querySelector('.sign-up-submit-warning');
const warnLoginUser = document.querySelector('.login-username-warning');
const warnLoginPass = document.querySelector('.login-password-warning');
const warnLoginSubmit = document.querySelector('.login-submit-warning');
const warnAddBar = document.querySelector('.income-spending-warning');
const warnSavings = document.querySelector('.savings-bar-warning');

//////////////
/* INITIALS */
//////////////
let accounts = [];
let currentAccount, summary;

///////////////
/* FUNCTIONS */
///////////////
const toggleSignWindows = function () {
  containerLogin.classList.toggle('hidden');
  containerSignUp.classList.toggle('hidden');
};

const toggleAppWindow = function () {
  containerLogin.classList.toggle('hidden');
  containerApp.classList.toggle('hidden');
  wrapperWelcome.classList.toggle('hidden');
  btnLogout.classList.toggle('hidden');
};

const clearSignUpInputs = function () {
  inputSignUpName.value = '';
  inputSignUpYear.value = '';
  inputSignUpPass.value = '';
  inputSignUpPassRep.value = '';
};

const clearLoginInputs = function () {
  inputLoginUser.value = '';
  inputLoginPass.value = '';
};

const clearAddBarInputs = function () {
  inputDesignation.value = '';
  selectTypesList.value = '';
  inputAmount.value = '';
};

const clearAllHints = function () {
  containerSummary.classList.add('hidden');
};

const clearSignUpWarnings = function () {
  warnSignUpName.classList.add('hidden');
  warnSignUpPass.classList.add('hidden');
  warnSignUpPassRep.classList.add('hidden');
  warnSignUpYear.classList.add('hidden');
};

const clearLoginWarnings = function () {
  warnLoginUser.classList.add('hidden');
  warnLoginPass.classList.add('hidden');
};

const displaySignUpModal = function (username) {
  overlay.classList.remove('hidden');
  wrapperModal.classList.remove('hidden');
  labelRandLogin.textContent = username;
};

const displayHints = function (amount, isLower) {
  containerSummary.classList.remove('hidden');
  labelHintFirst.textContent = `The amount of money you want to save is ${
    isLower ? 'lower' : 'higher'
  } than the actual remaining and equals ${Math.round(amount)}$.`;
  if (isLower) {
    containerSummary.style.background = 'var(--custom-blue)';
    labelHintSecond.textContent = `You can even save up to ${Math.round(
      (summary / currentAccount.totalIncome) * 100
    )}% of your income based on current spendings level.`;
  } else {
    containerSummary.style.background = 'var(--warning)';
    labelHintSecond.textContent = `It might be a good idea to give up some of irregular spendings or looking for another source of income in order to achieving your goal.`;
  }
};

const updateUserData = function (account) {
  let [first, ...others] = account.firstName;
  labelUserWelcome.textContent = first.toUpperCase().concat(...others);
  labelDateMessage.textContent = getFormatedDate();
  updateSummary(currentAccount);
};

const updateSummary = function (account) {
  labelTotalIncome.textContent = account.totalIncome + '$';
  labelTotalSpending.textContent = account.totalSpending + '$';
  labelSummary.textContent = account.totalIncome - account.totalSpending + '$';
  updateIncomes();
  updateSpendings();
};

const getFormatedDate = function () {
  const currentDate = new Date();
  const hours = `${currentDate.getHours()}`.padStart(2, '0');
  const minutes = `${currentDate.getMinutes()}`.padStart(2, '0');
  const dateStr = `${currentDate.toLocaleDateString('en-GB', {
    weekday: 'long',
  })}, ${hours}:${minutes}`;
  return dateStr;
};

const checkSignUpName = function (name) {
  let regExp = /^[A-Za-z\s]*$/;
  let temp = inputSignUpName.value;
  if (regExp.test(temp)) {
    name = temp.trim();
    warnSignUpName.classList.add('hidden');
  } else {
    warnSignUpName.classList.remove('hidden');
    warnSignUpName.textContent = 'Only letters and spaces';
  }
  return name;
};

const checkSignUpYear = function (year) {
  const currentYear = new Date().getFullYear();
  const inputYear = +inputSignUpYear.value;
  if (inputYear >= 1900 && inputYear < currentYear) {
    year = inputYear;
    warnSignUpYear.classList.add('hidden');
  } else {
    warnSignUpYear.classList.remove('hidden');
    warnSignUpYear.textContent = 'Incorect year';
  }
  return year;
};

const checkSignUpPassword = function (pass) {
  const inputPass = inputSignUpPass.value;
  if (inputPass.length >= 8) {
    pass = inputPass;
    warnSignUpPass.classList.add('hidden');
  } else {
    warnSignUpPass.classList.remove('hidden');
    warnSignUpPass.textContent = 'Too short';
  }
  return pass;
};

const compareSignUpPasswords = function (pass, rep) {
  if (pass === rep) {
    warnSignUpPassRep.classList.add('hidden');
    return true;
  } else {
    warnSignUpPassRep.classList.remove('hidden');
    warnSignUpPassRep.textContent = 'Incorrect';
  }
};

const createUsername = function (name, year) {
  let letters = ['a', 'b', 'c', 'd', 'x', 'y', 'z'];
  let username =
    `${name.toLowerCase().slice(0, 3)}` + `${String(year).slice(2)}`;
  for (let i = 0; i < 2; i++) {
    let temp = Math.trunc(Math.random() * letters.length);
    username = username + letters[temp];
  }
  return username;
};

const checkLoginData = function (id) {
  clearLoginWarnings();
  if (!(id >= 0)) {
    warnLoginUser.classList.remove('hidden');
    warnLoginUser.textContent = `User doesn't exist`;
    clearLoginInputs();
  } else {
    currentAccount = accounts[id];
    console.log(currentAccount);
    if (currentAccount.password === inputLoginPass.value) {
      toggleAppWindow();
      updateUserData(currentAccount);
      clearAllHints();
    } else {
      warnLoginPass.classList.remove('hidden');
      warnLoginPass.textContent = 'Incorrect password';
    }
    clearLoginInputs();
  }
};

const updateIncomes = function (sort = false) {
  const currentAccountIncomes = sort
    ? currentAccount.incomes.slice().sort((a, b) => b.amount - a.amount)
    : currentAccount.incomes;
  containerIncomes.innerHTML = '<p id="incomes-title">Incomes</p>';
  currentAccountIncomes.forEach((income, id) => {
    const htmlEl = `<div class="income-wrapper">
    <div class="left-column">
      <p class="income-name">${income.designation}</p>
    </div>
    <div class="right-column">
      <p class="income-type">${income.type}</p>
      <p class="income-amount">${income.amount}$</p>
    </div>
  </div>`;
    containerIncomes.insertAdjacentHTML('beforeend', htmlEl);
  });
};

const updateSpendings = function (sort = false) {
  const currentAccountSpending = sort
    ? currentAccount.spendings.slice().sort((a, b) => b.amount - a.amount)
    : currentAccount.spendings;
  containerSpendings.innerHTML = '<p id="spendings-title">Spendings</p>';
  currentAccountSpending.forEach((spending, id) => {
    const htmlEl = `<div class="spending-wrapper">
    <div class="left-column">
      <p class="spending-name">${spending.designation}</p>
    </div>
    <div class="right-column">
      <p class="spending-type">${spending.type}</p>
      <p class="spending-amount">${spending.amount}$</p>
    </div>
  </div>`;
    containerSpendings.insertAdjacentHTML('beforeend', htmlEl);
  });
};

//New sort
let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  updateIncomes(!sorted);
  updateSpendings(!sorted);
  sorted = !sorted;
  clearAddBarInputs();
});

const compareSummaryAmount = function (amount) {
  summary = currentAccount.totalIncome - currentAccount.totalSpending;
  return amount > summary ? false : true;
};

////////////////////
/* EVENT HANDLERS */
////////////////////
btnNewAccount.addEventListener('click', () => {
  toggleSignWindows();
});

btnMainPage.addEventListener('click', () => {
  toggleSignWindows();
});

// SIGN UP
btnSignUp.addEventListener('click', e => {
  e.preventDefault();
  let name, year, pass, passRep;
  // Check if any field is empty
  if (
    !inputSignUpName.value ||
    !inputSignUpYear.value ||
    !inputSignUpPass.value ||
    !inputSignUpPassRep.value
  ) {
    warnSignUpSubmit.classList.remove('hidden');
    warnSignUpSubmit.textContent = 'Complete the form';
    clearSignUpInputs();
    clearSignUpWarnings();
  } else {
    warnSignUpSubmit.classList.add('hidden');
    name = checkSignUpName(name);
    year = checkSignUpYear(year);
    pass = checkSignUpPassword(pass);
    passRep = compareSignUpPasswords(pass, inputSignUpPassRep.value);
    clearSignUpInputs();
    // Push new object to the array if all data are correct
    if (name && year && pass && passRep) {
      let username = createUsername(name, year);
      accounts.push({
        firstName: name,
        username: username,
        birthYear: year,
        password: pass,
        incomes: [],
        spendings: [],
        totalIncome: 0,
        totalSpending: 0,
      });
      displaySignUpModal(username);
    }
  }
  console.log(name, year, pass, passRep);
  console.log(accounts);
});

btnModal.addEventListener('click', () => {
  overlay.classList.add('hidden');
  wrapperModal.classList.add('hidden');
  containerSignUp.classList.add('hidden');
  containerLogin.classList.remove('hidden');
  warnLoginSubmit.classList.add('hidden');
  clearLoginInputs();
  clearLoginWarnings();
});

// LOGIN
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  // check if accounts array contains element with passed username
  let userId = accounts.findIndex(account => {
    return account.username === inputLoginUser.value;
  });
  // check if any field is empty
  if (!inputLoginUser.value || !inputLoginPass.value) {
    warnLoginSubmit.classList.remove('hidden');
    warnLoginSubmit.textContent = 'Complete the form';
    clearLoginInputs();
    clearLoginWarnings();
  } else {
    warnLoginSubmit.classList.add('hidden');
    checkLoginData(userId);
  }
});

btnLogout.addEventListener('click', () => {
  toggleAppWindow();
});

// Adding a new element to the arrays of incomes/spendings
btnAdd.addEventListener('click', e => {
  e.preventDefault();
  const type = selectTypesList.value;
  // check if any field is empty
  if (!inputDesignation.value || !type || !inputAmount.value) {
    clearAddBarInputs();
    warnAddBar.classList.remove('hidden');
    warnAddBar.textContent = 'Complete the form';
  } else {
    if (isNaN(+inputAmount.value)) {
      console.log('Is not a number');
      warnAddBar.classList.remove('hidden');
      warnAddBar.textContent = 'Amount must be a number';
    } else {
      warnAddBar.classList.add('hidden');
      if (type === 'Salary' || type === 'Interest') {
        currentAccount.incomes.push({
          designation: inputDesignation.value.trim(),
          type: type,
          amount: inputAmount.value,
        });
        currentAccount.totalIncome += +inputAmount.value;
        updateIncomes();
      }
      if (type === 'Fixed' || type === 'Irregular') {
        currentAccount.spendings.push({
          designation: inputDesignation.value.trim(),
          type: type,
          amount: inputAmount.value,
        });
        currentAccount.totalSpending += +inputAmount.value;
        updateSpendings();
      }
    }
  }
  updateSummary(currentAccount);
  clearAddBarInputs();
});

btnClearAll.addEventListener('click', e => {
  e.preventDefault();
  currentAccount.incomes = [];
  currentAccount.spendings = [];
  updateIncomes();
  updateSpendings();
  clearAddBarInputs();
  labelTotalIncome.textContent = '0$';
  labelTotalSpending.textContent = '0$';
  labelSummary.textContent = '0$';
});

btnSavingsSubmit.addEventListener('click', e => {
  e.preventDefault();
  if (!inputSavings.value) {
    warnSavings.classList.remove('hidden');
    warnSavings.textContent = 'Complete the form';
    inputSavings.value = '';
    clearAllHints();
  } else {
    if (
      Number.isInteger(+inputSavings.value) &&
      +inputSavings.value >= 1 &&
      +inputSavings.value < 100
    ) {
      warnSavings.classList.add('hidden');
      let amount = currentAccount.totalIncome * (inputSavings.value / 100);
      displayHints(amount, compareSummaryAmount(amount));
    } else {
      warnSavings.classList.remove('hidden');
      warnSavings.textContent = 'Must be an integer in range of 1-100';
      inputSavings.value = '';
      clearAllHints();
    }
  }
  inputSavings.value = '';
});
