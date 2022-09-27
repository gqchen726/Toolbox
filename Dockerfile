FROM node:12 AS build
WORKDIR /app
COPY package.json webpack.config.js .babelrc ./
COPY conf ./conf
COPY src ./src
RUN npm install \
    && npm run build:package

FROM nginx:alpine
# set file permissions for nginx user
COPY --from=build /app/dist /usr/share/nginx/html
RUN chown -R nginx:nginx /var/cache/nginx /etc/nginx/
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# RUN echo "daemon off;" >> /etc/nginx/conf.d/default.conf
WORKDIR /usr/sbin
CMD [ "nginx" ]