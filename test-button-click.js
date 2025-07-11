// 测试按钮点击功能
// 在浏览器控制台运行

console.log('=== 测试按钮点击功能 ===');

// 找到第一个options页面的按钮
const optionsPage = document.getElementById('options-page');
const buttons = optionsPage.querySelectorAll('button');

console.log('找到', buttons.length, '个按钮');

buttons.forEach((btn, index) => {
  console.log(`按钮 ${index}:`, btn.textContent.trim());
  console.log('  onclick:', btn.onclick ? 'has onclick' : 'no onclick');
  console.log('  disabled:', btn.disabled);
  console.log('  pointer-events:', window.getComputedStyle(btn).pointerEvents);
  console.log('  display:', window.getComputedStyle(btn).display);
});

// 尝试程序化点击第一个按钮
if (buttons.length > 0) {
  const firstButton = buttons[0];
  console.log('尝试程序化点击第一个按钮:', firstButton.textContent.trim());
  
  // 检查onclick函数
  if (firstButton.onclick) {
    console.log('按钮有onclick，尝试调用...');
    try {
      firstButton.onclick();
      console.log('onclick调用成功');
    } catch (e) {
      console.log('onclick调用失败:', e);
    }
  } else {
    console.log('按钮没有onclick属性');
  }
  
  // 尝试click()方法
  console.log('尝试click()方法...');
  try {
    firstButton.click();
    console.log('click()方法调用成功');
  } catch (e) {
    console.log('click()方法调用失败:', e);
  }
}

// 测试事件传播
console.log('\n=== 测试事件传播 ===');
const testButton = buttons[0];
if (testButton) {
  // 添加临时监听器来测试事件传播
  const tempListener = function(e) {
    console.log('临时监听器触发:', e.type, e.target);
  };
  
  testButton.addEventListener('click', tempListener);
  
  // 模拟点击事件
  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true
  });
  
  console.log('分发模拟点击事件...');
  testButton.dispatchEvent(clickEvent);
  
  // 清理
  testButton.removeEventListener('click', tempListener);
}

console.log('=== 测试完成 ===');