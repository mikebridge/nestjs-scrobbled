import { Injectable } from '@nestjs/common';
import { Album, Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    albumWhereUniqueInput: Prisma.AlbumWhereUniqueInput
  ): Promise<Album | null> {
    return this.prisma.album.findUnique({
      where: albumWhereUniqueInput
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AlbumWhereUniqueInput;
    where?: Prisma.AlbumWhereInput;
    orderBy?: Prisma.AlbumOrderByWithRelationInput;
  }): Promise<Album[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.album.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }
}
