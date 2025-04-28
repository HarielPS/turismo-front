
"use client";

import { useState, useEffect } from "react";
import LogoutButton from "@/components/sidebar/configuration_user/Button_Logout";

export default function ProveedorLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <>
      <LogoutButton />
      {children}
    </>
  );
}
