import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Int
} from '@nestjs/graphql';
import { Artist } from '@prisma/client';
import { ArtistService } from './artist.service';
import { AlbumService } from '../album/album.service';

//@Resolver(of => Artist)
@Resolver('Artist')
export class ArtistResolver {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService
  ) {}

  @Query('findOneArtist')
  findOne(@Args('id') id: string) {
    return this.artistService.findOne({ id });
  }

  @ResolveField()
  async albums(@Parent() artist: Artist) {
    const { id } = artist;
    return this.albumService.findMany({ where: { artistId: id } });
  }

  @Query()
  searchArtists(
    @Args('searchString') searchString: string,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number
  ) {
    return this.artistService.findMany({
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
}
