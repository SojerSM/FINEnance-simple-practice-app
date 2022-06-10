'use strict';

////////////////////////
// SELECTING ELEMENTS */
////////////////////////
const labelRandLogin = document.getElementById('generated-login-label');

const btnNewAccount = document.querySelector('.btn-create-new-account');
const btnMainPage = document.querySelector('.btn-back-to-main-page');
const btnSignUp = document.querySelector('.btn-sign-up-submit');
const btnModal = document.querySelector('.btn-sign-in');

const containerLogin = document.querySelector('.login-container');
const containerSignUp = document.querySelector('.sign-up-container');
const modalWrapper = document.querySelector('.sign-up-modal-wrapper');
const overlay = document.querySelector('.overlay');

const inputSignUpName = document.querySelector('.sign-up-name');
const inputSignUpYear = document.querySelector('.sign-up-birth-year');
const inputSignUpPass = document.querySelector('.sign-up-password');
const inputSignUpPassRep = document.querySelector('.sign-up-password-rep');

const warnSignUpName = document.querySelector('.sign-up-name-warning');
const warnSignUpYear = document.querySelector('.sign-up-birth-year-warning');
const warnSignUpPass = document.querySelector('.sign-up-password-warning');
const warnSignUpPassRep = document.querySelector(
  '.sign-up-password-rep-warning'
);
const warnSignUpSubmit = document.querySelector('.sign-up-submit-warning');

//////////////
/* INITIALS */
//////////////
const accounts = [];

///////////////
/* FUNCTIONS */
///////////////
const toggleSignWindows = function () {
  containerLogin.classList.toggle('hidden');
  containerSignUp.classList.toggle('hidden');
};

const clearSignUpInputs = function () {
  inputSignUpName.value = '';
  inputSignUpYear.value = '';
  inputSignUpPass.value = '';
  inputSignUpPassRep.value = '';
};

const checkSignUpName = function (name) {
  let regExp = /^[A-Za-z\s]*$/;
  let temp = inputSignUpName.value;
  if (regExp.test(temp)) {
    name = temp;
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
  if (inputYear >= 1900 && inputYear < currentYear - 1) {
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

const comparePasswords = function (pass, rep) {
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

const displaySignUpModal = function (username) {
  overlay.classList.remove('hidden');
  modalWrapper.classList.remove('hidden');
  labelRandLogin.textContent = username;
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

// Sign up
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
    console.log(document.querySelector('.sign-up-password').value);
  } else {
    warnSignUpSubmit.classList.add('hidden');
    name = checkSignUpName(name).trim();
    year = checkSignUpYear(year);
    pass = checkSignUpPassword(pass);
    passRep = comparePasswords(pass, inputSignUpPassRep.value);
    clearSignUpInputs();
    // Push new object to the array if all data are correct
    if (name && year && pass && passRep) {
      let username = createUsername(name, year);
      accounts.push({
        firstName: name,
        username: username,
        birthYear: year,
        password: pass,
      });
      displaySignUpModal(username);
    }
  }
  console.log(name, year, pass, passRep);
  console.log(accounts);
});

btnModal.addEventListener('click', () => {
  overlay.classList.add('hidden');
  modalWrapper.classList.add('hidden');
  containerSignUp.classList.add('hidden');
  containerLogin.classList.remove('hidden');
});
