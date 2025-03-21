# Backend Project - Express & Node.js (v18) with MongoDB

Este es el backend del proyecto desarrollado con Express.js y Node.js (v18), que maneja las solicitudes API y la interacción con la base de datos MongoDB.

## Tabla de Contenidos

- [Requisitos previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Descripción de la Implementación](#descripción-de-la-implementación)
- [Bibliotecas y Frameworks Usados](#bibliotecas-y-frameworks-usados)
- [Desafíos y Soluciones](#desafíos-y-soluciones)

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes en tu entorno local:

- **Node.js v18** (puedes verificar tu versión con `node -v`)
- **npm** (gestor de paquetes de Node)
- **MongoDB** (puede ser una instalación local o un servicio de MongoDB en la nube como MongoDB Atlas)

# Configuración de Variables de Entorno para Mailtrap y Usuario Admin

## Paso 1: Registro en Mailtrap

Para manejar los correos en el entorno de desarrollo, es necesario registrarse en **Mailtrap: Email Delivery Platform**. Puedes hacerlo en el siguiente enlace:  

🔗 [Registrarse en Mailtrap](https://mailtrap.io/)  

Una vez registrado, obtendrás las credenciales necesarias para enviar correos desde tu aplicación.

## Paso 2: Configurar las Variables de Entorno

Debes reemplazar las siguientes variables de entorno en tu archivo `.env` con las credenciales obtenidas en Mailtrap:

```env
MAILTRAP_USER='Tu Username'
MAILTRAP_PASS='Tu Password'
ADMIN_EMAIL='example@mailtrap.com'
ADMIN_PASSWORD='Tu Pasword'
PORT=3001
MONGOOSE_URI=mongodb+srv://Brian:Ugmex2024@cluster0.o0koz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=alzyihLLHSg0t6ft67K//boVjs1Q67YayWMuPfNGGrY=
```

## Instalación y Configuración

### 1. Clonar el Repositorio

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/tuusuario/nombre-del-proyecto.git
cd nombre-del-proyecto
npm install
npm run dev
```
# Descripción de la Implementación
- Este backend está construido utilizando Express.js para gestionar las rutas API y MongoDB como base de datos. La aplicación maneja operaciones como:

- Autenticación de usuarios (registro, inicio de sesión, cierre de sesión)
- Operaciones CRUD para gestionar recursos (usuarios, productos, pedidos, etc.)
- Validación de datos y manejo de errores
- Decisiones de Implementación:
- Arquitectura MVC: Se sigue el patrón de Modelo-Vista-Controlador para organizar el código de manera eficiente y escalable.
- Autenticación JWT: Se utiliza JSON Web Tokens (JWT) para gestionar la autenticación y autorización segura de los usuarios.
- Operaciones Asíncronas: Se emplea el enfoque async/await para manejar operaciones asíncronas de manera limpia y evitar el "callback hell".
- Middlewares personalizados: Se usan middlewares para manejar la autenticación, los logs y los errores.

# Bibliotecas y Frameworks Usados
- Express.js: Framework minimalista para Node.js, utilizado para crear las rutas y gestionar las solicitudes HTTP.
- jsonwebtoken (JWT): Para la autenticación segura de los usuarios mediante tokens.
- dotenv: Para manejar las variables de entorno.
- mongoose: ORM para MongoDB, utilizado para manejar los modelos de datos y las interacciones con la base de datos.
- bcryptjs: Para encriptar contraseñas de manera segura.
- cors: Para permitir las solicitudes CORS desde el frontend.
