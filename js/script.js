const nameInput = document.getElementById('name');
const titleSelect = document.getElementById('title');
const jobOtherInput = document.getElementById('other-title');
const colorOptionsDiv = document.getElementById('colors-js-puns');
const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const colorOptions = document.querySelectorAll('#color option');
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

// When page loads, set focus on the first field
window.onload = nameInput.focus();
