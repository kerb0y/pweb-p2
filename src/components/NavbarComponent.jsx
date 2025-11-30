import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logoGundar from "../assets/logoGundar.svg";

const NavbarComponent = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "text-purple-600 font-bold" : "text-gray-600 hover:text-purple-600";
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoGundar} alt="Logo Gunadarma" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-purple-700 leading-none">GUNADARMA</span>
                <span className="text-xs text-gray-500 font-medium tracking-wider">UNIVERSITY</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive("/")} transition-colors duration-200 text-sm uppercase tracking-wide`}>
              Home
            </Link>
            <Link to="/data_mhs" className={`${isActive("/data_mhs")} transition-colors duration-200 text-sm uppercase tracking-wide`}>
              Data Mahasiswa
            </Link>
            <a href="https://fti.gunadarma.ac.id/" target="_blank" rel="noopener noreferrer">
            <div className="ml-4">
              <span className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 rounded-full shadow-md">
                INFORMATIKA
              </span>
            </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-gray-600 hover:text-purple-600 focus:outline-none p-2"
            >
              {navbarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${navbarOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pt-2 pb-4 space-y-2 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/") === "text-purple-600 font-bold" ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-50 hover:text-purple-600"}`}
            onClick={() => setNavbarOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/data_mhs"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/data_mhs") === "text-purple-600 font-bold" ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-50 hover:text-purple-600"}`}
            onClick={() => setNavbarOpen(false)}
          >
            Data Mahasiswa
          </Link>
          <div className="pt-2">
            <span className="block w-full text-center px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-md shadow-sm">
              INFORMATIKA
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;