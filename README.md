<center>
<h1>StyleHub</h1>

![Captura de pantalla de StyleHub](https://raw.githubusercontent.com/ArturoCarrilloJimenez/StyleHub-Front-Angular/master/images/portada.png)  
</center>


## Descripción

**StyleHub-Front-Angular** es el frontend de un e-commerce de moda desarrollado con **Angular**, diseñado para ofrecer una experiencia de compra moderna y responsiva. La aplicación está desplegada en [https://stylehub-bgor.onrender.com/](https://stylehub-bgor.onrender.com/) y se apoya en **Tailwind CSS** y **Daisy UI** para garantizar una interfaz estética y ligera.

El proyecto surgió como parte de un trabajo de grado superior y actualmente utiliza el **stack MEAN** que incluye también **Docker** y **Nginx** para servir los archivos estáticos.

## Tabla de contenidos

1. [Tecnologías principales](#tecnologías-principales)  
2. [Vista previa](#vista-previa)  
3. [Requisitos previos](#requisitos-previos)  
4. [Instalación y ejecución en desarrollo](#instalación-y-ejecución-en-desarrollo)  
5. [Construcción para producción](#construcción-para-producción)  
6. [Ejecutar con Docker](#ejecutar-con-docker)  
7. [Configuración de Nginx](#configuración-de-nginx)  
8. [Estructura del proyecto](#estructura-del-proyecto)  
Angular 9. [Guía para contribuir](#guía-para-contribuir)  
10. [Licencia](#licencia)  
11. [Contacto](#contacto)  

---

## Tecnologías principales

- **(versión 19)**: Framework de Google que proporciona un sistema de componentes, inyección de dependencias y un robusto ecosistema de pruebas .  
- **TypeScript**: Se emplea tipado estático para mejorar la mantenibilidad y detección temprana de errores en tiempo de compilación.  
- **Tailwind CSS**: Framework de utilidades que permite aplicar estilos directamente en clases HTML, reduciendo el peso del CSS en producción .  
- **Daisy UI**: Complemento para Tailwind que brinda componentes predefinidos (botones, tarjetas, formularios, etc.) y soporte para temas (claro/oscuro) .  
- **Node.js**: Entorno de ejecución y gestor de paquetes requeridos para instalar dependencias y ejecutar scripts de Angular.  
- **Docker**: Utilizado para contenerizar la aplicación en un contenedor ligero basado en **Node.js** durante el build y en **Nginx** para servir contenido estático en producción.
- **CI/CD (GitHub Actions)**: Configurado para automatizar las pruebas, linting y despliegue en **Render.com**.  

---

## Vista previa

![Captura de pantalla de StyleHub](https://raw.githubusercontent.com/ArturoCarrilloJimenez/StyleHub-Front-Angular/master/images/home.png) 
*(Captura de la página principal)*

![Captura de pantalla de StyleHub](https://raw.githubusercontent.com/ArturoCarrilloJimenez/StyleHub-Front-Angular/master/images/product-image.png) 
*(Captura de la página de productos*

![Captura de pantalla de StyleHub](https://raw.githubusercontent.com/ArturoCarrilloJimenez/StyleHub-Front-Angular/master/images/login.png) 
*(Captura del login)*

Puedes acceder a la demo en vivo en:  
> [https://stylehub-bgor.onrender.com/](https://stylehub-bgor.onrender.com/)

---

## Requisitos previos

Antes de iniciar, asegúrate de contar con lo siguiente instalado en tu entorno de desarrollo:

1. **Node.js** y **npm**  
2. **Angular CLI** (instalable globalmente con `npm install -g @angular/cli`)
3. **Docker** (opcional, si vas a ejecutar la aplicación mediante contenedores) 
4. Una versión moderna de **Git** para clonar el repositorio

---

## Instalación y ejecución en desarrollo

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/ArturoCarrilloJimenez/StyleHub-Front-Angular.git
   cd StyleHub-Front-Angular
   ```  

2. **Instalar dependencias**  
   ```bash
   npm install
   ```  
   Instala Angular, Tailwind, Daisy UI, RxJS y demás librerías listadas en `package.json` 

3. **Levantar el servidor de desarrollo**  
   ```bash
   ng serve
   ```  
   - El servidor se ejecutará en `http://localhost:4200/` por defecto.  
   - Cada cambio en archivos `*.ts`, `*.html` o `*.css` recargará la aplicación automáticamente (Hot Module Replacement).

4. **Abrir en el navegador**  
   Navega a `http://localhost:4200/` para interactuar con la app en modo desarrollo

---

## Construcción para producción

Para generar los archivos optimizados listos para despliegue:

```bash
ng build --configuration production
```

- El resultado se ubicará en `dist/StyleHub-Front-Angular/`.  
- El flag `--configuration production` aplica minificación de JavaScript, extracción de CSS y Tree Shaking para reducir el peso

Una vez compilada, puedes servir el contenido estático (por ejemplo, copiando `dist/StyleHub-Front-Angular/` a un servidor web) o usar el contenedor Docker que se describe a continuación.

---

## Ejecutar con Docker

El proyecto incluye un **Dockerfile** que define un contenedor multi-stage para build y producción:

1. **Build de la imagen**  
   ```bash
   docker build -t stylehub-angular:latest .
   ```  
   - El primer stage utiliza una imagen de Node.js para compilar la aplicación Angular (`ng build`).  
   - El segundo stage usa Nginx para servir los archivos estáticos generados.

2. **Ejecutar el contenedor**  
   ```bash
   docker run -d -p 80:80 --name stylehub-app stylehub-angular:latest
   ```  
   - Expone el puerto `80` del contenedor en tu máquina local.  
   - Accede a `http://localhost/` para visualizar la aplicación en el entorno de producción dentro de Docker

3. **Dockerfile (resumen)**  
   ```dockerfile
   # Etapa 1: Build
   FROM node:18-alpine AS build
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci
   COPY . .
   RUN npm run build -- --configuration production

   # Etapa 2: Servir con Nginx
   FROM nginx:alpine
   COPY nginx.conf /etc/nginx/nginx.conf
   COPY --from=build /app/dist/StyleHub-Front-Angular /usr/share/nginx/html
   ```  
   - La configuración personalizada de Nginx (ver sección siguiente) asegura que todas las rutas Angular se resuelvan correctamente

---

## Configuración de Nginx

El archivo `nginx.conf` incluido está preparado para un Single Page Application (SPA) de Angular. A continuación, el contenido clave:

```nginx
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg)$ {
        expires 1M;
        access_log off;
        add_header Cache-Control "public";
    }

    error_page 404 /index.html;
}
```

- **`try_files $uri $uri/ /index.html;`** redirige todas las rutas no encontradas a `index.html`, permitiendo que Angular maneje el enrutamiento en el cliente.  
- Puedes ajustar `server_name` y otras directivas según tu entorno de producción o dominios específicos.

---

## Estructura del proyecto

```
StyleHub-Front-Angular/
├── .github/                    # Workflows de CI/CD (GitHub Actions)
├── .vscode/                    # Configuración recomendada para VSCode
├── images/                     # Imágenes usadas en la documentación (portada, capturas)
├── public/                     # Archivos estáticos públicos (index.html, favicon)
├── src/
│   ├── app/                    # Archivo donde se encuentra todo el código de este, este esta dividido en función de lo que hace (store, admin, auth...)
│   ├── environments/           # Variables de entorno (dev, prod)variables)
│   └── main.ts
├── .editorconfig               # Estándares de formato
├── .gitignore                  # Archivos y carpetas ignorados por Git
├── .postcssrc.json             # Configuración de PostCSS para Tailwind
├── Dockerfile                  # Definición de contenedor multi-stage para producción
├── LICENSE                     # Licencia GPL-3.0
├── README.md                   # Este documento
├── angular.json                # Configuración general de Angular
├── nginx.conf                  # Configuración de Nginx para servir la SPA
├── package.json                # Dependencias, scripts y metadatos del proyecto
├── package-lock.json           # Lockfile generado por npm
├── tsconfig.json               # Configuración global de TypeScript
├── tsconfig.app.json           # Ajustes de TS para la aplicación
├── tsconfig.spec.json          # Ajustes de TS para pruebas
└── todo                         # Lista de tareas pendientes del proyecto
```
 
- **`shared/`**: Componentes genéricos reutilizables en distintas pantallas (botones personalizados, cards, inputs).  
- **`environments/`**: Permite definir variables para entornos de desarrollo y producción (`environment.ts` / `environment.prod.ts`).  

---

## Guía para contribuir

Para mantener la calidad y coherencia del código, siga estas pautas:

1. **Configuración de linters y formateo**  
   - El proyecto utiliza **ESLint** y **Prettier**. Antes de cada commit, ejecute:  
     ```bash
     npm run lint
     npm run format:check
     ``` 

2. **Hooks de pre-commit**  
   - Está configurado un **pre-commit hook** que valida estilos y corre `npm test` para asegurar una cobertura mínima

3. **Flujo de trabajo con Git**  
   - Cree ramas temáticas siguiendo la convención:  
     - `feat/<descripción>` para nuevas funcionalidades  
     - `fix/<descripción>` para correcciones de errores  
     - `chore/<descripción>` para tareas menores o actualizaciones de dependencias  
   - Use **Conventional Commits** en los mensajes (`feat:`, `fix:`, `docs:`, `refactor:`) para una mejor lectura del historial 
   - Abra Pull Requests dirigidos a la rama `dev`, incluyendo descripción clara de cambios, screenshots (si aplica) y cómo probar manualmente el nuevo código

4. **Reporte de Issues**  
   - Los problemas deben documentarse en la sección *Issues* del repositorio, con:  
     - Título descriptivo  
     - Pasos para reproducir el error o describir la mejora  
     - Capturas de pantalla o logs (si es relevante)  
     - Etiquetas apropiadas (`bug`, `enhancement`, `documentation`) 

5. **Cobertura de pruebas**  
   - Se recomienda mantener una cobertura de pruebas ≥ 90% con **Jasmine/Karma** para unit tests y **Cypress** para e2e (si se habilita en el futuro)

---

## Licencia

Este proyecto está licenciado bajo **GPL-3.0**. Consulta el archivo [LICENSE](./LICENSE) para más detalles citeturn1view0.

---

## Contacto

- **Autor**: Arturo Carrillo Jimenez  
- **Sitio web / demo**: [https://stylehub-bgor.onrender.com/](https://stylehub-bgor.onrender.com/)
- **GitHub**: [ArturoCarrilloJimenez](https://github.com/ArturoCarrilloJimenez)  
- **LinkedIn**: [Arturo Carrillo Jimenez](https://www.linkedin.com/in/arturo-carrillo-jimenez/?originalSubdomain=es)
