// 计算历史记录功能

// 存储历史记录的数组
let history = [];
const MAX_HISTORY_ITEMS = 20; // 最大历史记录数量

// 初始化历史记录功能
function initHistory() {
    // 创建历史记录区域
    createHistoryElement();
    
    // 监听计算完成事件以记录历史
    listenForCalculation();
    
    // 加载保存的历史记录
    loadHistory();
}

// 创建历史记录元素
function createHistoryElement() {
    // 检查历史记录元素是否已存在
    if (document.getElementById('history-container')) {
        return;
    }
    
    // 创建历史记录容器
    const historyContainer = document.createElement('div');
    historyContainer.id = 'history-container';
    
    // 创建历史记录标题和切换按钮
    const historyHeader = document.createElement('div');
    historyHeader.className = 'history-header';
    
    const historyTitle = document.createElement('h3');
    historyTitle.textContent = '计算历史';
    
    const toggleButton = document.createElement('button');
    toggleButton.id = 'history-toggle';
    toggleButton.textContent = '隐藏';
    toggleButton.addEventListener('click', toggleHistory);
    
    const clearHistoryButton = document.createElement('button');
    clearHistoryButton.id = 'clear-history';
    clearHistoryButton.textContent = '清空';
    clearHistoryButton.addEventListener('click', clearAllHistory);
    
    historyHeader.appendChild(historyTitle);
    historyHeader.appendChild(clearHistoryButton);
    historyHeader.appendChild(toggleButton);
    
    // 创建历史记录列表
    const historyList = document.createElement('div');
    historyList.id = 'history-list';
    
    // 添加到计算器容器
    historyContainer.appendChild(historyHeader);
    historyContainer.appendChild(historyList);
    
    const calculator = document.querySelector('.calculator');
    document.body.insertBefore(historyContainer, calculator);
    
    // 添加历史记录样式
    addHistoryStyles();
}

// 添加历史记录相关样式
function addHistoryStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* 历史记录容器样式 */
        #history-container {
            background-color: #1c1c1e;
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            width: 320px;
            max-width: 100%;
            margin-bottom: 20px;
            color: white;
        }
        
        /* 历史记录标题样式 */
        .history-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .history-header h3 {
            margin: 0;
            font-size: 18px;
            color: rgba(255, 255, 255, 0.9);
        }
        
        /* 历史记录按钮样式 */
        #history-toggle,
        #clear-history {
            background-color: #313131;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        #history-toggle:hover,
        #clear-history:hover {
            background-color: #4a4a4a;
        }
        
        /* 历史记录列表样式 */
        #history-list {
            max-height: 300px;
            overflow-y: auto;
        }
        
        /* 历史记录项样式 */
        .history-item {
            padding: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        
        .history-item:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }
        
        .history-item:last-child {
            border-bottom: none;
        }
        
        .history-expression {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 5px;
        }
        
        .history-result {
            font-size: 18px;
            color: white;
            font-weight: 500;
        }
        
        /* 响应式调整 */
        @media (max-width: 600px) {
            body {
                flex-direction: column;
            }
            
            #history-container,
            .calculator {
                width: 90%;
                max-width: 320px;
            }
        }
    `;
    document.head.appendChild(style);
}

// 监听计算完成事件
function listenForCalculation() {
    // 保存原始的compute函数
    const originalCompute = compute;
    
    // 重写compute函数以记录历史
    window.compute = function() {
        // 保存计算前的操作数和运算符
        const beforePrevOperand = previousOperand;
        const beforeOperation = operation;
        const beforeCurrentOperand = currentOperand;
        
        // 执行原始计算
        const result = originalCompute();
        
        // 只有当计算成功且有结果时才记录历史
        if (beforePrevOperand !== '' && beforeOperation !== undefined && beforeCurrentOperand !== '') {
            // 格式化表达式
            const expression = `${formatNumber(beforePrevOperand)} ${beforeOperation} ${formatNumber(beforeCurrentOperand)}`;
            const result = currentOperand;
            
            // 添加到历史记录
            addHistoryItem(expression, result);
        }
        
        return result;
    };
}

// 添加历史记录项
function addHistoryItem(expression, result) {
    // 创建历史记录对象
    const historyItem = {
        expression: expression,
        result: result,
        timestamp: new Date().toISOString()
    };
    
    // 添加到历史记录数组开头
    history.unshift(historyItem);
    
    // 限制历史记录数量
    if (history.length > MAX_HISTORY_ITEMS) {
        history = history.slice(0, MAX_HISTORY_ITEMS);
    }
    
    // 更新显示
    updateHistoryDisplay();
    
    // 保存历史记录
    saveHistory();
}

// 更新历史记录显示
function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    if (!historyList) return;
    
    // 清空现有内容
    historyList.innerHTML = '';
    
    // 添加所有历史记录项
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const expressionElement = document.createElement('div');
        expressionElement.className = 'history-expression';
        expressionElement.textContent = item.expression + ' =';
        
        const resultElement = document.createElement('div');
        resultElement.className = 'history-result';
        resultElement.textContent = item.result;
        
        historyItem.appendChild(expressionElement);
        historyItem.appendChild(resultElement);
        
        // 添加点击事件以重用该计算
        historyItem.addEventListener('click', () => {
            // 将结果设为当前操作数
            currentOperand = item.result.replace(/,/g, '');
            shouldResetScreen = false;
            updateDisplay();
        });
        
        historyList.appendChild(historyItem);
    });
}

// 切换历史记录显示/隐藏
function toggleHistory() {
    const historyList = document.getElementById('history-list');
    const toggleButton = document.getElementById('history-toggle');
    
    if (historyList && toggleButton) {
        if (historyList.style.display === 'none') {
            historyList.style.display = 'block';
            toggleButton.textContent = '隐藏';
        } else {
            historyList.style.display = 'none';
            toggleButton.textContent = '显示';
        }
    }
}

// 清空所有历史记录
function clearAllHistory() {
    history = [];
    updateHistoryDisplay();
    saveHistory();
}

// 保存历史记录到localStorage
function saveHistory() {
    try {
        localStorage.setItem('calculatorHistory', JSON.stringify(history));
    } catch (error) {
        console.error('保存历史记录失败:', error);
    }
}

// 从localStorage加载历史记录
function loadHistory() {
    try {
        const savedHistory = localStorage.getItem('calculatorHistory');
        if (savedHistory) {
            history = JSON.parse(savedHistory);
            updateHistoryDisplay();
        }
    } catch (error) {
        console.error('加载历史记录失败:', error);
        history = [];
    }
}

// 等待DOM加载完成后初始化历史记录功能
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHistory);
} else {
    initHistory();
}