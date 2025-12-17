import { MathParser } from './parser.js';
import { HistoryManager } from './history.js';
import { ThemeManager } from './themes.js';

class Calculator {
  constructor() {
    this.parser = new MathParser();
    this.historyManager = new HistoryManager();
    this.themeManager = new ThemeManager();

    this.currentMode = 'basic';
    this.expression = '';
    this.lastResult = 0;
    this.memory = 0;
    this.isResultDisplayed = false;

    this.init();
  }

  init() {
    this.setupElements();
    this.renderButtons();
    this.attachEventListeners();
    this.updateDisplay();
  }

  setupElements() {
    this.expressionDisplay = document.getElementById('expression');
    this.resultDisplay = document.getElementById('result');
    this.errorDisplay = document.getElementById('error');
    this.buttonsGrid = document.getElementById('buttonsGrid');
    this.modeIndicator = document.querySelector('.mode-indicator');
    this.memoryIndicator = document.querySelector('.memory-indicator');
  }

  renderButtons() {
    const layouts = {
      basic: [
        { label: 'C', type: 'function', action: 'clear', class: 'function' },
        {
          label: '⌫',
          type: 'function',
          action: 'backspace',
          class: 'function',
        },
        { label: '%', type: 'operator', value: '/100*', class: 'operator' },
        { label: '÷', type: 'operator', value: '/', class: 'operator' },

        { label: '7', type: 'number', value: '7' },
        { label: '8', type: 'number', value: '8' },
        { label: '9', type: 'number', value: '9' },
        { label: '×', type: 'operator', value: '*', class: 'operator' },

        { label: '4', type: 'number', value: '4' },
        { label: '5', type: 'number', value: '5' },
        { label: '6', type: 'number', value: '6' },
        { label: '-', type: 'operator', value: '-', class: 'operator' },

        { label: '1', type: 'number', value: '1' },
        { label: '2', type: 'number', value: '2' },
        { label: '3', type: 'number', value: '3' },
        { label: '+', type: 'operator', value: '+', class: 'operator' },

        { label: '0', type: 'number', value: '0', class: 'zero' },
        { label: '.', type: 'number', value: '.' },
        { label: '=', type: 'function', action: 'calculate', class: 'equals' },
      ],
      scientific: [
        { label: 'C', type: 'function', action: 'clear', class: 'function' },
        {
          label: '⌫',
          type: 'function',
          action: 'backspace',
          class: 'function',
        },
        {
          label: 'MC',
          type: 'function',
          action: 'memoryClear',
          class: 'function',
        },
        {
          label: 'M+',
          type: 'function',
          action: 'memoryAdd',
          class: 'function',
        },

        {
          label: 'sin',
          type: 'function',
          action: 'function',
          value: 'sin(',
          class: 'operator',
        },
        {
          label: 'cos',
          type: 'function',
          action: 'function',
          value: 'cos(',
          class: 'operator',
        },
        {
          label: 'tan',
          type: 'function',
          action: 'function',
          value: 'tan(',
          class: 'operator',
        },
        { label: 'π', type: 'number', value: Math.PI.toString() },

        {
          label: '√',
          type: 'function',
          action: 'function',
          value: 'sqrt(',
          class: 'operator',
        },
        { label: '^', type: 'operator', value: '^', class: 'operator' },
        {
          label: 'ln',
          type: 'function',
          action: 'function',
          value: 'ln(',
          class: 'operator',
        },
        {
          label: 'log',
          type: 'function',
          action: 'function',
          value: 'log(',
          class: 'operator',
        },

        { label: '7', type: 'number', value: '7' },
        { label: '8', type: 'number', value: '8' },
        { label: '9', type: 'number', value: '9' },
        { label: '÷', type: 'operator', value: '/', class: 'operator' },

        { label: '4', type: 'number', value: '4' },
        { label: '5', type: 'number', value: '5' },
        { label: '6', type: 'number', value: '6' },
        { label: '×', type: 'operator', value: '*', class: 'operator' },

        { label: '1', type: 'number', value: '1' },
        { label: '2', type: 'number', value: '2' },
        { label: '3', type: 'number', value: '3' },
        { label: '-', type: 'operator', value: '-', class: 'operator' },

        { label: '(', type: 'operator', value: '(' },
        { label: ')', type: 'operator', value: ')' },
        { label: '0', type: 'number', value: '0' },
        { label: '+', type: 'operator', value: '+', class: 'operator' },

        { label: '.', type: 'number', value: '.' },
        {
          label: '=',
          type: 'function',
          action: 'calculate',
          class: 'equals',
          colspan: 3,
        },
      ],
      programmer: [
        {
          label: 'HEX',
          type: 'function',
          action: 'modeHex',
          class: 'function',
        },
        {
          label: 'DEC',
          type: 'function',
          action: 'modeDec',
          class: 'function',
        },
        {
          label: 'BIN',
          type: 'function',
          action: 'modeBin',
          class: 'function',
        },
        { label: 'C', type: 'function', action: 'clear', class: 'function' },

        { label: 'AND', type: 'operator', value: '&', class: 'operator' },
        { label: 'OR', type: 'operator', value: '|', class: 'operator' },
        { label: 'XOR', type: 'operator', value: '^', class: 'operator' },
        { label: 'NOT', type: 'function', action: 'not', class: 'operator' },

        { label: '<<', type: 'operator', value: '<<', class: 'operator' },
        { label: '>>', type: 'operator', value: '>>', class: 'operator' },
        { label: 'MOD', type: 'operator', value: '%', class: 'operator' },
        {
          label: '⌫',
          type: 'function',
          action: 'backspace',
          class: 'function',
        },

        { label: '7', type: 'number', value: '7' },
        { label: '8', type: 'number', value: '8' },
        { label: '9', type: 'number', value: '9' },
        { label: '÷', type: 'operator', value: '/', class: 'operator' },

        { label: '4', type: 'number', value: '4' },
        { label: '5', type: 'number', value: '5' },
        { label: '6', type: 'number', value: '6' },
        { label: '×', type: 'operator', value: '*', class: 'operator' },

        { label: '1', type: 'number', value: '1' },
        { label: '2', type: 'number', value: '2' },
        { label: '3', type: 'number', value: '3' },
        { label: '-', type: 'operator', value: '-', class: 'operator' },

        { label: '0', type: 'number', value: '0', class: 'zero' },
        { label: '.', type: 'number', value: '.' },
        { label: '=', type: 'function', action: 'calculate', class: 'equals' },
      ],
    };

    const layout = layouts[this.currentMode];
    this.buttonsGrid.innerHTML = '';

    layout.forEach(btn => {
      const button = document.createElement('button');
      button.className = `calc-btn ${btn.class || ''}`;
      button.textContent = btn.label;
      button.dataset.type = btn.type;
      button.dataset.value = btn.value || '';
      button.dataset.action = btn.action || '';

      if (btn.colspan) {
        button.style.gridColumn = `span ${btn.colspan}`;
      }

      button.addEventListener('click', () => this.handleButtonClick(btn));
      this.buttonsGrid.appendChild(button);
    });
  }

  handleButtonClick(btn) {
    this.hideError();

    if (btn.type === 'function') {
      this.handleFunction(btn.action);
    } else if (btn.type === 'number') {
      this.handleNumber(btn.value);
    } else if (btn.type === 'operator') {
      this.handleOperator(btn.value);
    }

    this.updateDisplay();
  }

  handleNumber(value) {
    if (this.isResultDisplayed) {
      this.expression = '';
      this.isResultDisplayed = false;
    }

    // Prevent multiple decimals in one number
    const lastNumber = this.expression.split(/[\+\-\*\/\^\(\)]/).pop();
    if (value === '.' && lastNumber.includes('.')) {
      return;
    }

    this.expression += value;
  }

  handleOperator(value) {
    if (this.isResultDisplayed) {
      this.expression = this.lastResult.toString();
      this.isResultDisplayed = false;
    }

    // Prevent multiple operators
    if (this.expression.length === 0 && value !== '-') return;

    const lastChar = this.expression[this.expression.length - 1];
    if ('+-*/^'.includes(lastChar) && '+-*/^'.includes(value)) {
      this.expression = this.expression.slice(0, -1);
    }

    this.expression += value;
  }

  handleFunction(action) {
    switch (action) {
      case 'clear':
        this.expression = '';
        this.lastResult = 0;
        this.isResultDisplayed = false;
        break;

      case 'backspace':
        if (!this.isResultDisplayed) {
          this.expression = this.expression.slice(0, -1);
        }
        break;

      case 'calculate':
        this.calculate();
        break;

      case 'function':
        if (this.isResultDisplayed) {
          this.expression = '';
          this.isResultDisplayed = false;
        }
        this.expression += arguments[1] || '';
        break;

      case 'memoryClear':
        this.memory = 0;
        this.updateMemoryIndicator();
        break;

      case 'memoryAdd':
        this.memory += this.lastResult;
        this.updateMemoryIndicator();
        break;

      case 'memoryRecall':
        if (this.isResultDisplayed) {
          this.expression = '';
          this.isResultDisplayed = false;
        }
        this.expression += this.memory.toString();
        break;

      default:
        console.warn('Unknown function:', action);
    }
  }

  calculate() {
    if (!this.expression) return;

    try {
      // Replace user-friendly symbols with parser-compatible ones
      let parsedExpression = this.expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, Math.PI.toString());

      const result = this.parser.parse(parsedExpression);

      // Format result
      let formattedResult = result;
      if (Math.abs(result) < 1e-10) {
        formattedResult = 0;
      } else if (!Number.isInteger(result)) {
        formattedResult = parseFloat(result.toFixed(10));
      }

      this.lastResult = formattedResult;
      this.isResultDisplayed = true;

      // Add to history
      this.historyManager.add(this.expression, formattedResult);

      this.expression = formattedResult.toString();
    } catch (error) {
      this.showError(error.message);
    }
  }

  updateDisplay() {
    if (this.isResultDisplayed) {
      this.expressionDisplay.textContent = '';
      this.resultDisplay.textContent = this.formatNumber(this.lastResult);
    } else {
      this.expressionDisplay.textContent = this.expression || '';
      this.resultDisplay.textContent = this.expression || '0';
    }
  }

  formatNumber(num) {
    if (Math.abs(num) >= 1e9 || (Math.abs(num) < 1e-6 && num !== 0)) {
      return num.toExponential(6);
    }
    return num.toString();
  }

  showError(message) {
    this.errorDisplay.textContent = `⚠️ ${message}`;
    this.errorDisplay.style.display = 'block';

    setTimeout(() => this.hideError(), 3000);
  }

  hideError() {
    this.errorDisplay.style.display = 'none';
  }

  updateMemoryIndicator() {
    if (this.memory !== 0) {
      this.memoryIndicator.style.display = 'flex';
    } else {
      this.memoryIndicator.style.display = 'none';
    }
  }

  attachEventListeners() {
    // Mode switching
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        document
          .querySelectorAll('.mode-btn')
          .forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        this.currentMode = e.target.dataset.mode;
        this.modeIndicator.textContent = `${this.currentMode.toUpperCase()} MODE`;
        this.renderButtons();
        this.expression = '';
        this.updateDisplay();
      });
    });

    // History toggle
    document.getElementById('historyToggle').addEventListener('click', () => {
      const panel = document.getElementById('historyPanel');
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
      this.historyManager.render();
    });

    // Keyboard support
    document.addEventListener('keydown', e => {
      if (e.key >= '0' && e.key <= '9') {
        this.handleNumber(e.key);
        this.updateDisplay();
      } else if (e.key === '.') {
        this.handleNumber('.');
        this.updateDisplay();
      } else if ('+-*/'.includes(e.key)) {
        this.handleOperator(e.key);
        this.updateDisplay();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        this.calculate();
        this.updateDisplay();
      } else if (e.key === 'Backspace') {
        this.handleFunction('backspace');
        this.updateDisplay();
      } else if (e.key === 'Escape') {
        this.handleFunction('clear');
        this.updateDisplay();
      }
    });

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
      document.getElementById('themeModal').style.display = 'flex';
    });

    document.getElementById('closeThemeModal').addEventListener('click', () => {
      document.getElementById('themeModal').style.display = 'none';
    });
  }
}

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Calculator();
});
