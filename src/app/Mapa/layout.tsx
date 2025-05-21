"use client";
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import ThemeLogo from '@/components/logo/ThemeLogo';

export default function UsuarioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Sidebar: se queda fija a la izquierda */}
      

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      {/* Botón de tema fijo */}
      <div className="fixed top-4 right-4 z-5">
        <ThemeToggle />
      </div>
    </div>
  );
}
