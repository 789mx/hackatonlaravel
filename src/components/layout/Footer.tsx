import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-[#00FFFF] pt-12 pb-6 border-t border-[#333333]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="https://789.mx/img/logo789bonito.png" 
                alt="789.mx Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-[#00FFFF]">
              En 789 buscamos tu mejor versión, por lo cual, somos tu mejor opción. ¡Hacemos crecer tu marca!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#00FFFF] hover:text-[#00CCCC] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-[#00FFFF] hover:text-[#00CCCC] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-[#00FFFF] hover:text-[#00CCCC] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-[#00FFFF] hover:text-[#00CCCC] transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#00FFFF]">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#00FFFF] hover:text-[#00CCCC] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-[#00FFFF] hover:text-[#00CCCC] transition-colors">
                  Registro
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-[#00FFFF] hover:text-[#00CCCC] transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#00FFFF]">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin size={20} className="text-[#00FFFF]" />
                <span className="text-[#00FFFF]">Ciudad de México, México</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={20} className="text-[#00FFFF]" />
                <span className="text-[#00FFFF]">+52 (55) 1234 5678</span>
              </li>
            </ul>
          </div>

          {/* Organizers */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#00FFFF]">Organizadores</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail size={18} className="text-[#00FFFF] mt-1 flex-shrink-0" />
                <div className="text-[#00FFFF]">
                  <p className="font-medium">Mariana</p>
                  <a href="mailto:project.managers@tigears.com" className="text-sm hover:text-[#00CCCC]">
                    project.managers@tigears.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={18} className="text-[#00FFFF] mt-1 flex-shrink-0" />
                <div className="text-[#00FFFF]">
                  <p className="font-medium">Simón</p>
                  <a href="mailto:simon.credi@789.mx" className="text-sm hover:text-[#00CCCC]">
                    simon.credi@789.mx
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={18} className="text-[#00FFFF] mt-1 flex-shrink-0" />
                <div className="text-[#00FFFF]">
                  <p className="font-medium">Fernando</p>
                  <a href="mailto:fernando.hernandez@tigears.com" className="text-sm hover:text-[#00CCCC]">
                    fernando.hernandez@tigears.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={18} className="text-[#00FFFF] mt-1 flex-shrink-0" />
                <div className="text-[#00FFFF]">
                  <p className="font-medium">Adela</p>
                  <a href="mailto:adela@789.mx" className="text-sm hover:text-[#00CCCC]">
                    adela@789.mx
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-[#333333] my-6" />

        <div className="text-center text-[#00FFFF]">
          <p>&copy; {new Date().getFullYear()} 789.mx. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;