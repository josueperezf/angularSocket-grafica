# Grafica

1. Creación de una gráfica en Angular

2. Conectar la gráfica por sockets a nuestro backend

3. El backend mantendrá actualizada la data de la gráfica en tiempo real

4. Realizaremos posteos de información mediante un servicio REST

5. La gráfica se mantendrá en sincronía entre todos los usuarios conectados

Esta es otra sección pequeña, pero nos ayudará a mirar otras aplicaciones de sockets, aquí trabajaremos integrando la comunicación en tiempo real con nuestro servidor y nuestra aplicación de Angular para mantener la gráfica actualizada y con sus respectivas animaciones para desplegar información cambiante.

Tras terminar esta sección vamos a comprender cómo implementar sockets para mostrar información en tiempo real, presten mucha atención porque la siguiente sección es una tarea dónde tendrán que hacer algo parecido a esto!

*NOTA:* para este proyecto se uso el mismo archivo websocket.service.ts del proyecto de chat, borrando ciertas cosas

al abrir este proyecto y tener corriendo el backend, probablemente no note que el  grafico haga nada, para que funcione debemos abrir postman, y hacer una peticion post al localhost:5000/grafica/ pasando en el body x-www-form-unlencoded

      *mes* 'puede ser enero, febrero, marzo, abril, mayo, junio y julio'
      *valor* solo numeros preferiblemente numero enteros y de bajo valor para ver el cambio

al hacer la peticion post, nodejs ejecutara el emit, que esta escuchando angular 


## Requerimiento

para que este proyecto funcione, requiere del backend, el cual esta hecho en nodejs

para ejecutar el mismo se deje tener instalado nodemon, typescript y ejecutar en la consola *nodemon dist/*


## plugins requeridos

se uso el boostrap cmd

1. *npm i ngx-socket-io* para el manejo de socket en angular

2. *npm install --save ng2-charts* para manejo de grafica

3. *npm install --save chart.js* para el uso de las graficas

4. *npm i chartjs-plugin-annotation* para las anotaciones o el texto de las graficas
