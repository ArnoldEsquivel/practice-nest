import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)
	const port = configService.get('PORT')
	const origin = configService.get('ORIGIN_CORS')

	app.useGlobalPipes(
		new ValidationPipe({
			// Esto nos permite eliminar los parámetros que no están definidos en los DTOs
			whitelist: true,

			// Esto nos permite enviar un error cuando se envía un parámetro que no está definido en los DTOs
			forbidNonWhitelisted: true,

			// Esto nos permite transformar los parámetros a los tipos de datos definidos en los DTOs
			transformOptions: {
				enableImplicitConversion: true,
			}
		})
	)

	const config = new DocumentBuilder()
		.setTitle('API Nest Practice Documentation')
		.setDescription('In this API you can find a lot of examples of how to use NestJS with MongoDB and Swagger documentation')
		.setVersion('3.0')
		.addTag('The Nest Practice API')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('doc', app, document)

	app.enableCors({
		origin: origin,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	})

	await app.listen(port)
	console.log(`Server running on http://localhost:${port} and Swagger on /docs`)
	console.log(`Origin CORS: ${origin}`)
}

bootstrap()
