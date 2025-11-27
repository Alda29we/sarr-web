// Mock data and functions for frontend-only implementation
// Updated to use custom backend API with Resend

export const mockServices = [
  {
    id: 1,
    title: "Mantenimiento de Equipos",
    description: "Servicio profesional de mantenimiento preventivo y correctivo para computadoras, laptops y servidores. Limpieza, optimización y actualización de hardware.",
    icon: "Wrench"
  },
  {
    id: 2,
    title: "Soporte Técnico",
    description: "Asistencia técnica especializada para resolver problemas de software, hardware y configuración. Disponible en sitio o remoto.",
    icon: "Headphones"
  },
  {
    id: 3,
    title: "Redes e Internet",
    category: "Redes e Internet",
    description: "Diseño, implementación y mantenimiento de redes WiFi y cableado estructurado. Configuración de routers, switches y puntos de acceso.",
    icon: "Network"
  },
  {
    id: 4,
    title: "Sistemas CCTV",
    description: "Instalación y configuración de sistemas de videovigilancia IP y analógicos. Monitoreo remoto y grabación continua para tu seguridad.",
    icon: "Camera"
  },
  {
    id: 5,
    title: "Windows Server",
    description: "Administración y configuración de servidores Windows Server. Gestión de dominios, Active Directory y servicios de red.",
    icon: "Server"
  },
  {
    id: 6,
    title: "Seguridad Informática",
    description: "Implementación de soluciones de seguridad, firewall, antivirus empresarial y políticas de protección de datos.",
    icon: "Shield"
  }
];

export const mockLicenses = [
  {
    id: 1,
    category: "Sistemas Operativos",
    items: [
      { name: "Windows 11 Pro", description: "Licencia genuina de por vida" },
      { name: "Windows 11 Home", description: "Licencia genuina de por vida" },
      { name: "Windows 10 Pro", description: "Licencia genuina de por vida" },
      { name: "Windows 10 Home", description: "Licencia genuina de por vida" },
      { name: "Windows Server 2022", description: "Licencia estándar" },
      { name: "Windows Server 2019", description: "Licencia estándar" }
    ]
  },
  {
    id: 2,
    category: "Ofimática",
    items: [
      { name: "Microsoft Office 365", description: "Suscripción anual para 5 dispositivos" },
      { name: "Microsoft Office 2021 Pro Plus", description: "Licencia perpetua" },
      { name: "Microsoft Office 2019 Pro Plus", description: "Licencia perpetua" },
      { name: "Office Home & Business 2021", description: "Licencia para 1 PC" },
      { name: "Microsoft Visio Professional", description: "Licencia perpetua" },
      { name: "Microsoft Project Professional", description: "Licencia perpetua" }
    ]
  },
  {
    id: 3,
    category: "Diseño y CAD",
    items: [
      { name: "AutoCAD 2024", description: "Licencia anual" },
      { name: "AutoCAD LT 2024", description: "Licencia anual" },
      { name: "SketchUp Pro", description: "Licencia anual" },
      { name: "CorelDRAW Graphics Suite", description: "Licencia perpetua" },
      { name: "Adobe Creative Cloud", description: "Suscripción anual" }
    ]
  },
  {
    id: 4,
    category: "Seguridad y Antivirus",
    items: [
      { name: "Kaspersky Total Security", description: "Protección para 5 dispositivos" },
      { name: "ESET NOD32 Antivirus", description: "Licencia para 3 PCs" },
      { name: "Bitdefender Total Security", description: "Protección multi-dispositivo" },
      { name: "Norton 360 Deluxe", description: "5 dispositivos + VPN" },
      { name: "Avast Premium Security", description: "Protección avanzada" },
      { name: "McAfee Total Protection", description: "Dispositivos ilimitados" }
    ]
  },
  {
    id: 5,
    category: "Desarrollo y Bases de Datos",
    items: [
      { name: "Microsoft SQL Server", description: "Licencia estándar" },
      { name: "Visual Studio Professional", description: "Licencia anual" },
      { name: "VMware Workstation Pro", description: "Licencia perpetua" },
      { name: "Adobe Acrobat Pro DC", description: "Suscripción anual" }
    ]
  }
];

// Obtener la URL del API desde variables de entorno
// En desarrollo: http://localhost:3001
// En producción: https://sarr-backend.onrender.com (o tu URL de Render)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Función para enviar formulario de cotización
export const mockSubmitQuoteForm = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return {
        success: true,
        message: data.message || 'Cotización enviada exitosamente'
      };
    } else {
      return {
        success: false,
        message: data.error || 'Error al enviar la cotización. Inténtalo de nuevo.'
      };
    }
  } catch (error) {
    console.error('[API] Error de red al enviar cotización:', error);

    // Verificar si es un error de red
    if (error.message === 'Failed to fetch' || !navigator.onLine) {
      return {
        success: false,
        message: 'Error de conexión. Verifica tu internet e intenta de nuevo.'
      };
    }

    return {
      success: false,
      message: 'Error de conexión con el servidor. Inténtalo más tarde.'
    };
  }
};

// Función para enviar formulario de contacto
export const mockSubmitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return {
        success: true,
        message: data.message || 'Mensaje enviado exitosamente'
      };
    } else {
      return {
        success: false,
        message: data.error || 'Error al enviar el mensaje. Inténtalo de nuevo.'
      };
    }
  } catch (error) {
    console.error('[API] Error de red al enviar mensaje:', error);

    // Verificar si es un error de red
    if (error.message === 'Failed to fetch' || !navigator.onLine) {
      return {
        success: false,
        message: 'Error de conexión. Verifica tu internet e intenta de nuevo.'
      };
    }

    return {
      success: false,
      message: 'Error de conexión con el servidor. Inténtalo más tarde.'
    };
  }
};