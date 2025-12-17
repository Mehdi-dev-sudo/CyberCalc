# 🛡️ CyberCalc Pro

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-00ff88.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-00ff88.svg)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-00d4ff.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/dependencies-0-00ff88.svg)]()
[![Security First](https://img.shields.io/badge/Security-First-00ff88.svg)]()

**A secure, powerful, and beautiful calculator built with Vanilla JavaScript**

*From security to design - everything you expect and more!*

[Live Demo](https://mehdi-khorshidi-far.github.io/cybercalc) ·
[Report Bug](https://github.com/Mehdi-dev-sudo/CyberCalc/issues)

</div>

---

## ✨ Key Features

### 🔒 **Security First**
javascript
❌ No eval() - JavaScript's most dangerous function
✅ Custom parser with Shunting Yard algorithm
✅ Input sanitization
✅ Safe mathematical expression evaluation
✅ Error boundary to prevent crashes

### 🧮 **Three Calculation Modes**

| Mode | Description | Example |
|------|-------------|---------|
| **Basic** | Simple mathematical operations | `2 + 2`, `10 × 5` |
| **Scientific** | Trigonometric, logarithmic functions | `sin(30)`, `log(100)` |
| **Programmer** | Bitwise operations | `5 AND 3`, `8 << 2` |

### 🎨 **4 Beautiful Themes**

<table>
  <tr>
<td align="center">🌌 <b>Cyber</b><br/>(Default)</td>
<td align="center">🌑 <b>Dark</b><br/>(Classic Dark)</td>
  </tr>
  <tr>
<td align="center">☀️ <b>Light</b><br/>(Clean & Bright)</td>
<td align="center">❄️ <b>Nord</b><br/>(Nordic Palette)</td>
  </tr>
</table>

### 📜 **History Management**

- 💾 Auto-save in LocalStorage (up to 50 calculations)
- 📥 Export to JSON
- 🔄 Reuse previous calculations with one click
- 🗑️ Clear with confirmation

### ⌨️ **Full Keyboard Support**


0-9       → Numbers
+, -, *, / → Operators
Enter     → Calculate
Backspace → Delete
Escape    → Clear all

### 📱 **Responsive & Mobile-First**

- ✅ Desktop, Tablet, Mobile
- ✅ Touch-friendly buttons
- ✅ Flexible layout

---

## 🎯 Why CyberCalc?

### For Developers

javascript
// ❌ Wrong way (using eval)
function calculate(expression) {
return eval(expression); // Dangerous!
}

// ✅ Right way (Safe parser)
function calculate(expression) {
const parser = new MathParser();
return parser.parse(expression); // Safe!
}

### Comparison with Other Calculators

| Feature | CyberCalc | Other Calculators |
|---------|---------------|-------------------|
| No eval() | ✅ | ❌ Most use it |
| Custom Parser | ✅ Shunting Yard | ❌ |
| Multiple Themes | ✅ 4 themes | Limited or none |
| History | ✅ With export | Limited |
| Clean Code | ✅ Clean Architecture | Usually single file |
| Tests | ✅ Comprehensive | Usually none |

---

## 🚀 Installation

### Prerequisites

- Modern browser (Chrome, Firefox, Safari, Edge)
- No dependencies or build tools required!

### Method 1: Clone Repository

bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/cybercalc.git

# 2. Navigate to folder
cd cybercalc

# 3. Open in browser
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html

### Method 2: Direct Download

1. Download ZIP from [here](../../archive/refs/heads/main.zip)
2. Extract files
3. Open `index.html` in browser

### Method 3: Live Server

bash
# If you have VS Code
# Install Live Server extension
# Right-click on index.html -> Open with Live Server

---

## 📖 Usage Guide

### Basic Mode


Simple calculations:
2 + 2 = 4
10 - 5 = 5
3 × 4 = 12
15 ÷ 3 = 5
100 % 30 = 30

Order of operations:
2 + 3 × 4 = 14
(2 + 3) × 4 = 20

### Scientific Mode


Trigonometric functions:
sin(30) = 0.5
cos(0) = 1
tan(45) = 1

Logarithms:
log(100) = 2
ln(e) = 1

Power and root:
2^8 = 256
sqrt(16) = 4

### Programmer Mode


Bitwise operations:
5 AND 3 = 1      (0101 & 0011 = 0001)
5 OR 3 = 7       (0101 | 0011 = 0111)
5 XOR 3 = 6      (0101 ^ 0011 = 0110)
NOT 5 = -6       (~0101 = 1010)

Shift operations:
8 << 2 = 32      (1000 << 2 = 100000)
16 >> 2 = 4      (10000 >> 2 = 100)

Modulo:
17 MOD 5 = 2

---

## 🏗️ Project Architecture


cybercalc/
│
├── index.html                 # Main entry point
│
├── css/
│   ├── main.css              # Main styles
│   ├── themes.css            # Theme variables
│   └── animations.css        # Animations & effects
│
├── js/
│   ├── calculator.js         # Calculator core
│   ├── parser.js             # Safe parser (no eval)
│   ├── history.js            # History management
│   └── themes.js             # Theme management
│
├── tests/
│   └── calculator.test.js    # Unit tests
│
├── README.md                 # This file
├── LICENSE                   # MIT License
└── .gitignore               # Ignored files

### Code Architecture

javascript
// Separation of Concerns
┌─────────────────┐
│  index.html     │  ← View Layer
└────────┬────────┘
│
┌────────▼────────┐
│ calculator.js   │  ← Controller Layer
└────────┬────────┘
│
┌────┴────┬────────┬──────────┐
│         │        │          │
┌───▼───┐ ┌───▼──┐ ┌───▼───┐ ┌───▼──┐
│parser │ │history│ │themes │ │utils │
└───────┘ └───────┘ └───────┘ └──────┘
↑ Model Layer

---

## 🔧 Technical Details

### Parser Algorithm (Shunting Yard)

CyberCalc uses the **Shunting Yard** algorithm to parse and evaluate mathematical expressions safely.

#### How it works:

javascript
// 1. Tokenization
"3 + 4 * 2" → [3, '+', 4, '*', 2]

// 2. Infix to Postfix (RPN)
[3, '+', 4, '*', 2] → [3, 4, 2, '*', '+']

// 3. Stack-based evaluation
Stack: [3]
Stack: [3, 4]
Stack: [3, 4, 2]
Stack: [3, 8]      // 4 * 2
Stack: [11]        // 3 + 8
Result: 11

#### Advantages:

- ✅ **Safe**: No eval()
- ✅ **Fast**: O(n) time complexity
- ✅ **Reliable**: Correct operator precedence
- ✅ **Extensible**: Easy to add new functions

### Data Storage

javascript
// LocalStorage Structure
{
  "calculatorHistory": [
{
"id": 1639234567890,
"expression": "2 + 2",
"result": 4,
"timestamp": "2025-12-17T10:30:00.000Z"
}
  ],
  "calculatorTheme": "cyber"
}

### Browser Support

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome | 90+ | ✅ Fully supported |
| Firefox | 88+ | ✅ Fully supported |
| Safari | 14+ | ✅ Fully supported |
| Edge | 90+ | ✅ Fully supported |
| Opera | 76+ | ✅ Fully supported |

---

## 🎨 Customization

### Adding a New Theme

**Step 1:** Define theme in `js/themes.js`:

javascript
this.themes = {
// ... existing themes
matrix: {
'--bg-primary': '#000000',
'--bg-secondary': '#0d0d0d',
'--bg-tertiary': '#1a1a1a',
'--accent-primary': '#00ff00',
'--accent-secondary': '#00cc00',
'--accent-danger': '#ff0000',
'--text-primary': '#00ff00',
'--text-secondary': '#00cc00',
'--border-color': 'rgba(0, 255, 0, 0.2)'
}
};

**Step 2:** Add button in `index.html`:

html
<button class="theme-card" data-theme="matrix">
<div class="theme-preview" style="background: linear-gradient(135deg, #000000, #00ff00)"></div>
<span>Matrix</span>
</button>

### Adding New Function to Parser

javascript
// In parser.js
const FUNCTIONS = {
// ... existing functions
'factorial': (x) => {
if (x < 0 || !Number.isInteger(x)) {
throw new Error('Factorial only for positive integers');
}
let result = 1;
for (let i = 2; i <= x; i++) {
result *= i;
}
return result;
}
};

---

## 🧪 Testing

### Running Tests

bash
# Open tests/calculator.test.js in browser
# Or use Jest:
npm install --save-dev jest
npm test

### Test Coverage

- ✅ Basic operations (40+ tests)
- ✅ Order of operations
- ✅ Decimal numbers
- ✅ Negative numbers
- ✅ Scientific functions
- ✅ Bitwise operations
- ✅ Edge cases
- ✅ Security tests
- ✅ Performance tests

---

## 🤝 Contributing

Contributions are welcome! 🎉

### How to Contribute

1. **Fork** the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open **Pull Request**

### Development Guidelines

javascript
// Code Style
- Use camelCase for variables
- Write comments for complex logic
- Write comprehensive tests
- Update README

// Commit Messages
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: CSS/style changes
refactor: Code refactoring
test: Add tests

---

## 📝 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **Shunting Yard Algorithm**: Edsger Dijkstra
- **Design Inspiration**: Modern calculator interfaces
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) & [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Nord Theme**: [Nord Theme](https://www.nordtheme.com/)

---

## 📊 Project Stats

javascript
{
  "linesOfCode": "2000+",
  "files": 10,
  "fileSize": "~97K",
  "browserSupport": ["Chrome", "Firefox", "Safari", "Edge"],
  "mobileSupport": true,
  "dependencies": 0,
  "buildTools": 0,
  "framework": "Vanilla JavaScript",
  "testCoverage": "Comprehensive"
}

---

## 🔮 Roadmap

### Version 1.1.0
- [ ] More themes (Matrix, Dracula, Solarized)
- [ ] Unit conversion mode
- [ ] PWA support (offline mode)

### Version 1.2.0
- [ ] Graph plotting
- [ ] Currency conversion with API
- [ ] Plugin system for custom functions

### Version 2.0.0
- [ ] Multi-language support
- [ ] Collaborative calculations
- [ ] Desktop app with Electron

---

## 💡 FAQ

**Q: Is this production-ready?**
A: Yes! Code is fully tested and optimized.

**Q: Why not use eval()?**
A: eval() is a major security vulnerability. We built our own safe parser.

**Q: Can I use this commercially?**
A: Yes! MIT License allows commercial use.

**Q: How can I contribute?**
A: Fork, Code, Pull Request! We welcome contributions.

---

## 👨‍💻 Author

**Mehdi Khorshidi Rad**
- GitHub: [@mehdi-khorshidi-far](https://github.com/Mehdi-dev-sudo)
- Telegram: [@Mehdi_ds_KH](https://t.me/Mehdi_ds_KH)
- Email: mehdi.khorshidi9339@gmail.com

---

<div align="center">

### 🌟 If you like this project, give it a ⭐!

**Built with ❤️ and ☕**

---

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)
![Powered by JavaScript](https://img.shields.io/badge/Powered%20by-JavaScript-yellow.svg)
![Security First](https://img.shields.io/badge/Security-First-00ff88.svg)

</div>
