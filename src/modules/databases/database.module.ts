import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config'
import { Module, Global } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import config from '../../config/config'
import { DatabaseController } from './controllers/database.controller'

@Global()
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigType<typeof config>) => ({
        uri: configService.databaseMongo.uri
      }),
      inject: [config.KEY]
    })
  ],
  controllers: [DatabaseController],
  providers: [ConfigService],
})

export class DatabaseModule { }
