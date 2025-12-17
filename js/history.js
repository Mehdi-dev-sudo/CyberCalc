export class HistoryManager {
  constructor() {
    this.history = this.loadHistory();
    this.maxItems = 50;
    this.setupEventListeners();
  }

  loadHistory() {
    try {
      const saved = localStorage.getItem('calculatorHistory');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load history:', error);
      return [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  }

  add(expression, result) {
    const item = {
      id: Date.now(),
      expression: expression,
      result: result,
      timestamp: new Date().toISOString(),
    };

    this.history.unshift(item);

    // Limit history size
    if (this.history.length > this.maxItems) {
      this.history = this.history.slice(0, this.maxItems);
    }

    this.saveHistory();
    this.render();
  }

  clear() {
    if (confirm('Are you sure you want to clear all history?')) {
      this.history = [];
      this.saveHistory();
      this.render();
    }
  }

  export() {
    const data = this.history.map(item => ({
      expression: item.expression,
      result: item.result,
      date: new Date(item.timestamp).toLocaleString(),
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calculator-history-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  render() {
    const container = document.getElementById('historyList');

    if (this.history.length === 0) {
      container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>No calculations yet</p>
                </div>
            `;
      return;
    }

    container.innerHTML = this.history
      .map(
        item => `
            <div class="history-item" data-id="${item.id}">
                <div class="history-expression">${this.escapeHtml(
                  item.expression
                )}</div>
                <div class="history-result">= ${this.formatResult(
                  item.result
                )}</div>
                <div class="history-time">${this.formatTime(
                  item.timestamp
                )}</div>
            </div>
        `
      )
      .join('');

    // Add click listeners to history items
    container.querySelectorAll('.history-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = parseInt(item.dataset.id);
        const historyItem = this.history.find(h => h.id === id);
        if (historyItem) {
          this.useHistoryItem(historyItem);
        }
      });
    });
  }

  useHistoryItem(item) {
    // Dispatch custom event to calculator
    const event = new CustomEvent('useHistoryItem', {
      detail: { expression: item.expression, result: item.result },
    });
    document.dispatchEvent(event);
  }

  formatResult(result) {
    if (typeof result === 'number') {
      if (
        Math.abs(result) >= 1e9 ||
        (Math.abs(result) < 1e-6 && result !== 0)
      ) {
        return result.toExponential(6);
      }
      return result.toString();
    }
    return result;
  }

  formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;

    return date.toLocaleDateString();
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  setupEventListeners() {
    document.getElementById('clearHistory')?.addEventListener('click', () => {
      this.clear();
    });

    document.getElementById('exportHistory')?.addEventListener('click', () => {
      this.export();
    });

    // Listen for history item usage
    document.addEventListener('useHistoryItem', e => {
      const calc = window.calculator;
      if (calc) {
        calc.expression = e.detail.result.toString();
        calc.updateDisplay();
      }
    });
  }
}
