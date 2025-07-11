# Debug 追踪指南

## 当前修复内容

### 修复1: initGrid()逻辑问题 ✅
- **问题**: `initGrid()`中的条件`if (forceReset || currentDay === 1)`会导致即使不想重置，只要currentDay===1就清空grid
- **修复**: 改为只检查`if (forceReset)`

### 修复2: 增强Debug信息 ✅
- 在jumpToPage main-game case中添加了详细的debug信息
- 在tutorial检查前添加了currentDay值的输出

## 测试步骤

请按照以下步骤操作，并查看浏览器Console的debug信息：

### Step 1: 完成intro→D1流程
1. 打开浏览器Console (F12)
2. 从intro page开始
3. 一步一步进入main-game (D1)
4. 观察Console输出，特别注意：
   - `DEBUG: main-game case triggered`
   - `DEBUG: isDayTransition flag =`
   - `DEBUG: currentDay before decision =`
   - `DEBUG: Tutorial check - currentDay =`

### Step 2: D1操作
1. 在D1中拖拽一个`hasFactualError=true`的信件tile到grid
2. 点击Submit进入Daily Recap
3. 完成6步流程（6次NEXT按钮）

### Step 3: 进入D2
1. 观察是否正确进入D2 Morning News
2. 点击"Start Editorial Work"进入D2 main-game
3. **重点观察Console输出**：
   - `DEBUG: startEditorialWork called`
   - `DEBUG: main-game case triggered`
   - `DEBUG: isDayTransition flag =` （应该是true）
   - `DEBUG: currentDay before decision =` （应该是2）
   - `DEBUG: Day transition entry - PRESERVING currentDay =`
   - `DEBUG: Tutorial check - currentDay =` （应该是2）
   - `initGrid: PRESERVING existing tiles`

### Step 4: 检查结果
在D2 main-game中检查：
1. 日期计数器显示是否正确（D2）
2. Tutorial是否显示（不应该显示）
3. Grid中是否有保留的D1 error tiles
4. 尝试移除保留的tiles是否有流血效果

## 关键Debug信息

请特别注意这些Console输出：

1. **isDayTransition标识**：
   ```
   DEBUG: isDayTransition flag = true  // 应该是true
   ```

2. **currentDay值**：
   ```
   DEBUG: currentDay before decision = 2  // 应该是2
   DEBUG: Tutorial check - currentDay = 2  // 应该是2
   ```

3. **Grid保留状态**：
   ```
   initGrid: PRESERVING existing tiles (forceReset=false, currentDay=2)
   ```

4. **Tutorial跳过信息**：
   ```
   DEBUG: Skipping tutorial for Day 2  // 应该看到这个
   ```

## 可能的问题

如果仍然有问题，可能的原因：

1. **isDayTransition标识没有正确设置**
2. **currentDay在某处被重置**
3. **tiles在handleDayTransitionTiles()时没有被正确标记**
4. **有其他地方清空了grid**

请将完整的Console输出提供给我，我会根据实际的执行流程进一步诊断问题。