import { Injectable, Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import config from './config/config'

// @Injectable() es un decorador que nos permite inyectar dependencias
// Las dependencias son clases o servicios que se pueden usar en otras clases
@Injectable()
export class AppService {
	constructor(
		// Asi podemos tipar el servicio de configuración
		// config.KEY nos ayuda a generar una clave para el servicio de configuración
		// Aunque tambien podriamos colocar el nombre dado en el registerAs "config"
		@Inject(config.KEY) private configService: ConfigType<typeof config>,
	) { }

	getHello(): string {
		// const apiKey = this.configService.apiKey
		// return `Hello World! ${this.configService.databaseSQL.host} ${apiKey}`
		return "Hello World!"
	}
}
