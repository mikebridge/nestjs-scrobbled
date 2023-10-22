import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { AlbumModule } from '../album/album.module';
import { PrismaModule } from '../../database/prisma.module';
import { TrackResolver } from './track.resolver';

@Module({
  imports: [PrismaModule, forwardRef(() => AlbumModule)],
  providers: [TrackService, TrackResolver],
  exports: [TrackService, TrackResolver]
})
export class TrackModule {}
