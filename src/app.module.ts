import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(protected readonly appService: AppService) {}

  async onApplicationBootstrap() {
    await this.appService.run();
  }
}
