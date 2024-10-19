import { LazySingleton } from 'sleepydogs';

class ThemeManager {
  static #browserCacheKey = 'project-arcturus-user-theme-preference';

  get #systemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  dispatchThemeUpdate(theme) {
    document.querySelector('body').dataset.arcTheme = theme;
    window.localStorage.setItem(ThemeManager.#browserCacheKey, theme);
  }

  #setupInitialTheme() {
    const preference = this.#systemTheme;
    this.dispatchThemeUpdate(preference);
  }

  setupTheme() {
    /** TODO -> remove following short return */
    this.dispatchThemeUpdate('light');
    return;

    const cached = window.localStorage.getItem(ThemeManager.#browserCacheKey);
    if (cached) {
      this.dispatchThemeUpdate(cached);
      return;
    }

    this.#setupInitialTheme();
  }
}

export default LazySingleton(ThemeManager);
