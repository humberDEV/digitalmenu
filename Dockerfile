# Usa la versión que tienes en tu Mac
FROM node:22.5.1

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json e instala dependencias primero (para cache)
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

# Expón el puerto (ajusta si usas otro)
EXPOSE 3000

# Comando por defecto
CMD ["npm", "run", "dev"]
