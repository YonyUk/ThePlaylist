import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TestModule } from './test/test.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from './app/track/track.module';
import { PlaylistModule } from './app/playlist/playlist.module';
import { PagemanagerModule } from './app/pagemanager/pagemanager.module';
import { DataserverModule } from './app/dataserver/dataserver.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: 'family',
        database: 'PlayListDB',
        entities: [],
        synchronize: true,
        autoLoadEntities:true,
      })
    }),
    TestModule,
    TrackModule,
    PlaylistModule,
    PagemanagerModule,
    DataserverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
