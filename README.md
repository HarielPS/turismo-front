TURISMO MÁGICO
![Logo](https://github.com/HarielPS/turismo-front/blob/main/public/logos/logo_dark_corto.png?raw=true)

Turismo Mágico es el primer prototipo de un proyecto que busca resaltar el turismo en los Pueblos Mágicos de México.

La aplicación tiene como objetivo acercar el turismo a los usuarios. A diferencia de otros sitios de reservaciones, que requieren que el usuario ya tenga un destino y actividades en mente, Turismo Mágico, mediante el uso de filtros y herramientas de inteligencia artificial, genera automáticamente un itinerario personalizado con hoteles, restaurantes y actividades según los gustos del usuario.

En este primer prototipo se desarrolló el generador inteligente de itinerarios. Este componente primero filtra las posibles actividades usando un algoritmo KNN, para luego aplicar un algoritmo de mochila (knapsack) y finalmente un algoritmo heurístico (hotmiga) que ajusta las actividades al perfil del usuario.
También se avanzó en gran parte de la interfaz de usuario, así como en el sistema de login y registro de clientes, y algunos elementos del módulo de reservaciones y pagos.

DISEÑO DEL SISTEMA:
![Logo](https://drive.google.com/file/d/1yab8k0g1w9mvY_XGNiWdvYijHa8ZppoT/view?usp=sharing)

![Logo](https://drive.google.com/file/d/1r1grulSx8vb0WbCWvuRbKu0hA6P577G_/view?usp=sharing)



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

REQUERIMIENTOS
Uso de la versión 3.12.1 de anaconda para la parte de pruebas del algoritmo. 

○ Uso de node v20.14.0 para enrutado del sitio. 

○ Uso de versión de python para desarrollo de back end 

○ Uso de React para front end 

○ Uso de Django para conexión del back con el front 

○ Uso de la base de datos en el lenguaje que se proporcione. 

○ Uso de librerías como scikit learn y pytorch para modelos de predicción. 

○ Uso de github para manejo de versiones del proyecto y para organización del proyecto. 

○Uso de paquetería de oficina de google para desarrollo de documentación 

○ Uso de Herramientas de gestión y organización como trello para manejo de actividades 

○ Uso de Herramientas de diseño como figma y starUml. 

○ Uso de plataformas como netlify, azure o google cloud para hostear el sitio  

○ Posible uso de microservicios para implementación de pagos en línea o seguridad web al sitio. 


NOTAS IMPORTANTES ANTES DE CORRER SISTEMA:

- descomente o comente la variable de back que vaya usar una es del local y otra es de el back subido.
- y si es en local primero corra el back (https://github.com/HarielPS/turismo-back) y luego el front(https://github.com/HarielPS/turismo-front/edit/main/README.md).
- .env del back decomente la variable MONGODB_URI de la base de atlas que es la online por que actualmente esta el local y se necesitaria bajar mongodb compass con la base.

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

AUTORES:
-GARCES CHIMALPOPOCA MARIJOSE, github: https://github.com/luuzmendeez/ProyectoBlogs
-UGALDE DERBEZ PEDRO DANIEL, github: https://github.com/HarielPS
-PADILLA SÁNCHEZ HARIEL, github: https://github.com/PedroUgalde

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
