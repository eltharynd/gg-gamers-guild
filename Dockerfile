FROM node:20.11.0

WORKDIR /usr/local/app
COPY . .

WORKDIR /usr/local/app/interfaces
RUN npm install
RUN npm run build
RUN npm link

WORKDIR /usr/local/app/frontend
RUN npm install
RUN npm link gg-gamers-guild-interfaces
RUN npm run build

WORKDIR /usr/local/app
RUN npm install
RUN npm link gg-gamers-guild-interfaces
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]