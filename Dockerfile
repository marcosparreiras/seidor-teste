FROM node:20-alpine3.20 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm ci && npm cache clean --force

FROM node:20-alpine3.20

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./

COPY --from=build /usr/src/app/.env ./

COPY --from=build /usr/src/app/dist ./dist

COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]