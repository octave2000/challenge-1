
FROM node:18-alpine as build


WORKDIR /app


COPY package.json tsconfig.json ./


RUN npm install --no-package-lock


COPY src ./src


RUN npx tsc


FROM node:18-alpine as production

WORKDIR /app


COPY --from=build /app /app


EXPOSE 3000


CMD ["node", "dist/index.js"]
