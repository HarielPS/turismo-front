'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

/**
 * Este componente solo se utiliza para inicializar el tema en el cliente.
 * 
 */

export default function ThemeInitializer() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'system';
    setTheme(storedTheme);
  }, [setTheme]);

  return null;
}