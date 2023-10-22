// import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Int
} from '@nestjs/graphql';
import { TrackService } from './track.service';
import { AlbumService } from '../album/album.service';
import { Track } from '@prisma/client';

/**
 * @see @{link https://docs.nestjs.com/graphql/resolvers#schema-first-resolver}
 *
 *
 * The @Resolver() decorator is required. It takes an optional string argument with the name of a class.
 * This class name is required whenever the class includes @ResolveField() decorators to inform Nest
 * that the decorated method is associated with a parent type (the Author type in our current example).
 * Alternatively, instead of setting @Resolver() at the top of the class, this can be done for each method:
 *
 * @Resolver('Author')
 * @ResolveField()
 * async posts(@Parent() author) {
 *   const { id } = author;
 *   return this.postsService.findAll({ authorId: id });
 * }
 *
 */

//@Resolver(of => Track)
@Resolver('Track')
export class TrackResolver {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService
  ) {}

  @Query('findOneTrack')
  findOne(@Args('id') id: string) {
    return this.trackService.findOne({ id });
  }

  @Query('allTracks')
  allTracks() {
    return this.trackService.findAll();
  }

  @Query()
  searchTracks(
    @Args('searchString') searchString: string,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number
  ) {
    return this.trackService.findMany({
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

  @ResolveField('album')
  async getAlbum(@Parent() track: Track) {
    const albumId = track.albumId;
    return this.albumService.findOne({ id: albumId });
  }

  @ResolveField()
  async albumId(@Parent() id: string) {
    // const { id } = album;
    console.log(`querying by id ${id}`);
    return this.albumService.findOne({
      id
    });
  }
}
