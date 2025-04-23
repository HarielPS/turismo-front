
import React, { useState, useEffect } from 'react';
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import ThemeLogo  from "@/components/logo/ThemeLogo";
import { useTheme } from 'next-themes';
import { XMarkIcon, Bars3Icon, HomeIcon } from '@heroicons/react/24/solid';


const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30); // cambia el valor según qué tan pronto quieras que cambie
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (

    // <header className='flex py-4 px-4 z-2'>
    <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300  ${scrolled ? 'bg-background-80 shadow-md backdrop-blur' : 'bg-transparent text-white dark:bg-background-60'}`}>
        <div className='flex items-center '>
            <div className='flex items-center gap-4 w-full'>

                {/* Logo de la pagina */}
                <ThemeLogo href="/" alwaysWhite={!scrolled} />

                <div className='w-full hidden lg:flex '>
                    {/* navegacion principal de la Landing */}
                    <nav className=' flex items-center w-1/3'>
                    <ul className='flex justify-between w-full'>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    </nav>

                    {/* Botones de inicio de secion y cambio de tema */}
                    <div className='ml-auto flex items-center pr-4'>
                        <div className='flex items-center justify-center mr-8'>
                            <ThemeToggle alwaysWhite={!scrolled}/>
                        </div>
                        <ul className='flex items-center gap-8 w-full '>
                            <li className='border-r border-gray-400 pr-8'>
                                <a href="#home">Registro</a>
                            </li>
                            <li className='bg-primary p-3 rounded-2xl text-white'>
                                <a href="#about">Acceso</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Menu de navegacion 3 rayas mobile */}
            <div className='flex lg:hidden  items-center ml-auto space-x-6'>
            <ThemeToggle alwaysWhite={!scrolled}/>
            <button className='lg:hidden cursor-pointer' onClick={() => setMenuOpen(true)}>
                <Bars3Icon className="w-6 h-6" />
            </button>
            </div>

            {/* sidebar mobile */}
            <div
            className={`lg:!flex lg:flex-auto lg:ml-12 ${
            !menuOpen ? 'max-lg:hidden' : ''
            } max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-1`}
            >
            {menuOpen && (
                <button
                onClick={() => setMenuOpen(false)}
                className='lg:hidden fixed top-2 right-4 z-4 rounded-full bg-background text-text p-3 cursor-pointer'
                >
                <XMarkIcon className="w-6 h-6" />
                </button>
            )}

            <div className="lg:hidden fixed bg-background w-1/2 min-w-[300px] top-0 left-0 p-6 h-full shadow-md overflow-auto z-3">
            <ul className='space-y-2'>
                <li className='mb-6'>
                <ThemeLogo href="/" />
                </li>
                <li className='py-3'>
                    <a href='#' className='flex items-center text-text-secondary hover:text-text font-bold text-[15px]'>
                        <HomeIcon className="w-6 h-6 mr-2" />
                        <p>Home</p>
                    </a>
                </li>
                <li className=' py-3'>
                    <a href='#' className='flex items-center text-text-secondary hover:text-text font-bold text-[15px]'>
                        <HomeIcon className="w-6 h-6 mr-2" />
                        <p>Home</p>
                    </a>
                </li>
                <li className='py-3'>
                    <a href='#' className='flex items-center text-text-secondary hover:text-text font-bold text-[15px]'>
                        <HomeIcon className="w-6 h-6 mr-2" />
                        <p>Home</p>
                    </a>
                </li>
                <li className=' py-3'>
                    <a href='#' className='flex items-center text-text-secondary hover:text-text font-bold text-[px]'>
                        <HomeIcon className="w-6 h-6 mr-2" />
                        <p>Home</p>
                    </a>
                </li>
            </ul>

            <ul className='mt-4'>
                <li className=' py-3'>
                    <button className='w-full px-4 py-2.5 text-sm rounded font-bold  bg-detail transition-colors cursor-pointer'>
                        Registro
                    </button>
                </li>
                <li className=' py-3'>
                    <button className='w-full px-4 py-2.5 text-sm rounded font-bold text-white bg-primary transition-colors cursor-pointer'>
                        Acceso
                    </button>
                </li>
            </ul>
            </div>

            </div>
        </div>

    </header>
  );
};

export default Navbar;
