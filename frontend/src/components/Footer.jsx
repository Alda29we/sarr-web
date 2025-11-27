import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/images/logo.png"
                alt="SRR Logo"
                className="h-10 w-10"
              />
              <span className="text-lg font-bold text-white">
                SRR <span className="text-cyan-400">Tech</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Técnico en Redes y Seguridad Informática. Soluciones tecnológicas profesionales para tu negocio.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/inicio" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/licencias" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Licencias
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone size={16} className="text-cyan-400" />
                <a href="tel:+51900230747" className="hover:text-cyan-400 transition-colors">
                  +51 900 230 747
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail size={16} className="text-cyan-400" />
                <a href="mailto:aldairreyesrojas55@gmail.com" className="hover:text-cyan-400 transition-colors">
                  aldairreyesrojas55@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <MapPin size={16} className="text-cyan-400 mt-1" />
                <span>Perú</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4">Redes Sociales</h3>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/segundoaldairreyesrojas/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/segundoaldairreyesrojas/profilecard/?igsh=MXR6cDAwdnluNXJiZg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://x.com/AldairReyesRoj1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-sky-500 hover:text-white transition-all duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} SRR Tech - Segundo Reyes Rojas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;