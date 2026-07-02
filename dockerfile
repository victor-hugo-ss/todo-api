# Define a imagem base oficial do Node.js
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o container
COPY package*.json ./
COPY prisma ./prisma

# Instala as dependências da aplicação
RUN npm ci

# gera client durante o build
RUN npx prisma generate

# Copia o restante dos arquivos do projeto para o container
COPY . .

RUN npm run build

# Expõe a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/server.js"]