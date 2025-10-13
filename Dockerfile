# Usa una imagen base con Node.js v22 y Alpine Linux
FROM node:22-alpine

# Instala pnpm globalmente
RUN npm install -g pnpm

# Establece el directorio de trabajo
WORKDIR /app

# Copia TODO el proyecto al contenedor
COPY . .

# Le decimos a pnpm que estamos en un entorno no interactivo
ENV CI=true

# Instala TODAS las dependencias. Esta vez, permitimos que se descarguen de internet.
RUN pnpm install

# Construye la aplicación 'platform-app'
RUN pnpm --filter platform-app build

# Establece el entorno a producción
ENV NODE_ENV=production

# Expone el puerto
EXPOSE 3000

# Comando de inicio explícito para evitar errores de filtro
CMD ["sh", "-c", "cd apps/platform-app && pnpm start"]