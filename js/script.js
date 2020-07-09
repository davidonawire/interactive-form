const nameInput = document.getElementById('name');
const titleSelect = document.getElementById('title');
const jobOtherInput = document.getElementById('other-title');
const colorOptionsDiv = document.getElementById('colors-js-puns');
const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const colorOptions = document.querySelectorAll('#color option');
const activities = document.querySelector('.activities');
const activitiesCheckboxes = document.querySelectorAll('.activities input');
let totalCost = 0;
// const colorOptions = document.querySelectorAll('#color option');

// Hide color options and set select to "Please select" option
function hideColorOptions() {
  colorSelect.selectedIndex = 0;
  for (let i = 0; i < colorOptions.length; i++) {
    colorOptions[i].hidden = true;
  };
};

// Initial set-up steps
jobOtherInput.hidden = true;

const pleaseOption = document.createElement('option');
pleaseOption.textContent = "Please select a T-shirt theme";
colorSelect.add(pleaseOption, 0);
hideColorOptions();
// colorOptionsDiv.style.display = 'none';

const costDisplay = document.createElement('span');
activities.appendChild(costDisplay);

// When page loads, set focus on the first field
window.onload = nameInput.focus();


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
  costDisplay.innerHTML = `Total cost: $${totalCost}`;
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
