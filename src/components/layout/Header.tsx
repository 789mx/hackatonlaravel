import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black shadow-lg shadow-[#333333]/20 py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Logo className="text-[#00FFFF]" />
          <span className="font-bold text-xl text-[#00FFFF]">
            789.mx
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-[#00FFFF] hover:text-[#00CCCC] font-medium transition-colors">
            Inicio
          </Link>
          <Link to="/register" className="text-[#00FFFF] hover:text-[#00CCCC] font-medium transition-colors">
            Registro
          </Link>
          <Link to="/winners" className="text-[#00FFFF] hover:text-[#00CCCC] font-medium transition-colors">
            Ganadores
          </Link>
          <Link
            to="/admin/login"
            className="bg-[#FF00FF] text-white px-4 py-2 rounded-md hover:bg-[#CC00CC] transition-colors"
          >
            Admin
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#00FFFF] hover:text-[#00CCCC] focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-black shadow-lg py-4 px-6 absolute top-full left-0 right-0 z-20 border-t border-[#333333]">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-[#00FFFF] hover:text-[#00CCCC] font-medium transition-colors">
              Inicio
            </Link>
            <Link to="/register" className="text-[#00FFFF] hover:text-[#00CCCC] font-medium transition-colors">
              Registro
            </Link>
            <Link to="/winners" className="text-[#00FFFF] hover:text-[#00CCCC] font-medium transition-colors">
              Ganadores
            </Link>
            <Link
              to="/admin/login"
              className="bg-[#FF00FF] text-white px-4 py-2 rounded-md hover:bg-[#CC00CC] transition-colors inline-block text-center"
            >
              Admin
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;