import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST') || 'localhost',
        port: +config.get('DB_PORT') || 5432,
        username: config.get('DB_USER') || 'postgres',
        password: config.get('DB_PASS') || 'postgres123',
        database: config.get('DB_NAME') || 'Detech-Job-Portal',
        autoLoadEntities: true, // automatically loads all entities in modules
        synchronize: true,      // dev only, auto creates tables
      }),
    }),

    JobsModule,
    AuthModule,
  ],
})
export class AppModule {}