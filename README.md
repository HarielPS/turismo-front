TURISMO MÁGICO
![Logo](https://github.com/HarielPS/turismo-front/blob/main/public/logos/logo_dark_corto.png?raw=true)

Visit our website [here](https://app.netlify.com/projects/turismoescom/overview)

Turismo Mágico es el primer prototipo de un proyecto que busca resaltar el turismo en los Pueblos Mágicos de México.

La aplicación tiene como objetivo acercar el turismo a los usuarios. A diferencia de otros sitios de reservaciones, que requieren que el usuario ya tenga un destino y actividades en mente, Turismo Mágico, mediante el uso de filtros y herramientas de inteligencia artificial, genera automáticamente un itinerario personalizado con hoteles, restaurantes y actividades según los gustos del usuario.

En este primer prototipo se desarrolló el generador inteligente de itinerarios. Este componente primero filtra las posibles actividades usando un algoritmo KNN, para luego aplicar un algoritmo de mochila (knapsack) y finalmente un algoritmo heurístico (hotmiga) que ajusta las actividades al perfil del usuario.
También se avanzó en gran parte de la interfaz de usuario, así como en el sistema de login y registro de clientes, y algunos elementos del módulo de reservaciones y pagos.

DISEÑO DEL SISTEMA:

![Logo](https://github.com/PedroUgalde/imagenes-/blob/main/cachirul.jpg)

ARQUITECTURA DEL SISTEMA:

![Logo](https://github.com/PedroUgalde/imagenes-/blob/main/arquitectura.jpg)



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

## AUTORES:
* GARCES CHIMALPOPOCA MARIJOSE, github: https://github.com/luuzmendeez
* UGALDE DERBEZ PEDRO DANIEL, github: https://github.com/HarielPS
* PADILLA SÁNCHEZ HARIEL, github: https://github.com/PedroUgalde
