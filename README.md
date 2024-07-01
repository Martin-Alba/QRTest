# QRCodeTest

Este test es un servidor que permite la creación de usuarios y la generación de códigos QR. A continuación se detallan los pasos para configurar y ejecutar el servidor.

## Configuración del entorno

1. Crear un archivo `.env` en la raíz del proyecto con la siguiente información:
```
PORT=3000
MONGO_DB_URI=UriDeTuDBLocal
MONGO_DB_NAME=NombreParaLaDB
```

## Instalación de dependencias

En la raíz del proyecto, ejecuta uno de los siguientes comandos para instalar las dependencias necesarias:

```bash
npm i
```
o
```
pnpm i
```


## Endpoints del servidor
### Crear usuario
Solicitud POST para crear un nuevo usuario:
```
http://localhost:PORT/api/newUser
```
Body:
```
{
  "name": "Nombre",
  "surname": "Apellido",
  "age": 29,
  "country": "Pais",
  "email": "correo@test.com",
  "password": "Contraseña"
}

```

### Obtener QR del usuario
Solicitud GET para ver el código QR de un usuario:
```
http://localhost:3000/api/user/:userId/qr
```
Reemplaza :userId con el ID del usuario correspondiente.
