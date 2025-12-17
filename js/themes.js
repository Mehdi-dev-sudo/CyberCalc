export class ThemeManager {
  constructor() {
    this.themes = {
      cyber: {
        '--bg-primary': '#0a0e27',
        '--bg-secondary': '#151932',
        '--bg-tertiary': '#1e2542',
        '--accent-primary': '#00ff88',
        '--accent-secondary': '#00d4ff',
        '--accent-danger': '#ff4757',
        '--text-primary': '#ffffff',
        '--text-secondary': '#a0a8c0',
        '--border-color': 'rgba(0, 255, 136, 0.2)',
      },
      dark: {
        '--bg-primary': '#1a1a2e',
        '--bg-secondary': '#16213e',
        '--bg-tertiary': '#0f3460',
        '--accent-primary': '#e94560',
        '--accent-secondary': '#f39c12',
        '--accent-danger': '#e74c3c',
        '--text-primary': '#ffffff',
        '--text-secondary': '#bdc3c7',
        '--border-color': 'rgba(233, 69, 96, 0.2)',
      },
      light: {
        '--bg-primary': '#f0f0f0',
        '--bg-secondary': '#ffffff',
        '--bg-tertiary': '#e8e8e8',
        '--accent-primary': '#3498db',
        '--accent-secondary': '#9b59b6',
        '--accent-danger': '#e74c3c',
        '--text-primary': '#2c3e50',
        '--text-secondary': '#7f8c8d',
        '--border-color': 'rgba(52, 152, 219, 0.2)',
      },
      nord: {
        '--bg-primary': '#2e3440',
        '--bg-secondary': '#3b4252',
        '--bg-tertiary': '#434c5e',
        '--accent-primary': '#88c0d0',
        '--accent-secondary': '#81a1c1',
        '--accent-danger': '#bf616a',
        '--text-primary': '#eceff4',
        '--text-secondary': '#d8dee9',
        '--border-color': 'rgba(136, 192, 208, 0.2)',
      },
    };

    this.currentTheme = this.loadTheme();
    this.applyTheme(this.currentTheme);
    this.setupEventListeners();
  }

  loadTheme() {
    return localStorage.getItem('calculatorTheme') || 'cyber';
  }

  saveTheme(theme) {
    localStorage.setItem('calculatorTheme', theme);
  }

  applyTheme(themeName) {
    const theme = this.themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    Object.keys(theme).forEach(property => {
      root.style.setProperty(property, theme[property]);
    });

    document.body.dataset.theme = themeName;
    this.currentTheme = themeName;
    this.saveTheme(themeName);
  }

  setupEventListeners() {
    document.querySelectorAll('.theme-card').forEach(card => {
      card.addEventListener('click', () => {
        const theme = card.dataset.theme;
        this.applyTheme(theme);
        document.getElementById('themeModal').style.display = 'none';

        // Add visual feedback
        document.querySelectorAll('.theme-card').forEach(c => {
          c.style.borderColor = 'var(--border-color)';
        });
        card.style.borderColor = 'var(--accent-primary)';
      });
    });

    // Highlight current theme on modal open
    document.getElementById('themeToggle')?.addEventListener('click', () => {
      document.querySelectorAll('.theme-card').forEach(card => {
        if (card.dataset.theme === this.currentTheme) {
          card.style.borderColor = 'var(--accent-primary)';
        } else {
          card.style.borderColor = 'var(--border-color)';
        }
      });
    });
  }
}
