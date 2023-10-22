import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { ArtistResolver } from './artist.resolver';
import { ArtistService } from './artist.service';
import { AlbumModule } from '../album/album.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AlbumModule)],
  providers: [ArtistService, ArtistResolver],
  exports: [ArtistService, ArtistResolver]
})
export class ArtistModule {}
