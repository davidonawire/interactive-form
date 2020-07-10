const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const titleSelect = document.getElementById('title');
const jobOtherInput = document.getElementById('other-title');
const colorOptionsDiv = document.getElementById('colors-js-puns');
const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const colorOptions = document.querySelectorAll('#color option');
const activities = document.querySelector('.activities');
const activitiesCheckboxes = document.querySelectorAll('.activities input');
const paymentSelect = document.getElementById('payment');
const creditDiv = document.getElementById('credit-card');
const ccNumInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');

let totalCost = 0;


// Initial set-up steps
jobOtherInput.hidden = true;

const pleaseOption = document.createElement('option');
pleaseOption.textContent = "Please select a T-shirt theme";
colorSelect.add(pleaseOption, 0);
hideColorOptions();
// colorOptionsDiv.style.display = 'none';
paymentSelect.querySelector('option[value="select method"]').hidden = true;
paymentSelect.querySelector('option[value="credit card"]').selected = true;
updatePayment('credit card');

const costDisplay = document.createElement('span');
activities.appendChild(costDisplay);

const nameError = createErrorMsg();
nameInput.parentNode.insertBefore(nameError, nameInput);
const emailError = createErrorMsg();
nameInput.parentNode.insertBefore(emailError, emailInput);
const activitiesError = createErrorMsg();
activities.appendChild(activitiesError);


// When page loads, set focus on the first field
window.onload = nameInput.focus();


function createErrorMsg() {
  const errSpan = document.createElement('div');
  errSpan.classList.add('errorMsg');
  errSpan.hidden = true;
  return errSpan;
}


function showError(errDiv, msg) {
  errDiv.textContent = msg;
  errDiv.hidden = false;
};


// Hide color options and set select to "Please select" option
function hideColorOptions() {
  colorSelect.selectedIndex = 0;
  for (let i = 0; i < colorOptions.length; i++) {
    colorOptions[i].hidden = true;
  };
};


function updateColors(themeText) {
  // Extract the category portion of the theme choice text
  const colorOptions = document.querySelectorAll('#color option');
  const matchText = themeText.replace('Theme - ', '');
  const matchRegEx = new RegExp(matchText);
  let newIndexIsSet = false;

  // Reset things if no theme is chosen
  if (themeText === 'Select Theme') {
    // colorOptionsDiv.hidden = true;
    colorSelect.selectedIndex = 0;
    hideColorOptions();
  } else {
    // colorOptionsDiv.hidden = false;
  };

  // Iterate through colorOptions and hide/show based on matching matchText
  for (let i = 0; i < colorOptions.length; i++) {
    const optionText = colorOptions[i].text;
    if (matchRegEx.test(optionText)) {
      colorOptions[i].hidden = false;
      if (!newIndexIsSet) {
        colorSelect.selectedIndex = i; // Set our new default selection
        newIndexIsSet = true;
      }
    } else {
      colorOptions[i].hidden = true;
    };
  };

};


function updateCost() {
  costDisplay.innerHTML = `Total: $${totalCost}`;
};


function updatePayment(type) {
  if (type === 'credit card') {
    creditDiv.hidden = false;
    paypalDiv.hidden = true;
    bitcoinDiv.hidden = true;
  } else if (type === 'paypal') {
    creditDiv.hidden = true;
    paypalDiv.hidden = false;
    bitcoinDiv.hidden = true;
  } else if (type === 'bitcoin') {
    creditDiv.hidden = true;
    paypalDiv.hidden = true;
    bitcoinDiv.hidden = false;
  }
}

// Validation functions

const nameValidator = () => {
  console.log('nameValidator triggered');
  const nameValue = nameInput.value;
  if (nameValue === '') {
    nameInput.classList.add('error');
    showError(nameError, "Name field cannot be blank");
    return false;
  } else {
    nameInput.classList.remove('error');
    nameError.hidden = true;
    return true;
  }
}


const emailValidator = () => {
  console.log('nameValidator triggered');
  const emailValue = emailInput.value;
  const match = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const emailIsValid = match.test(emailValue);
  if (!emailIsValid) {
    emailInput.classList.add('error');
    showError(emailError, "Please enter a valid email address");
    return false;
  } else {
    emailInput.classList.remove('error');
    emailError.hidden = true;
    return true;
  }
}


const activitiesValidator = () => {
  console.log('nameValidator triggered');
  // User must register for at least one activity
  for (let i = 0; i < activitiesCheckboxes.length; i++) {
    if (activitiesCheckboxes[i].checked) {
      activitiesError.hidden = true;
      return true;
    }
  }
  showError(activitiesError, "Please choose at least one activity");
  return false;
}

// Credit card (three fields)

const ccValidator = (input, match) => {
  const value = input.value;
  const isValid = match.test(value);
  if (!isValid) {
    input.classList.add('error');
    // showError(ccError, "Please enter a valid email address");
    return false;
  } else {
    input.classList.remove('error');
    // ccError.hidden = true;
    return true;
  }
}

// Add event listeners

titleSelect.addEventListener('change', (e) => {
  if (e.target.value == 'other') {
    jobOtherInput.hidden = false;
  } else {
    jobOtherInput.hidden = true;
  }
});

designSelect.addEventListener('change', (e) => {
  const selectedText = designSelect.options[designSelect.selectedIndex].text;
  updateColors(selectedText);
});

activities.addEventListener('change', (e) => {
  // Loop through activitiesCheckboxes and toggle ones that match clicked's date-time
  const clicked = e.target;
  const clickedTime = clicked.getAttribute('data-day-and-time');
  const clickedCost = parseInt(clicked.getAttribute('data-cost'));

  // Update total cost and display it accordingly
  if (clicked.checked) {
    totalCost += clickedCost;
  } else {
    totalCost -= clickedCost;
  }
  updateCost();

  // Loop through activitiesCheckboxes and toggle ones that match clicked's date-time
  for (let i = 0; i < activitiesCheckboxes.length; i++) {
    const checkboxTime = activitiesCheckboxes[i].getAttribute('data-day-and-time');
    const checkboxCost = parseInt(activitiesCheckboxes[i].getAttribute('data-cost'));
    if (checkboxTime === clickedTime && activitiesCheckboxes[i] !== clicked) {
      if (clicked.checked) {
        activitiesCheckboxes[i].disabled = true;
        activitiesCheckboxes[i].parentNode.style.opacity = 0.2;
      } else {
        activitiesCheckboxes[i].disabled = false;
        activitiesCheckboxes[i].parentNode.style.opacity = 1;
      };
    };
  };
});

paymentSelect.addEventListener('change', (e) => {
  const selectedValue = e.target.value;
  updatePayment(selectedValue);
});

nameInput.addEventListener('blur', nameValidator, false);
emailInput.addEventListener('blur', emailValidator, false);
ccNumInput.addEventListener('blur', (e) => {
  ccValidator(ccNumInput, /^\d{13,16}$/)
});
zipInput.addEventListener('blur', (e) => {
  ccValidator(zipInput, /^\d{5}$/)
});
cvvInput.addEventListener('blur', (e) => {
  ccValidator(cvvInput, /^\d{3}$/)
});
