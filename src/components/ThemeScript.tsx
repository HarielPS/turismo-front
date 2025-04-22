// components/ThemeInitializer.tsx
'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

// Este componente NO renderiza nada, solo sincroniza el tema inicial
export default function ThemeInitializer() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'system';
    setTheme(storedTheme);
  }, [setTheme]);

  return null;
}