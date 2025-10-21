# Usa una imagen base oficial de Node.js v20 (LTS)
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de definición de paquetes de todo el monorepo
COPY package.json package-lock.json ./

# Copia los package.json de los workspaces para optimizar la caché de Docker
COPY apps/platform/package.json ./apps/platform/
COPY apps/landing-page/package.json ./apps/landing-page/
COPY apps/developer-portal/package.json ./apps/developer-portal/
COPY backend/services/service-identity/package.json ./backend/services/service-identity/
# ... (añade una línea por cada app/servicio/paquete) ...

# Instala TODAS las dependencias de los workspaces
RUN npm install

# Copia el resto del código fuente del monorepo
COPY . .

# Construye únicamente la aplicación que quieres servir (ej. 'platform')
RUN npm run build --filter=platform

# Establece el entorno a producción
ENV NODE_ENV=production

# Expone el puerto
EXPOSE 3000

# Comando para iniciar la aplicación (navega a la carpeta de la app)
CMD ["sh", "-c", "cd apps/platform && npm start"]