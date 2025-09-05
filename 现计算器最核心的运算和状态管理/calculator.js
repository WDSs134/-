// 计算器核心逻辑

// 获取DOM元素
const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equal');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const percentButton = document.querySelector('#percent');

// 计算器状态
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;
let lastClearTime = 0;

// 更新显示
function updateDisplay() {
    currentOperandElement.textContent = formatNumber(currentOperand);
    if (operation != null) {
        previousOperandElement.textContent = `${formatNumber(previousOperand)} ${operation}`;
    } else {
        previousOperandElement.textContent = '';
    }
}

// 格式化数字显示
function formatNumber(number) {
    if (number === '') return '';
    
    // 处理小数点
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    
    let integerDisplay;
    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('zh-CN');
    }
    
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    } else {
        return integerDisplay;
    }
}

// 处理数字输入
function appendNumber(number) {
    if (shouldResetScreen) {
        currentOperand = '';
        shouldResetScreen = false;
    }
    
    // 处理小数点逻辑
    if (number === '.' && currentOperand.includes('.')) return;
    
    // 限制最大位数
    if (currentOperand.length >= 12) return;
    
    // 处理前导零
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    
    updateDisplay();
}

// 处理运算符输入
function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    
    // 转换运算符符号
    let displayOp = op;
    if (op === '÷') displayOp = '÷';
    if (op === '×') displayOp = '×';
    if (op === '−') displayOp = '−';
    if (op === '+') displayOp = '+';
    
    operation = displayOp;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

// 核心计算函数
function compute() {
    let computation;
    const prev = parseFloat(previousOperand.replace(/,/g, ''));
    const current = parseFloat(currentOperand.replace(/,/g, ''));
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '÷':
            if (current === 0) {
                alert('除数不能为零');
                return;
            }
            computation = prev / current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '−':
            computation = prev - current;
            break;
        case '+':
            computation = prev + current;
            break;
        default:
            return;
    }
    
    // 处理结果精度
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
    updateDisplay();
}

// 清除功能
function clear() {
    const now = Date.now();
    
    // 快速点击两次重置所有状态
    if (now - lastClearTime < 300) {
        currentOperand = '0';
        previousOperand = '';
        operation = undefined;
        shouldResetScreen = false;
    } else {
        // 点击一次清除当前输入
        currentOperand = '0';
    }
    
    lastClearTime = now;
    updateDisplay();
}

// 删除功能
function deleteNumber() {
    if (currentOperand === '0') return;
    
    currentOperand = currentOperand.slice(0, -1);
    if (currentOperand === '') {
        currentOperand = '0';
    }
    updateDisplay();
}

// 百分比功能
function calculatePercentage() {
    const current = parseFloat(currentOperand.replace(/,/g, ''));
    if (isNaN(current)) return;
    
    currentOperand = (current / 100).toString();
    updateDisplay();
}

// 事件监听器
numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => chooseOperation(button.textContent));
});

equalsButton.addEventListener('click', compute);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
percentButton.addEventListener('click', calculatePercentage);

// 初始化显示
updateDisplay();