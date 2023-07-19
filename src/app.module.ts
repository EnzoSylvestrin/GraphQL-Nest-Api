import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { PrismaService } from './prisma/prisma.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { join } from 'path';

import { AccessTokenGuard } from './auth/guards/accessToken.guard';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
        }),
        AuthModule,
        UserModule,
    ],
    controllers: [],
    providers: [
        PrismaService,
        { provide: APP_GUARD, useClass: AccessTokenGuard },
    ],
})
export class AppModule {}
