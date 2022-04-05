
import { useState, useEffect } from 'react';


export default function useThemeToggle(){
  const [theme, setTheme] = useState(() => {
		if (import.meta.env.SSR) {
			return undefined;
		}
		if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
			return localStorage.getItem('theme');
		}
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return 'dark';
		}
		return 'light';
	});

	useEffect(() => {
		const root = document.documentElement;
		if (theme === 'light') {
			root.classList.remove('theme-dark');
		} else {
			root.classList.add('theme-dark');
		}
	}, [theme]);

  return {
    theme,
    setTheme
  }
}