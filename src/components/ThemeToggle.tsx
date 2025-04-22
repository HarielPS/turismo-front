'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Esto asegura que el componente se monte en cliente antes de usar `theme`
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-4 right-4 bg-accent text-text px-4 py-2 rounded"
    >
      Cambiar a {theme === 'dark' ? 'claro' : 'oscuro'}
    </button>
  );
};
