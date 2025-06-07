# FROM node:18
FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
# CMD ["node", "src/app.js"]
# CMD ["node", "src/server.js"]
CMD ["npm", "start"]
