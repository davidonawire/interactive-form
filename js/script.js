const nameInput = document.getElementById('name');
const jobOtherInput = document.getElementById('other-title');
const colorOptionsDiv = document.getElementById('colors-js-puns');
const designSelect = document.getElementById('design');

// Hide not-yet-relevant elements
jobOtherInput.style.display = 'none';
colorOptionsDiv.style.display = 'none';

// Display appropriate subset of color options based on chosen theme
// Receive selected theme.
// Show colorOptionsDiv if theme is one of the two choices (hide if not)
// Select the color options into an array (or two arrays)
// Based on theme, hide/disable non-matching set of colors and enable matching set

function updateColors(theme) {
  const colorOptions = document.querySelectorAll('#color option');
  console.log(colorOptions);

  if (theme === 'Select Theme') {
    colorOptionsDiv.style.display = 'none';
  } else {
    colorOptionsDiv.style.display = 'inherit';
  }

  
}

// Add event listeners
designSelect.addEventListener('change', (e) => {
  console.log(e.target.value);
  updateColors(e.target.value)
});

// When page loads, set focus on the first field
window.onload = nameInput.focus();
