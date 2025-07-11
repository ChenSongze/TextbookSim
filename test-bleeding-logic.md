# 流血系统修复验证

## 修复内容总结

### 问题根源
1. `startEditorialWork()`函数错误地重置了`currentDay = 1`
2. 导致从Day 2 morning news回到main-game时，`initGrid()`检测到`currentDay === 1`而清空grid
3. 所有保留的error tiles丢失，无法触发流血效果

### 修复方案
1. **修复`startEditorialWork()`** - 只在真正的首次进入时重置，day transition时保留currentDay
2. **修复`jumpToPage('main-game')`** - 从options直接进入时重置为fresh start
3. **修复`initGrid()`调用** - 根据当前状态决定是否强制重置

### 修复后的逻辑流程

#### 场景1：从Options直接进入main-game
```
Options → jumpToPage('main-game') → 
- currentDay = 1, gameLoopCount = 0 (重置)
- initGrid(true) (强制重置，清空grid)
- ✅ Fresh start，符合预期
```

#### 场景2：Day transition流程
```
Day 1 → Submit Day Report → Daily Recap → 点击6次NEXT → 
- nextDay() → transferUnprocessedEmails() → handleDayTransitionTiles()
- 标记factual error tiles为previousDayError='true'
- showPage('morning-news-page')
- currentDay = 2 (已在nextDay()中递增)

Morning News → Start Editorial Work → startEditorialWork() →
- 检测到currentDay = 2, gameLoopCount = 1，不重置currentDay
- jumpToPage('main-game')
- initGrid(false) (不强制重置，保留tiles)
- ✅ Error tiles保留，可以触发流血效果
```

## 验证步骤

1. **测试fresh start**
   - 从options点击"Editorial Simulator"
   - 确认grid为空，currentDay = 1

2. **测试day transition**
   - Day 1放置有factual error的信件tile
   - 完成daily recap流程（6次NEXT）
   - 确认进入Day 2时tile被保留
   - 尝试移除保留的tile，确认看到流血效果

3. **确认流血效果**
   - 红色背景、模糊效果
   - 蓝色液滴动画
   - 流血音效
   - tile变为不可交互状态

## 代码变更位置

- Line 5451-5459: `startEditorialWork()`条件重置逻辑
- Line 5567-5570: `jumpToPage('main-game')`强制重置逻辑  
- Line 5624-5626: `initGrid()`条件重置逻辑

## 预期结果

流血系统现在应该正常工作：
- Day 1的factual error tiles会在Day 2被保留
- 用户移除这些tiles时会看到流血效果
- Fresh start时grid正确清空
- Day transition时error tiles正确保留