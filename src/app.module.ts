import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: process.env.ENV || '.env.local' }), // <--- Agrega esto
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [User],
      autoLoadModels: true,
      synchronize: false, // ponlo en true solo si quieres que cree la tabla automáticamente
    }),
    SequelizeModule.forFeature([User]),
    UserModule,
  ],
})
export class AppModule { }