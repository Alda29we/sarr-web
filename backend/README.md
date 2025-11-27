# Backend README

## 🚀 SARR Backend API

Backend API para manejar formularios de contacto y cotizaciones usando Resend para envío de emails.

## 📦 Tecnologías

- **Express.js** - Framework web
- **Resend** - Servicio de emails
- **CORS** - Manejo de Cross-Origin requests  
- **express-rate-limit** - Protección contra spam

## 🔧 Instalación Local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
# Copiar ENV_EXAMPLE.txt como .env y configurar

# Iniciar servidor
npm start

# Para desarrollo con auto-reload
npm run dev
```

## 🌍 Variables de Entorno

```env
RESEND_API_KEY=tu_api_key_de_resend
CONTACT_EMAIL=tu_email@ejemplo.com
FRONTEND_URL=http://localhost:3000
PORT=3001
NODE_ENV=development
```

## 📡 Endpoints

### GET /health
Health check del servidor

**Response:**
```json
{
  "status": "ok",
  "service": "SARR Backend API",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

### POST /api/contact
Enviar formulario de contacto

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "phone": "+51 999 999 999",
  "subject": "Consulta sobre servicios",
  "message": "Me gustaría obtener más información..."
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente",
  "id": "email_id_from_resend"
}
```

**Response Error:**
```json
{
  "success": false,
  "error": "Email inválido"
}
```

### POST /api/quote
Enviar solicitud de cotización

**Body:**
```json
{
  "name": "María López",
  "email": "maria@empresa.com",
  "phone": "+51 999 999 999",
  "company": "Mi Empresa SAC",
  "licenses": "Windows 11 Pro, Office 365",
  "message": "Necesito cotización para 10 licencias"
}
```

## 🛡️ Seguridad

- ✅ Rate limiting (5 requests/15 min por IP)
- ✅ Validación estricta de inputs
- ✅ Sanitización de HTML
- ✅ CORS configurado
- ✅ Headers de seguridad

## 📊 Límites

- **Rate Limit:** 5 solicitudes por 15 minutos por IP
- **Resend Free:** 3,000 emails/mes, 100 emails/día
- **Tamaño de campos:** Validación de longitud mínima/máxima

## 🚀 Deploy en Render

Ver [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) en la raíz del proyecto.

## 📝 Logs

El servidor muestra logs detallados:
- ✅ Emails enviados exitosamente
- ❌ Errores de validación
- ❌ Errores de envío de email
- 🔒 Requests bloqueados por rate limiting
