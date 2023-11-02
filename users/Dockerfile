FROM node:18
COPY . ../.env
WORKDIR /usr/src/app
COPY . ./
RUN npm install
CMD ["node", "index.js"]