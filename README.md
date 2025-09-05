# 简易计算器应用

## 项目介绍
这是一个功能齐全的简易计算器应用，具有现代UI设计和完整的计算功能。该项目旨在提供一个直观、易用的计算器界面，同时实现各种常见的计算操作。

## 功能列表

### 基础计算功能
- 四则运算：加法、减法、乘法、除法
- 小数点支持
- 百分比计算
- 正负号切换
- 清除和删除功能

### 增强功能
- 计算历史记录保存和显示
- 键盘支持
- 错误处理（如除以零、连续运算符等）
- 响应式设计，适配移动端和桌面端

### 用户体验优化
- 数字格式化（千位分隔符）
- 按钮悬停和点击效果
- 结果精度处理
- 快速清除功能

## 如何使用

### 在线访问
通过以下链接访问已部署的计算器：
https://[username].github.io/simple-calculator

### 本地运行
1. 克隆此仓库
   ```bash
   git clone https://github.com/[username]/simple-calculator.git
   ```

2. 进入项目目录
   ```bash
   cd simple-calculator
   ```

3. 使用任何Web服务器提供文件
   - 使用Python内置服务器
     ```bash
     python -m http.server
     ```
   - 使用Node.js的http-server
     ```bash
     npx http-server
     ```

4. 在浏览器中访问 `http://localhost:8000`（或显示的其他端口）

### 操作说明
- 点击数字按钮输入数字
- 点击运算符按钮选择运算操作
- 点击等号按钮执行计算
- 使用AC按钮清除当前输入或所有状态
- 使用DEL按钮删除最后输入的数字
- 使用±按钮切换正负号
- 使用%按钮将当前数字转换为百分比
- 可以使用键盘输入数字和运算符

## 项目结构

```
├── README.md                 # 项目说明文档
├── 创建计算器的视觉界面和静态交互/  # 前端界面文件
│   ├── index.html            # HTML结构文件
│   └── style.css             # CSS样式文件
├── 现计算器最核心的运算和状态管理/ # 核心逻辑文件
│   ├── calculator.js         # 基础计算功能
│   ├── features.js           # 增强功能
│   └── history.js            # 历史记录功能
└── .github/workflows/        # GitHub Actions工作流
    └── deploy.yml            # 部署配置
```

## 团队成员及分工

| 成员   | 分工                       | 负责文件                         |
| ------ | -------------------------- | -------------------------------- |
| 成员A  | 视觉界面和静态交互         | index.html, style.css            |
| 成员B  | 核心运算和状态管理         | calculator.js                    |
| 成员C  | 增强功能实现               | features.js                      |
| 成员D  | 代码审查、历史记录和部署   | history.js, deploy.yml, README.md |

## 技术栈
- HTML5 - 页面结构
- CSS3 - 样式设计
- JavaScript - 交互逻辑
- GitHub Pages - 项目部署
- GitHub Actions - CI/CD自动化

## 浏览器兼容性
- Chrome (推荐)
- Firefox
- Safari
- Edge
- IE 11+ (部分功能可能受限)

## License
MIT License

## 致谢
感谢所有参与项目开发的团队成员，以及提供技术支持的开源社区。
