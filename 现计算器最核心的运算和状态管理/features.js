// 计算器增强功能

// C-1 优化小数点功能
// 小数点功能已在核心代码中实现，这里添加额外的健壮性检查
function enhanceDecimalPoint() {
    // 检查小数点按钮是否已存在
    const decimalButton = document.getElementById('decimal');
    if (decimalButton && !decimalButton.enhanced) {
        // 移除原有的事件监听（如果有）
        const newDecimalButton = decimalButton.cloneNode(true);
        decimalButton.parentNode.replaceChild(newDecimalButton, decimalButton);
        
        // 添加增强的小数点功能
        newDecimalButton.addEventListener('click', () => {
            if (shouldResetScreen) {
                currentOperand = '0';
                shouldResetScreen = false;
            }
            
            // 确保一个数字中只能有一个小数点
            if (!currentOperand.includes('.')) {
                // 如果当前没有数字，先添加0
                if (currentOperand === '') {
                    currentOperand = '0.';
                } else {
                    currentOperand += '.';
                }
                updateDisplay();
            }
        });
        
        newDecimalButton.enhanced = true;
    }
}

// C-2 实现正负号切换功能
function addSignToggle() {
    // 检查是否已添加正负号按钮
    let signButton = document.getElementById('sign');
    
    if (!signButton) {
        // 创建正负号按钮
        const buttonsContainer = document.querySelector('.buttons');
        const zeroButton = document.getElementById('zero');
        
        signButton = document.createElement('button');
        signButton.className = 'btn function';
        signButton.id = 'sign';
        signButton.textContent = '±';
        
        // 插入到合适的位置（0按钮和小数点按钮之间）
        zeroButton.parentNode.insertBefore(signButton, zeroButton.nextSibling);
        
        // 添加点击事件
        signButton.addEventListener('click', toggleSign);
    }
}

// 正负号切换逻辑
function toggleSign() {
    if (currentOperand !== '0' && currentOperand !== '') {
        if (currentOperand.startsWith('-')) {
            currentOperand = currentOperand.substring(1);
        } else {
            currentOperand = '-' + currentOperand;
        }
        updateDisplay();
    }
}

// C-3 键盘支持功能
function addKeyboardSupport() {
    document.addEventListener('keydown', (event) => {
        // 防止默认行为
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '=', 'Enter', 'Delete', 'Backspace', 'Escape'].includes(event.key)) {
            event.preventDefault();
        }
        
        // 数字键
        if (/[0-9]/.test(event.key)) {
            appendNumber(event.key);
        }
        
        // 小数点
        if (event.key === '.') {
            appendNumber('.');
        }
        
        // 运算符
        if (event.key === '+' || event.key === 'Add') {
            chooseOperation('+');
        }
        if (event.key === '-' || event.key === 'Subtract') {
            chooseOperation('−');
        }
        if (event.key === '*' || event.key === 'Multiply') {
            chooseOperation('×');
        }
        if (event.key === '/' || event.key === 'Divide') {
            chooseOperation('÷');
        }
        
        // 等号
        if (event.key === '=' || event.key === 'Enter') {
            compute();
        }
        
        // 清除
        if (event.key === 'Escape') {
            clear();
        }
        
        // 删除
        if (event.key === 'Delete' || event.key === 'Backspace') {
            deleteNumber();
        }
        
        // 百分比
        if (event.key === '%') {
            calculatePercentage();
        }
    });
}

// C-4 输入异常处理增强
function enhanceErrorHandling() {
    // 重写compute函数以提供更好的错误处理
    const originalCompute = compute;
    
    window.compute = function() {
        try {
            // 检查连续运算符
            if (currentOperand === '' && previousOperand !== '' && operation !== undefined) {
                showError('连续运算符错误');
                return;
            }
            
            originalCompute();
        } catch (error) {
            showError('计算错误');
            console.error('计算错误:', error);
        }
    };
    
    // 重写chooseOperation函数以防止连续运算符
    const originalChooseOperation = chooseOperation;
    
    window.chooseOperation = function(op) {
        // 如果当前没有操作数且没有之前的操作数，不执行任何操作
        if (currentOperand === '' && previousOperand === '') {
            return;
        }
        
        // 如果之前已经有操作但没有新的操作数，更新操作符
        if (currentOperand === '' && previousOperand !== '' && operation !== undefined) {
            operation = op;
            updateDisplay();
            return;
        }
        
        originalChooseOperation(op);
    };
}

// 显示错误信息
function showError(message) {
    currentOperandElement.textContent = 'Error';
    setTimeout(() => {
        currentOperand = '0';
        updateDisplay();
    }, 1500);
}

// 初始化所有增强功能
function initEnhancedFeatures() {
    enhanceDecimalPoint();
    addSignToggle();
    addKeyboardSupport();
    enhanceErrorHandling();
    
    // 确保CSS样式适应新增的按钮
    adjustCSSForSignButton();
}

// 调整CSS以适应新增的正负号按钮
function adjustCSSForSignButton() {
    // 添加用于正负号按钮的样式
    const style = document.createElement('style');
    style.textContent = `
        /* 调整0按钮和新增按钮的样式 */
        #zero {
            grid-column: span 1 !important;
            border-radius: 50% !important;
        }
        
        /* 为正负号按钮添加样式 */
        #sign {
            background-color: #313131;
            color: white;
        }
        
        #sign:hover {
            background-color: #4a4a4a;
        }
        
        #sign:active {
            background-color: #616161;
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(style);
}

// 等待DOM加载完成后初始化增强功能
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancedFeatures);
} else {
    initEnhancedFeatures();
}