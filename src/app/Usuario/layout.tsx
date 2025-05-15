"use client";

import LogoutButton from '@/components/perfil/Button_Logout';
import Sidebar from '@/components/perfil/user/sidebar';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export default function UsuarioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Sidebar: se queda fija a la izquierda */}
      <div className="sticky top-0 h-full z-5">
        <Sidebar />
      </div>

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
