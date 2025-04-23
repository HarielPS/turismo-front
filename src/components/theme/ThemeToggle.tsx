'use client';

import { useTheme } from 'next-themes';
import { SunIcon,MoonIcon } from '@heroicons/react/24/solid';

interface ThemeToggleProps {
  alwaysWhite?: boolean;
}

export const ThemeToggle = ({alwaysWhite = false }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-center p-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`${alwaysWhite ? 'text-white' : 'text-text'} px-4 py-2 rounded-xl shadow-text cursor-pointer hover:shadow-accent `}
        >
          {/* Cambiar a {theme === 'dark' ? 'claro' : 'oscuro'} */}
          {theme === 'dark' ? (
            <SunIcon className="w-6 h-6" />
          ) : (
            <MoonIcon className="w-6 h-6" />
          )}
        </button>
    </div>
  );
};
