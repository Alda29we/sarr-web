require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 3001;

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting: máximo 5 solicitudes por 15 minutos por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 solicitudes
  message: { 
    success: false, 
    error: 'Demasiadas solicitudes. Por favor espera unos minutos antes de intentar de nuevo.' 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Función de validación para formulario de contacto
const validateContactForm = (data) => {
  const { name, email, phone, subject, message } = data;
  
  // Validar nombre
  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 100) {
    return { valid: false, error: 'El nombre debe tener entre 2 y 100 caracteres' };
  }
  
  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email) || email.length > 255) {
    return { valid: false, error: 'Email inválido' };
  }
  
  // Validar teléfono
  if (!phone || typeof phone !== 'string' || phone.length < 7 || phone.length > 20) {
    return { valid: false, error: 'Teléfono inválido (7-20 caracteres)' };
  }
  
  // Validar asunto
  if (!subject || typeof subject !== 'string' || subject.trim().length < 5 || subject.length > 200) {
    return { valid: false, error: 'El asunto debe tener entre 5 y 200 caracteres' };
  }
  
  // Validar mensaje
  if (!message || typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) {
    return { valid: false, error: 'El mensaje debe tener entre 10 y 5000 caracteres' };
  }
  
  return { valid: true };
};

// Función de validación para formulario de cotización
const validateQuoteForm = (data) => {
  const { name, email, phone, licenses } = data;
  
  // Validar campos básicos
  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 100) {
    return { valid: false, error: 'El nombre debe tener entre 2 y 100 caracteres' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email) || email.length > 255) {
    return { valid: false, error: 'Email inválido' };
  }
  
  if (!phone || typeof phone !== 'string' || phone.length < 7 || phone.length > 20) {
    return { valid: false, error: 'Teléfono inválido' };
  }
  
  if (!licenses || typeof licenses !== 'string' || licenses.trim().length < 3 || licenses.length > 500) {
    return { valid: false, error: 'Especifica las licencias que necesitas (3-500 caracteres)' };
  }
  
  return { valid: true };
};

// Sanitizar datos para prevenir XSS
const sanitizeHtml = (text) => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br>');
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'SARR Backend API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Endpoint raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'SARR Backend API',
    endpoints: {
      health: '/health',
      contact: 'POST /api/contact',
      quote: 'POST /api/quote'
    }
  });
});

// Endpoint para formulario de contacto
app.post('/api/contact', limiter, async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Validar datos
    const validation = validateContactForm(req.body);
    if (!validation.valid) {
      return res.status(400).json({ 
        success: false, 
        error: validation.error 
      });
    }
    
    // Preparar contenido del email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #475569; }
          .value { color: #1e293b; }
          .footer { background: #e2e8f0; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin:0;">📧 Nuevo Mensaje de Contacto</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">👤 Nombre:</span>
              <div class="value">${sanitizeHtml(name)}</div>
            </div>
            <div class="field">
              <span class="label">📧 Email:</span>
              <div class="value">${sanitizeHtml(email)}</div>
            </div>
            <div class="field">
              <span class="label">📞 Teléfono:</span>
              <div class="value">${sanitizeHtml(phone)}</div>
            </div>
            <div class="field">
              <span class="label">📋 Asunto:</span>
              <div class="value">${sanitizeHtml(subject)}</div>
            </div>
            <div class="field">
              <span class="label">💬 Mensaje:</span>
              <div class="value">${sanitizeHtml(message)}</div>
            </div>
          </div>
          <div class="footer">
            <p>Enviado desde: ${req.ip || 'IP desconocida'}</p>
            <p>Fecha: ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Enviar email con Resend
    const { data, error } = await resend.emails.send({
      from: 'SARR Tech <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'aldairreyesrojas55@gmail.com'],
      subject: `[Contacto Web] ${subject}`,
      html: emailHtml,
      reply_to: email
    });

    if (error) {
      console.error('❌ Error al enviar email:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'No se pudo enviar el mensaje. Por favor intenta de nuevo.' 
      });
    }

    console.log('✅ Email enviado exitosamente:', data.id);
    res.json({ 
      success: true, 
      message: 'Mensaje enviado correctamente. Te contactaremos pronto.',
      id: data.id
    });
    
  } catch (error) {
    console.error('❌ Error en servidor:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor. Por favor intenta más tarde.' 
    });
  }
});

// Endpoint para cotizaciones de licencias
app.post('/api/quote', limiter, async (req, res) => {
  try {
    const { name, email, phone, company, licenses, message } = req.body;
    
    // Validar datos
    const validation = validateQuoteForm(req.body);
    if (!validation.valid) {
      return res.status(400).json({ 
        success: false, 
        error: validation.error 
      });
    }
    
    // Preparar contenido del email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316 0%, #06b6d4 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #475569; }
          .value { color: #1e293b; }
          .highlight { background: #fef3c7; padding: 10px; border-left: 4px solid #f59e0b; margin: 15px 0; }
          .footer { background: #e2e8f0; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin:0;">💼 Nueva Solicitud de Cotización</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">👤 Nombre:</span>
              <div class="value">${sanitizeHtml(name)}</div>
            </div>
            <div class="field">
              <span class="label">📧 Email:</span>
              <div class="value">${sanitizeHtml(email)}</div>
            </div>
            <div class="field">
              <span class="label">📞 Teléfono:</span>
              <div class="value">${sanitizeHtml(phone)}</div>
            </div>
            <div class="field">
              <span class="label">🏢 Empresa:</span>
              <div class="value">${sanitizeHtml(company || 'No especificada')}</div>
            </div>
            <div class="highlight">
              <span class="label">📦 Licencias solicitadas:</span>
              <div class="value" style="margin-top:5px;">${sanitizeHtml(licenses)}</div>
            </div>
            ${message ? `
            <div class="field">
              <span class="label">💬 Mensaje adicional:</span>
              <div class="value">${sanitizeHtml(message)}</div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>Enviado desde: ${req.ip || 'IP desconocida'}</p>
            <p>Fecha: ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Enviar email con Resend
    const { data, error } = await resend.emails.send({
      from: 'SARR Tech <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'aldairreyesrojas55@gmail.com'],
      subject: `[Cotización] ${licenses.substring(0, 50)}...`,
      html: emailHtml,
      reply_to: email
    });

    if (error) {
      console.error('❌ Error al enviar cotización:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'No se pudo enviar la cotización' 
      });
    }

    console.log('✅ Cotización enviada:', data.id);
    res.json({ 
      success: true, 
      message: 'Cotización enviada correctamente. Nos pondremos en contacto contigo pronto.',
      id: data.id
    });
    
  } catch (error) {
    console.error('❌ Error en servidor:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor' 
    });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    availableEndpoints: ['GET /health', 'POST /api/contact', 'POST /api/quote']
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('🚀 ========================================');
  console.log(`✅ SARR Backend API corriendo en puerto ${PORT}`);
  console.log(`📧 Resend API Key configurada: ${process.env.RESEND_API_KEY ? '✓' : '✗'}`);
  console.log(`📬 Email de contacto: ${process.env.CONTACT_EMAIL || 'No configurado'}`);
  console.log(`🌍 Permitiendo CORS desde: ${process.env.FRONTEND_URL || 'Todos los orígenes'}`);
  console.log('🚀 ========================================');
});
