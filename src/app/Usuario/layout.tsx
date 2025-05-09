"use client";

import LogoutButton from '@/components/perfil/Button_Logout';
import Sidebar from '@/components/perfil/user/sidebar';

export default function UsuarioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar/>
      
      {/* Contenido principal */}
      <div className="flex-1 overflow-auto p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}