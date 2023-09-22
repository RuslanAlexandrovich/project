FROM node:18.2-alpine as build

WORKDIR /source
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine as release

COPY .nginx/nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /source/build/ /usr/share/nginx/html/

EXPOSE 3000 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

