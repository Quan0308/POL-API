import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), TypeOrmModule.forRootAsync(TypeOrmConfigAsync)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
