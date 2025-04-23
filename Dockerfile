# Etapa 1: Construcción
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npx ng build --configuration=production

# Etapa 2: Servir la aplicación
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist/style-hub-front-angular/browser ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
