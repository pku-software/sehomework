# syntax=docker/dockerfile:1

FROM node:18-alpine AS build

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@7.27.1 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY docs ./docs
COPY vuepress.config.ts ./

RUN pnpm build

FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/docs/.vuepress/dist/ /usr/share/nginx/html/sehomework/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
