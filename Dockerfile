# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python g++ make
WORKDIR /app/Toolbox
COPY . .
RUN npm install --production \
    && npm run build:package \
    && mv /app/Toolbox/dist/* /usr/share/nginx/html/