import { Module } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
        }),
    ],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}