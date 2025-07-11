// 全局按钮无法交互的调试脚本
// 在浏览器控制台中运行这个脚本来诊断问题

console.log('=== 全局按钮交互调试 ===');

// 1. 检查Tutorial状态
console.log('1. Tutorial状态检查:');
console.log('tutorialActive:', typeof tutorialActive !== 'undefined' ? tutorialActive : 'undefined');

const tutorialOverlay = document.getElementById('tutorial-overlay');
console.log('Tutorial overlay存在:', !!tutorialOverlay);
if (tutorialOverlay) {
  console.log('Tutorial overlay display:', tutorialOverlay.style.display);
  console.log('Tutorial overlay computed display:', window.getComputedStyle(tutorialOverlay).display);
  console.log('Tutorial overlay pointer-events:', window.getComputedStyle(tutorialOverlay).pointerEvents);
  console.log('Tutorial overlay z-index:', window.getComputedStyle(tutorialOverlay).zIndex);
}

// 2. 检查页面状态
console.log('\n2. 页面状态检查:');
const optionsPage = document.getElementById('options-page');
console.log('Options page存在:', !!optionsPage);
if (optionsPage) {
  console.log('Options page classes:', optionsPage.className);
  console.log('Options page pointer-events:', window.getComputedStyle(optionsPage).pointerEvents);
  console.log('Options page display:', window.getComputedStyle(optionsPage).display);
  console.log('Options page visibility:', window.getComputedStyle(optionsPage).visibility);
  console.log('Options page z-index:', window.getComputedStyle(optionsPage).zIndex);
}

// 3. 检查body状态
console.log('\n3. Body状态检查:');
console.log('Body pointer-events:', window.getComputedStyle(document.body).pointerEvents);
console.log('Body classes:', document.body.className);

// 4. 检查高Z-index元素
console.log('\n4. 高Z-index元素检查:');
const allElements = document.querySelectorAll('*');
const highZIndexElements = [];
allElements.forEach(el => {
  const zIndex = parseInt(window.getComputedStyle(el).zIndex);
  if (zIndex > 5000) {
    highZIndexElements.push({
      element: el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.split(' ').join('.') : ''),
      zIndex: zIndex,
      display: window.getComputedStyle(el).display,
      pointerEvents: window.getComputedStyle(el).pointerEvents,
      position: window.getComputedStyle(el).position
    });
  }
});
console.log('高Z-index元素 (>5000):', highZIndexElements);

// 5. 检查Options页面的具体按钮
console.log('\n5. Options页面按钮检查:');
const optionsButtons = document.querySelectorAll('#options-page button');
console.log('Options页面按钮数量:', optionsButtons.length);
optionsButtons.forEach((btn, index) => {
  console.log(`按钮${index}:`, {
    text: btn.textContent.trim().substring(0, 20),
    display: window.getComputedStyle(btn).display,
    pointerEvents: window.getComputedStyle(btn).pointerEvents,
    zIndex: window.getComputedStyle(btn).zIndex,
    disabled: btn.disabled,
    onclick: btn.onclick ? 'has onclick' : 'no onclick'
  });
});

// 6. 检查全局事件监听器
console.log('\n6. 全局事件监听器检查:');
console.log('Document上的事件监听器数量:', getEventListeners ? Object.keys(getEventListeners(document)).length : 'getEventListeners不可用');
console.log('Body上的事件监听器数量:', getEventListeners ? Object.keys(getEventListeners(document.body)).length : 'getEventListeners不可用');

// 7. 检查可能的覆盖层
console.log('\n7. 可能的覆盖层检查:');
const overlaySelectors = [
  '#tutorial-overlay',
  '#tutorial-highlight', 
  '#tutorial-progress',
  '.snow-background',
  '[style*="position: fixed"]',
  '[style*="position: absolute"]'
];

overlaySelectors.forEach(selector => {
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    console.log(`${selector}:`, elements.length, '个元素');
    elements.forEach((el, index) => {
      const styles = window.getComputedStyle(el);
      console.log(`  ${index}: display=${styles.display}, pointerEvents=${styles.pointerEvents}, zIndex=${styles.zIndex}`);
    });
  }
});

// 8. 测试一个按钮的点击
console.log('\n8. 测试按钮点击:');
const testButton = document.querySelector('#options-page button');
if (testButton) {
  console.log('测试按钮文本:', testButton.textContent.trim());
  console.log('测试按钮位置:', testButton.getBoundingClientRect());
  
  // 模拟点击
  console.log('模拟点击...');
  testButton.click();
  console.log('点击完成');
}

// 9. 检查是否有阻止默认行为的监听器
console.log('\n9. 检查点击位置:');
document.addEventListener('click', function(e) {
  console.log('全局点击监听器捕获到点击:', {
    target: e.target,
    currentTarget: e.currentTarget,
    eventPhase: e.eventPhase,
    defaultPrevented: e.defaultPrevented,
    cancelable: e.cancelable
  });
}, true);

console.log('=== 调试完成 ===');
console.log('现在点击任何按钮，观察控制台输出');