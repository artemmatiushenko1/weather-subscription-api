FROM node:22.11
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN chmod +x start.sh
CMD ["sh", "/usr/src/app/start.sh"]