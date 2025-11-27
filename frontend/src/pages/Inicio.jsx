import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Network, Camera, Server, Wrench, Headphones, CheckCircle2 } from 'lucide-react';
import { mockServices } from '../mock';

const Inicio = () => {
  const iconMap = {
    Shield,
    Network,
    Camera,
    Server,
    Wrench,
    Headphones
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-32">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-8 animate-float">
              <img
                src="/images/logo.png"
                alt="SRR Logo"
                className="h-32 w-32 md:h-40 md:w-40 drop-shadow-2xl"
              />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Soluciones Tecnológicas
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
                Profesionales
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Experto en Redes, Seguridad Informática y Soporte Técnico. 
              Ofrecemos servicios de calidad para empresas y particulares.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                to="/servicios"
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 flex items-center space-x-2"
              >
                <span>Ver Servicios</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/licencias"
                className="px-8 py-4 bg-slate-800 text-white rounded-lg font-semibold border-2 border-slate-700 hover:border-orange-400 transition-all duration-300 hover:bg-slate-700"
              >
                Licencias de Software
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Segundo Reyes Rojas
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-orange-400 mx-auto mb-6" />
              <p className="text-lg text-gray-300">
                Técnico en Redes y Seguridad Informática
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Con amplia experiencia en diseño, implementación y mantenimiento de redes seguras, 
                ofrezco soluciones tecnológicas integrales para empresas y particulares.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-300">Administración de Windows Server y sistemas RED HAT</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-300">Configuración de centrales de telefonía IP</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-300">Conexión de redes CCTV y videovigilancia</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-300">Seguridad informática y protección de datos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-gray-400 text-lg">
              Soluciones tecnológicas completas para tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {mockServices.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <div
                  key={service.id}
                  className="group bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/servicios"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold border border-slate-700 hover:border-cyan-400 transition-all duration-300"
            >
              <span>Ver Todos los Servicios</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:250px_250px] animate-shimmer" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Necesitas Asesoría Tecnológica?
            </h2>
            <p className="text-xl mb-8 text-cyan-50">
              Contáctanos hoy y recibe una consulta gratuita sobre tus necesidades de TI
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-cyan-600 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <span>Contactar Ahora</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;