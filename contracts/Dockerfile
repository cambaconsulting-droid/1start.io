# Usa la versión de Node.js consistente con el resto del proyecto
FROM node:20-alpine

# Establece el directorio de trabajo para los contratos
WORKDIR /usr/src/app

# Copia solo los archivos de dependencias de los contratos
COPY package.json ./
# Si en el futuro usas un package-lock.json, también se copiaría aquí
# COPY package-lock.json ./

# Instala las dependencias de Hardhat usando npm
RUN npm install

# Copia el resto de los archivos de los contratos
COPY . .

# Comando por defecto para compilar los contratos
CMD ["npx", "hardhat", "compile"]