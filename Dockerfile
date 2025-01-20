
FROM node:18-alpine as build


WORKDIR /app


COPY package.json package-lock.json tsconfig.json ./


RUN npm install


COPY src ./src


RUN npx tsc


FROM node:18-alpine as production


WORKDIR /app

COPY --from=build /app /app


EXPOSE 3000


CMD ["node", "dist/index.js"]
