FROM node:18 AS build

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npm run build

# Etapa 2: Servir la aplicación
FROM nginx:latest

WORKDIR /usr/share/nginx/html/

COPY --from=build /app/dist/style-hub-front-angular/browser ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
