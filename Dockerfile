
FROM bun as build


WORKDIR /app


COPY package.json bun.lockb tsconfig.json ./


RUN bun install


COPY src ./src


RUN bun run build


FROM node:18-alpine as production

WORKDIR /app


COPY --from=build /app /app


RUN curl -fsSL https://bun.sh/install | bash


EXPOSE 3000


CMD ["bun", "src/index.ts"]
