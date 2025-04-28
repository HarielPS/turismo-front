"use client";

import LogoutButton from '@/components/sidebar/configuration_user/Button_Logout'

export default function UsuarioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LogoutButton />
      {children}
    </>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import LogoutButton from '@/components/sidebar/configuration_user/Button_Logout'

// interface TokenPayload {
//   sub: string;
//   role: string;
// }

// export default function UsuarioLayout({ children }: { children: React.ReactNode }) {
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = Cookies.get('token');

//       if (!token) {
//         router.push('/session/Acceso');
//         return;
//       }

//       const decoded = jwtDecode<TokenPayload>(token);

//       if (decoded.role !== "usuario") {
//         router.push('/session/Acceso');
//         return;
//       }

//       // opcional: podrías traer datos del usuario si quieres
//       setLoading(false);
//     };

//     checkAuth();
//   }, [router]);

//   if (loading) return <div>Cargando...</div>;

//   return <>
//     <LogoutButton/>
//     {children}
//     </>;

// }

