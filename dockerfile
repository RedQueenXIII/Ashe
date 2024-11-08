# Dockerfile
# Define a imagem base
FROM node:16

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .


EXPOSE 3000


CMD ["npm", "start"]
