FROM node:20-alpine
WORKDIR /
COPY package*.json ./
RUN npm install --production
COPY dist/apps/tasks-ia-koderx-server ./dist/apps/tasks-ia-koderx-server
COPY .env .
EXPOSE 3000
CMD ["node", "dist/apps/tasks-ia-koderx-server/main.js"]