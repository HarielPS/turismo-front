import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';

interface ThemeLogoProps {
  href?: string;
  alwaysWhite?: boolean;
}

const ThemeLogo = ({ href, alwaysWhite = false }: ThemeLogoProps) => {
  const { theme } = useTheme();

  const logoSrc = alwaysWhite
    ? "/logos/logo_dark_largo.png"
    : theme === 'dark'
    ? "/logos/logo_dark_largo.png"
    : "/logos/logo_light_largo.png";

  // const logoContent = (
  //   <img
  //     src={logoSrc}
  //     alt="Logo de la empresa"
  //     className="h-16 lg:h-20 w-auto lg:w-60 object-contain"
  //   />
  // );
  const logoContent = (
    <Image
      src={logoSrc}
      alt="Logo de la empresa"
      width={240} // Ajusta según el ancho real de tu logo
      height={80} // Ajusta según el alto real de tu logo
      className="h-16 lg:h-20 w-auto lg:w-60 object-contain"
      priority // Opcional: para imágenes importantes que deben cargar primero
    />
  );

  return (
    <div className="ml-2 mr-4 lg:mr-20 flex-shrink-0">
      {href ? (
        <Link href={href} className="inline-block">
          {logoContent}
        </Link>
      ) : (
        logoContent
      )}
    </div>
  );
};

export default ThemeLogo;
