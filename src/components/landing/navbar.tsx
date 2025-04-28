'use client';

import React, { useState, useEffect } from 'react';
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import ThemeLogo from "@/components/logo/ThemeLogo";
import { 
    XMarkIcon,
    Bars3Icon,
    HomeIcon,
    InformationCircleIcon,
    MapIcon,
    BuildingOfficeIcon

} from '@heroicons/react/24/solid';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-background-80 shadow-md backdrop-blur' : 'bg-transparent text-white dark:bg-background-60'}`}>
        <div className='flex items-center px-4 py-4'>
          <div className='flex items-center gap-4 w-full'>
            <ThemeLogo href="/" alwaysWhite={!scrolled} />

            <div className='w-full hidden lg:flex'>
              <nav className='flex items-center w-2/3 xl:w-1/3 '>
                <ul className='flex justify-between w-full'>
                  <li><a href="#Inicio">Inicio</a></li>
                  <li><a href="#Datos">Datos</a></li>
                  <li><a href="#Infopage">Descubre Más</a></li>
                  <li><a href="#Pueblos">Pueblos</a></li>
                </ul>
              </nav>

              <div className='ml-auto flex items-center pr-4'>
                <div className='flex items-center justify-center mr-8'>
                  <ThemeToggle alwaysWhite={!scrolled} />
                </div>
                <ul className='flex items-center gap-8'>
                  <li className='border-r border-gray-400 pr-8'>
                    <Link href="/session/Acceso?register=true"  className='cursor-pointer'>Registro</Link>
                  </li>
                  <li>
                    <Link href="/session/Acceso" className='p-3 bg-primary rounded-2xl cursor-pointer text-white'>
                        Acceso
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='flex lg:hidden items-center ml-auto space-x-6'>
            <ThemeToggle alwaysWhite={!scrolled} />
            <button className='lg:hidden cursor-pointer' onClick={() => setMenuOpen(true)}>
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed bg-background w-1/2 min-w-[300px] top-0 left-0 p-6 h-full shadow-md overflow-auto z-50">
            <button
              onClick={() => setMenuOpen(false)}
              className="fixed top-2 right-4 rounded-full bg-background text-text p-3 cursor-pointer z-50"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <ul className='space-y-2'>
                <li className='mb-6'>
                <ThemeLogo href="/" />
                </li>
                <li className='py-3'>
                    <a href='#Inicio' onClick={() => setMenuOpen(false)} className='flex items-center text-text-secondary hover:text-text font-bold text-[15px]'>
                        <HomeIcon className="w-6 h-6 mr-2" />
                        <p>Inicio</p>
                    </a>
                </li>
                <li className=' py-3'>
                    <a href='#Datos' onClick={() => setMenuOpen(false)} className='flex items-center text-text-secondary hover:text-text font-bold text-[15px]'>
                        <InformationCircleIcon className="w-6 h-6 mr-2" />
                        <p>Datos</p>
                    </a>
                </li>
                <li className='py-3'>
                    <a href='#Infopage' onClick={() => setMenuOpen(false)} className='flex items-center text-text-secondary hover:text-text font-bold text-[15px]'>
                        <MapIcon className="w-6 h-6 mr-2" />
                        <p>Descubre Más</p>
                    </a>
                </li>
                <li className=' py-3'>
                    <a href='#Pueblos' onClick={() => setMenuOpen(false)} className='flex items-center text-text-secondary hover:text-text font-bold text-[px]'>
                        <BuildingOfficeIcon className="w-6 h-6 mr-2" />
                        <p>Pueblos</p>
                    </a>
                </li>
            </ul>

            <ul className='mt-4'>
              <li className='py-3'>
                <button className='w-full px-4 py-2.5 text-sm rounded font-bold bg-detail transition-colors cursor-pointer'>
                  Registro
                </button>
              </li>
              <li className='py-3'>
                <Link href="/session/Acceso" className='w-full px-4 py-2.5 text-sm rounded font-bold text-white bg-primary transition-colors cursor-pointer'>
                  Acceso
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
