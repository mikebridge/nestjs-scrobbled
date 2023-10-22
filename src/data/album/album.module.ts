import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { AlbumResolver } from './album.resolver';
import { AlbumService } from './album.service';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule)
  ],
  providers: [AlbumService, AlbumResolver],
  exports: [AlbumService, AlbumResolver]
})
export class AlbumModule {}
