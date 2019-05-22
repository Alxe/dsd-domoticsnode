# MiSensores

Ejercicio práctico para la asignatura Desarrollo de Sistemas Distribuidos de la Universidad de Granada

## Descripción de la Práctica

La práctica consiste en el diseño y desarrollo de un sistema cliente-servidor basado en comunicación a través de canales bidireccionales.

Concretamente, se realiza el modelizaje de un sistema de hogar inteligente, donde existen unos sensores y actuadores, cuyo estado puede ser consultado (o ellos mismos, periodicamente, publicando su estado), así como poder accionar los actuadores y cambiarlos de estado.

## Desarrollo de la Práctica

La práctica se ha llevado a cabo con el framework NodeJS en mente, y el ecosistema de Javascript, a través de un navegador web para la visualización e interacción con los componentes.

Concretamente para esta práctica, además, se ha optado por usar TypeScript (superconjunto de ECMAScript desarrollado por Microsoft) para dotar de un poderoso sistema de tipado gradual, agilizando el aprendizaje y dando unos cimientos más sólidos. También se ha usado otras herramientas para facilitar un hipotético trabajo futuro, como puede ser:

- Express: Framework para NodeJS que permite un sistema más sencillo de integración de plantillas, enrutamiento...
- Nunjucks: Motor de plantillas en Javascript con sintáxis de Jinja/Liquid.
- Socket.io: Abstracción de WebSockets o TCP como método de comunicación basado en canales.
- Mongoose: Capa de validación y modelizaje para MongoDB, permitiendo ser más estrictos con la estructura de los datos a almacenar.

## Ejecución

Partiendo de una instalación válida de NodeJS (v10), NPM (6.4.x), MongoDB (4.x), podemos lanzar el servidor con versión en producción a través de `$ npm install && npm run prod`

## Uso

Cada página web simula un componente. De base, existen tres enlaces en la navegación de la página, dos de ellos puramente con carácter de simulación.

- *Monitor*: Permite la monitorización en tiempo real de cambios en el sistema.
- *(Editable)*: Página que permite simular la edición de los sensores y actuadores
- *(Agent)*: Página que permite simular le presencia de un agente inteligente que nos proporciona agencia indirecta sobre el estado de los actuadores