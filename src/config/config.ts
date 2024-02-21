import { registerAs } from "@nestjs/config"

// Tipando nuestras variables de entorno nos protegemos de errores al escribir el nombre de la variable
// y nos ayuda a que el servicio de configuración sea más seguro

export default registerAs('config', () => {
    return {
        port: parseInt(process.env.PORT, 10) || 3000,
        originCors: process.env.ORIGIN_CORS,
        apiKey: process.env.API_KEY,
        databaseSQL: {
            host: process.env.MY_SQL_HOST,
            port: parseInt(process.env.MY_SQL_PORT, 10),
            user: process.env.MY_SQL_USER,
            password: process.env.MY_SQL_PASSWORD,
            database: process.env.MY_SQL_DATABASE
        },
        databaseMongo: {
            uri: process.env.MONGO_URI,
            host: process.env.MONGO_HOST,
            port: parseInt(process.env.MONGO_PORT, 10),
            user: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD,
            database: process.env.MONGO_DATABASE
        }
    }
})
