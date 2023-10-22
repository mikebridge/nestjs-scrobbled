import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Int
} from '@nestjs/graphql';
import { Album } from '@prisma/client';
import { AlbumService } from './album.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';

@Resolver('Album')
export class AlbumResolver {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService
  ) {}

  @Query('findOneAlbum')
  findOne(@Args('id') id: string) {
    return this.albumService.findOne({ id });
  }

  @Query()
  searchAlbums(
    @Args('searchString') searchString: string,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number
  ) {
    return this.albumService.findMany({
      where: {
        ...(searchString
          ? { name: { contains: searchString, mode: 'insensitive' } }
          : {})
      },
      take,
      skip
      // orderBy: args?.orderBy
    });
  }

  @ResolveField()
  async tracks(@Parent() album: Album) {
    const { id } = album;
    return this.trackService.findMany({ where: { albumId: id } });
  }

  @ResolveField('artist')
  async getArtist(@Parent() album: Album) {
    const artistId = album.artistId;
    return this.artistService.findOne({ id: artistId });
  }

  @ResolveField()
  async artistId(@Parent() id: string) {
    return this.artistService.findOne({
      id
    });
  }
}
