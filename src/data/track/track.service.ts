import { Injectable } from '@nestjs/common';
import { Prisma, Track } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    trackWhereUniqueInput: Prisma.TrackWhereUniqueInput
  ): Promise<Track | null> {
    return this.prisma.track.findUnique({
      where: trackWhereUniqueInput
    });
  }

  async findAll(): Promise<Track[]> {
    return this.prisma.track.findMany({ take: 10 });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TrackWhereUniqueInput;
    where?: Prisma.TrackWhereInput;
    orderBy?: Prisma.TrackOrderByWithRelationInput;
  }): Promise<Track[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.track.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }

  // async createTrack(data: Prisma.TrackCreateInput): Promise<Track> {
  //   return this.prisma.track.create({
  //     data,
  //   });
  // }
  //
  // async updateTrack(params: {
  //   where: Prisma.TrackWhereUniqueInput;
  //   data: Prisma.TrackUpdateInput;
  // }): Promise<Track> {
  //   const { data, where } = params;
  //   return this.prisma.track.update({
  //     data,
  //     where,
  //   });
  // }
  //
  // async deleteTrack(where: Prisma.TrackWhereUniqueInput): Promise<Track> {
  //   return this.prisma.track.delete({
  //     where,
  //   });
  // }
}
