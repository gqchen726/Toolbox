# syntax=docker/dockerfile:1
FROM nginx
WORKDIR /app/Toolbox
COPY . .
RUN yum install node\
    && npm install --production \
    && npm run build:package \
    && mv /app/Toolbox/dist/* /usr/share/nginx/html/