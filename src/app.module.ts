import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { NotificationModule } from './modules/notification/notification.module';
import { EventsModule } from './modules/events/events.module';
import { ChatModule } from './modules/chat/chat.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    // Configuration                
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): any => {
        const dbUrl = configService.get<string>('DATABASE_URL') || configService.get<string>('POSTGRES_URL');

        const baseConfig = {
          type: 'postgres' as const,
          autoLoadEntities: true,
          synchronize: false, // Disable in production - use migrations
          logging: configService.get('NODE_ENV') === 'development',
          ssl: configService.get('NODE_ENV') === 'production',
          extra: configService.get('NODE_ENV') === 'production' ? {
            ssl: {
              rejectUnauthorized: false,
            },
          } : undefined,
        };

        if (dbUrl) {
          return {
            ...baseConfig,
            url: dbUrl,
          };
        }

        return {
          ...baseConfig,
          host: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT') || '5432'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
        };
      },
      inject: [ConfigService],
    }),

    // Scheduler for Cron Jobs
    ScheduleModule.forRoot(),

    // Feature Modules
    AuthModule,
    ProfileModule,
    NotificationModule,
    EventsModule,
    ChatModule,
    ResourcesModule,
    DatabaseModule,
  ],
})
export class AppModule { }
