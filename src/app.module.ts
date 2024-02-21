import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auths/auth.module'
import { ProductModule } from './modules/products/product.module'
import { UserModule } from './modules/users/user.module'
import { OrdersModule } from './modules/orders/orders.module';
import { DatabaseModule } from './modules/databases/database.module';
import { environments } from './config/environments'
import config from './config/config'
import { valitateEnv } from './config/validateEnv'
// Este modulo es para hacer peticiones http
// import { HttpModule, HttpService } from '@nestjs/axios'

@Module({
	imports: [
		ConfigModule.forRoot({
			// Esto es para que cargue las variables de entorno dependiendo del ambiente
			envFilePath: environments[process.env.NODE_ENV] || '.env',
			load: [config],
			isGlobal: true,
			// Asi podemos validar las variables de entorno
			// Si no se cumple la validación, la aplicación no se levantará
			validationSchema: valitateEnv,
		}),
		AuthModule,
		ProductModule,
		UserModule,
		OrdersModule,
		DatabaseModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
