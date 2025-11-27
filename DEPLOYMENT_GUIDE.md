# 🚀 Guía de Implementación y Deployment - SARR Backend + Frontend

## 📋 Tabla de Contenidos
1. [Testing Local](#testing-local)
2. [Configurar Resend](#configurar-resend)
3. [Deploy en Render](#deploy-en-render)
4. [Verificación Post-Deploy](#verificación-post-deploy)
5. [Troubleshooting](#troubleshooting)

---

## 🧪 Testing Local

### Paso 1: Instalar Dependencias del Backend

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Deberías ver instalados: express, cors, dotenv, express-rate-limit, resend
```

### Paso 2: Configurar Variables de Entorno del Backend

```bash
# En la carpeta backend, crear archivo .env
# Copiar el contenido de ENV_EXAMPLE.txt

# Para testing local, puedes usar temporalmente:
RESEND_API_KEY=re_123_temporal  # Reemplazar con tu API key real
CONTACT_EMAIL=aldairreyesrojas55@gmail.com
FRONTEND_URL=http://localhost:3000
PORT=3001
NODE_ENV=development
```

### Paso 3: Iniciar el Backend

```bash
# Desde la carpeta backend
npm start

# Deberías ver:
# ✅ SARR Backend API corriendo en puerto 3001
# 📧 Resend API Key configurada: ✓
```

### Paso 4: Probar el Backend

Abre otra terminal y prueba:

```bash
# Test de salud
curl http://localhost:3001/health

# Deberías recibir:
# {"status":"ok","service":"SARR Backend API","timestamp":"..."}
```

### Paso 5: Configurar Frontend

```bash
# En una nueva terminal, navegar a frontend
cd frontend

# Crear archivo .env (copiar de ENV_EXAMPLE.txt)
echo "REACT_APP_API_URL=http://localhost:3001" > .env

# Instalar dependencias (si no están instaladas)
npm install

# Iniciar frontend
npm start
```

### Paso 6: Probar Formularios

1. Abre http://localhost:3000 en tu navegador
2. Ve a la página de Contacto
3. Llena el formulario
4. Envía
5. Verifica que recibes el email en tu bandeja de entrada

---

## 🔑 Configurar Resend

### Paso 1: Crear Cuenta en Resend

1. Ve a https://resend.com
2. Clic en "Sign Up"
3. Registrarte con tu email
4. Confirma tu email

### Paso 2: Obtener API Key

1. Una vez dentro, ve a **API Keys** en el menú izquierdo
2. Clic en **Create API Key**
3. Nombre: "SARR Production"
4. Permisos: **Sending access**
5. Clic en **Create**
6. **IMPORTANTE:** Copia la API key inmediatamente (solo se muestra una vez)
7. Guárdala en un lugar seguro

Ejemplo de API key: `re_123abc456def789`

### Paso 3: Verificar Límites

Con el plan gratuito obtienes:
- ✅ **3,000 emails/mes**
- ✅ **100 emails/día**
- ✅ Sin tarjeta de crédito requerida

### Paso 4: (Opcional) Configurar Dominio Personalizado

Si tienes un dominio:
1. Ve a **Domains** en Resend
2. Clic en **Add Domain**
3. Ingresa tu dominio (ejemplo: `srrtech.com`)
4. Sigue las instrucciones para agregar registros DNS
5. Una vez verificado, actualiza en `server.js`:

```javascript
// Cambiar de:
from: 'SARR Tech <onboarding@resend.dev>'

// A:
from: 'SARR Tech <contacto@tudominio.com>'
```

---

## 🌐 Deploy en Render

### Opción A: Deploy Automático con GitHub

#### Paso 1: Subir Código a GitHub

```bash
# En la raíz del proyecto
git add .
git commit -m "Add backend with Resend integration"
git push origin main
```

#### Paso 2: Conectar Render con GitHub

1. Ve a https://render.com
2. Clic en **Sign Up** o **Log In**
3. Conecta tu cuenta de GitHub
4. Autoriza Render

#### Paso 3: Crear Servicios desde render.yaml

1. En Render Dashboard, clic en **New** → **Blueprint**
2. Selecciona tu repositorio
3. Render detectará automáticamente `render.yaml`
4. Revisa los servicios:
   - ✅ sarr-backend (Node.js)
   - ✅ sarr-frontend (Static Site)
5. Clic en **Apply**

#### Paso 4: Configurar Variables de Entorno del Backend

1. Ve al servicio **sarr-backend**
2. Clic en **Environment**
3. Agregar la variable más importante:
   - Key: `RESEND_API_KEY`
   - Value: `re_TU_API_KEY_DE_RESEND`
4. Verificar las demás variables (ya deberían estar de render.yaml):
   - `CONTACT_EMAIL=aldairreyesrojas55@gmail.com`
   - `FRONTEND_URL=https://sarr-frontend.onrender.com`
   - `NODE_ENV=production`
5. Clic en **Save Changes**

#### Paso 5: Esperar Deploy

- Backend tardará ~2-5 minutos
- Frontend tardará ~3-7 minutos
- Puedes ver los logs en tiempo real

---

### Opción B: Deploy Manual

Si no quieres usar GitHub:

#### Backend:

1. Render → **New** → **Web Service**
2. Conectar repositorio o subir código
3. Configuración:
   - **Name:** sarr-backend
   - **Environment:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Plan:** Free
4. Agregar variables de entorno (mismo que arriba)
5. Clic en **Create Web Service**

#### Frontend:

1. Render → **New** → **Static Site**
2. Conectar repositorio
3. Configuración:
   - **Name:** sarr-frontend
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/build`
   - **Plan:** Free
4. Variables de entorno:
   - `REACT_APP_API_URL=https://sarr-backend.onrender.com`
5. Clic en **Create Static Site**

---

## ✅ Verificación Post-Deploy

### 1. Verificar Backend

```bash
# Reemplaza con tu URL de Render
curl https://sarr-backend.onrender.com/health

# Deberías recibir:
# {"status":"ok","service":"SARR Backend API",...}
```

### 2. Verificar Frontend

1. Abre tu URL de frontend: `https://sarr-frontend.onrender.com`
2. Navega a la página de Contacto
3. Llena y envía el formulario
4. Deberías recibir el email en pocos segundos

### 3. Verificar Emails en Resend

1. Ve a https://resend.com/emails
2. Deberías ver los emails enviados
3. Verifica que el estado sea **Delivered**

### 4. Monitorear Logs

En Render Dashboard:
- **Backend:** Ve a sarr-backend → Logs
- Deberías ver: `✅ Email enviado exitosamente`
- Si hay errores, aparecerán aquí

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'resend'"

**Solución:**
```bash
cd backend
npm install resend
```

### Error: "RESEND_API_KEY is not defined"

**Solución:** Verificar que la variable esté configurada en Render:
1. sarr-backend → Environment
2. Agregar `RESEND_API_KEY` con tu API key
3. Guardar y hacer redeploy

### Error: "CORS policy" en el navegador

**Solución:** Verificar que `FRONTEND_URL` en el backend apunte a la URL correcta del frontend.

### Backend se suspende (Free plan de Render)

**Problema:** Render suspende servicios gratuitos después de 15 min de inactividad.

**Soluciones:**
1. **Aceptar la latencia:** El primer request tardará ~30s mientras el servidor se reactiva
2. **Usar un ping service:** Configurar cron-job.org para hacer ping cada 10 minutos
3. **Upgrade a plan de pago:** $7/mes para mantener activo 24/7

### Emails no llegan

**Checklist:**
1. ✅ Verificar API key en Resend dashboard
2. ✅ Revisar logs del backend en Render
3. ✅ Verificar carpeta de spam
4. ✅ Confirmar que no excediste el límite de 100 emails/día
5. ✅ Verificar en Resend dashboard el status del email

### Rate Limiting bloqueando usuarios legítimos

**Solución:** Ajustar en `server.js`:
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,  // Aumentar de 5 a 10
  message: { error: '...' }
});
```

---

## 📊 Monitoreo y Métricas

### En Resend Dashboard

- **Emails Sent:** Cuántos emails has enviado
- **Delivery Rate:** % de emails entregados exitosamente
- **Bounce Rate:** % de emails rebotados

### En Render Dashboard

- **Logs:** Ver errores en tiempo real
- **Metrics:** CPU, memoria, requests
- **Events:** Deploy history

---

## 🔐 Seguridad Post-Deploy

### Checklist:

- [x] API Key de Resend configurada como variable de entorno (no en código)
- [x] CORS configurado solo para tu dominio
- [x] Rate limiting activado (5 requests/15min)
- [x] Headers de seguridad configurados (CSP, XSS, etc.)
- [x] Validación de inputs en backend
- [x] Sanitización de HTML en emails
- [ ] Configurar dominio personalizado con SSL

---

## 📞 Soporte

Si tienes problemas:

1. **Logs del Backend:** Render → sarr-backend → Logs
2. **Logs del Frontend:** Browser DevTools → Console
3. **Resend Support:** https://resend.com/support
4. **Render Support:** https://render.com/docs

---

## 🎉 ¡Listo!

Tu aplicación ahora tiene:
- ✅ Backend propio con API segura
- ✅ 3,000 emails gratis al mes con Resend
- ✅ Rate limiting y validación
- ✅ Headers de seguridad
- ✅ Deploy automático en Render
- ✅ Sin dependencia de Formspree

**Próximos pasos recomendados:**
1. Configurar dominio personalizado
2. Agregar Google Analytics
3. Implementar reCAPTCHA v3
4. Configurar backup de emails
