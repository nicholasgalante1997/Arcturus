import { createContext, useContext } from 'react';

export interface IThemeContext {
  theme: 'dark' | 'light';
  setTheme(theme: 'dark' | 'light'): void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  setTheme(theme) {
    this.theme = theme;
  }
});

export const useThemeContext = () => useContext(ThemeContext);
