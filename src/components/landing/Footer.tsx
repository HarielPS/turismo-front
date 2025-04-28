"use client";
import Image from "next/image";
import Link from "next/link";
import ThemeLogo from "../logo/ThemeLogo";

const Footer = () => {
  return (
    <div className="mt-20 w-full px-6 py-12 flex flex-col items-center gap-8 text-sm text-text-secondary bg-background">
      <div className="flex flex-col sm:flex-row w-full justify-between gap-10 sm:gap-0">
        {/* Logo y Newsletter */}
        <div className="flex flex-col gap-4 w-full sm:w-2/5">
          <div className="-ml-4">
            <ThemeLogo href="/" />
          </div>
          <p className="font-semibold">Newsletter</p>
          <p className="text-gray-500">
            Subscribe to our newsletter for weekly updates and promotions.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 border rounded-md"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Enlaces de navegación */}
        <div className="hidden sm:flex flex-col gap-1">
          <p className="font-semibold">Product</p>
          <Link href="#" className="hover:text-black">Features</Link>
          <Link href="#" className="hover:text-black">Testimonials</Link>
          <Link href="#" className="hover:text-black">Highlights</Link>
          <Link href="#" className="hover:text-black">Pricing</Link>
          <Link href="#" className="hover:text-black">FAQs</Link>
        </div>

        <div className="hidden sm:flex flex-col gap-1">
          <p className="font-semibold">Company</p>
          <Link href="#" className="hover:text-black">About us</Link>
          <Link href="#" className="hover:text-black">Careers</Link>
          <Link href="#" className="hover:text-black">Press</Link>
        </div>

        <div className="hidden sm:flex flex-col gap-1">
          <p className="font-semibold">Legal</p>
          <Link href="#" className="hover:text-black">Terms</Link>
          <Link href="#" className="hover:text-black">Privacy</Link>
          <Link href="#" className="hover:text-black">Contact</Link>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-t w-full pt-8 gap-4 text-xs">
        <div className="text-center sm:text-left">
          <Link href="#" className="hover:text-black">Privacy Policy</Link>
          <span className="mx-2">•</span>
          <Link href="#" className="hover:text-black">Terms of Service</Link>
          <p className="mt-1">
            © {new Date().getFullYear()} <Link href="https://mui.com/" className="hover:text-black">Sitemark</Link>
          </p>
        </div>
        {/* Aquí podrías insertar íconos si los tienes como SVG o usando react-icons */}
      </div>
    </div>
  );
};

export default Footer;
