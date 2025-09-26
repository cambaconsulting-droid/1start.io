# Usa una imagen oficial de Node.js (la versión 18 que ya usas)
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de definición de paquetes
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de tu proyecto al contenedor
COPY . .