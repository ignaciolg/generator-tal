# generator-tal 

> Generator for BBC TAL framework

## Instalación

Para poder usar el generador primero debemos de tener instalado Node.js y NPM. En el caso de no tenerlo instalado podemos seguir las instrucciones de https://nodejs.org/en/ para descargar la última versión.

A continuación, debemos de instalar las siguientes dependencias:

```bash
npm install –g yo
```

Ahora tendremos que instalar el generador desde la carpeta generator-tal que podemos encontrar en el CD/USB:

```bash
cp -R /media/cdrom/generator-tal /tmp/
cd /tmp/generator-tal
npm i
npm link
```

Crearemos un directorio y haremos cd sobre el mismo:

```bash
mkdir tal-project && cd tal-project
```
Ejecutaremos yo tal, y de forma opcional le otorgaremos un nombre de Proyecto:

```bash
yo tal [nombre de aplicación]
```


Ejecutaremos el proyecto para empezar a servir la aplicación TAL.

```bash
npm start
```


Ahora podremos acceder a nuestra aplicación de ejemplo usando la siguiente URL:

```bash
http://localhost:1337/
```


## License

MIT © [Ignacio Lopez Gomez ](https://www.linkedin.com/in/ignaciolopezgomez/)

