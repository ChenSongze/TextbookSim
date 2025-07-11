// Debug script to diagnose button interaction issues
// Copy and paste this into browser console when experiencing the issue

console.log('=== Button Interaction Debug ===');

// Check tutorial state
console.log('Tutorial active:', typeof tutorialActive !== 'undefined' ? tutorialActive : 'undefined');

// Check tutorial overlay
const tutorialOverlay = document.getElementById('tutorial-overlay');
console.log('Tutorial overlay display:', tutorialOverlay ? tutorialOverlay.style.display : 'not found');
console.log('Tutorial overlay computed display:', tutorialOverlay ? window.getComputedStyle(tutorialOverlay).display : 'not found');

// Check main game page
const mainGamePage = document.getElementById('main-game');
console.log('Main game page active:', mainGamePage ? mainGamePage.classList.contains('active') : 'not found');
console.log('Main game page hidden:', mainGamePage ? mainGamePage.classList.contains('hidden') : 'not found');
console.log('Main game page pointer-events:', mainGamePage ? window.getComputedStyle(mainGamePage).pointerEvents : 'not found');

// Check letter items
const letterItems = document.querySelectorAll('.letter-item');
console.log('Letter items count:', letterItems.length);
letterItems.forEach((item, index) => {
  console.log(`Letter ${index}:`, {
    'pointer-events': window.getComputedStyle(item).pointerEvents,
    'display': window.getComputedStyle(item).display,
    'visibility': window.getComputedStyle(item).visibility,
    'z-index': window.getComputedStyle(item).zIndex,
    'onclick': item.onclick !== null,
    'dataset.index': item.dataset.index
  });
});

// Check tool items
const toolItems = document.querySelectorAll('.tool-item');
console.log('Tool items count:', toolItems.length);
toolItems.forEach((item, index) => {
  console.log(`Tool ${index}:`, {
    'pointer-events': window.getComputedStyle(item).pointerEvents,
    'disabled': item.classList.contains('disabled'),
    'draggable': item.draggable
  });
});

// Check cells
const cells = document.querySelectorAll('.cell');
console.log('Grid cells count:', cells.length);
console.log('First cell pointer-events:', cells.length > 0 ? window.getComputedStyle(cells[0]).pointerEvents : 'no cells');

// Check fact check button
const factCheckBtn = document.getElementById('fact-check-btn');
console.log('Fact check button:', factCheckBtn ? {
  'pointer-events': window.getComputedStyle(factCheckBtn).pointerEvents,
  'disabled': factCheckBtn.classList.contains('disabled'),
  'display': window.getComputedStyle(factCheckBtn).display
} : 'not found');

// Check for any overlays with high z-index
const allElements = document.querySelectorAll('*');
const highZIndexElements = [];
allElements.forEach(el => {
  const zIndex = parseInt(window.getComputedStyle(el).zIndex);
  if (zIndex > 1000) {
    highZIndexElements.push({
      element: el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.split(' ').join('.') : ''),
      zIndex: zIndex,
      display: window.getComputedStyle(el).display,
      pointerEvents: window.getComputedStyle(el).pointerEvents
    });
  }
});
console.log('High z-index elements:', highZIndexElements);

// Test clicking on first letter
if (letterItems.length > 0) {
  console.log('Testing click on first letter...');
  letterItems[0].click();
  console.log('Click test completed');
}

console.log('=== Debug Complete ===');