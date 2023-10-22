import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TrackService } from './data/track/track.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly trackService: TrackService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
