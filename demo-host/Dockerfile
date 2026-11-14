FROM node:22-alpine AS widget-builder
WORKDIR /widget
COPY widget/package.json widget/package-lock.json ./
RUN npm ci
COPY widget/tsconfig.json widget/vite.config.ts ./
COPY widget/src ./src
RUN npm run build

FROM nginx:1.27-alpine
COPY demo-host/ /usr/share/nginx/html/
COPY --from=widget-builder /widget/dist/ /usr/share/nginx/html/widget/
