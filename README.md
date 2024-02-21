##Comandos para acciones basicas con Nest

Este comando nos ayuda a crear un controlador, esto crea el controlador y test de products adentro de la carpeta /controllers

```shell
  nest g controller controllers/products
```

El argumento --flat evita la creacion de una carpeta adicional con el nombre del controlador
 ```shell
    nest g co modules/authentication/controllers/auth --flat
 ```


**Estructura de las carpetas

*modules
Toda la logica de la aplicacion, toma en cuenta que cada uno de estos modulos deberan
llevar sus respectivas carpetas como controllers, services, etc...
  -Autenticacion
  -Usuarios

**Pipes
Los Pipes nos sirven para transformar y validar datos

```shell
  nest g pipe utils/pipes/parse-int --flat
```
