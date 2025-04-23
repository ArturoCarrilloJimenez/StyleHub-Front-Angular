FROM node:22-alpine AS build

WORKDIR /app

COPY package.json /app/

RUN npm install --legacy-peer-deps

RUN npm update

COPY . /app/

RUN npm run build --prod || cat /app/angular.log

# Etapa 2: Servir la aplicación
FROM nginx:latest

WORKDIR /usr/share/nginx/html/

COPY --from=build /app/dist/style-hub-front-angular/browser ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
