import { Injectable } from '@nestjs/common';
import { Prisma, Artist } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    artistWhereUniqueInput: Prisma.ArtistWhereUniqueInput
  ): Promise<Artist | null> {
    return this.prisma.artist.findUnique({
      where: artistWhereUniqueInput
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ArtistWhereUniqueInput;
    where?: Prisma.ArtistWhereInput;
    orderBy?: Prisma.ArtistOrderByWithRelationInput;
  }): Promise<Artist[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.artist.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }
}
