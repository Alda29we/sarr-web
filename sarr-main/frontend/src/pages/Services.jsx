import React from 'react';
import { Shield, Network, Camera, Server, Wrench, Headphones, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockServices } from '../mock';

const Services = () => {
  const iconMap = {
    Shield,
    Network,
    Camera,
    Server,
    Wrench,
    Headphones
  };

  const features = [
    'Atención personalizada',
    'Respuesta rápida',
    'Soporte continuo',
    'Precios competitivos',
    'Garantía de servicio',
    'Asesoría gratuita'
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Nuestros <span className="bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">Servicios</span>
            </h1>
            <p className="text-xl text-gray-300">
              Soluciones tecnológicas integrales para empresas y particulares
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {mockServices.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <div
                  key={service.id}
                  className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Icon className="text-white" size={32} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-6 pt-6 border-t border-slate-800">
                        <Link
                          to="/contacto"
                          className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                        >
                          <span>Solicitar servicio</span>
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Por qué elegirnos?
              </h2>
              <p className="text-gray-400 text-lg">
                Compromiso con la excelencia y satisfacción del cliente
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform" size={24} />
                    <span className="text-white font-medium">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:250px_250px] animate-shimmer" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para mejorar tu infraestructura tecnológica?
            </h2>
            <p className="text-xl mb-8 text-cyan-50">
              Contáctanos hoy y recibe una consulta gratuita
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contacto"
                className="px-8 py-4 bg-white text-cyan-600 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Contactar Ahora
              </Link>
              <Link
                to="/licencias"
                className="px-8 py-4 bg-cyan-700 text-white rounded-lg font-bold border-2 border-white/30 hover:bg-cyan-800 transition-all duration-300"
              >
                Ver Licencias
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;