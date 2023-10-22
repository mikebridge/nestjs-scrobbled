import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { AppController } from './app.controller';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import { TrackModule } from './data/track/track.module';

import { ArtistModule } from './data/artist/artist.module';
import { AlbumModule } from './data/album/album.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      // used apollo playground
      playground: false,
      //     process.env.NODE_ENV === 'production'
      //       ? ApolloServerPluginLandingPageProductionDefault({
      //         graphRef: 'my-graph-id@my-graph-variant',
      //         footer: false,
      //       })
      //       : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],

      definitions: {
        outputAs: 'class'
      }
    }),
    TrackModule,
    AlbumModule,
    ArtistModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
