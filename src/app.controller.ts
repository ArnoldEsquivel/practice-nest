import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { AppService } from './app.service'

// En este archivo se define el controlador de la aplicación
// y se definen las rutas de la API
@ApiTags('Main')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiOperation({ summary: 'Main route' })
	mainRoute(): string {
		return this.appService.getHello()
	}
}
