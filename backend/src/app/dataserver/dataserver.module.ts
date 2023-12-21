import { Module } from '@nestjs/common';
import { DataserverService } from './dataserver.service';
import { DataserverController } from './dataserver.controller';
import { TrackModule } from '../track/track.module';
import { PlaylistModule } from '../playlist/playlist.module';

@Module({
  controllers: [DataserverController],
  providers: [DataserverService],
  imports: [
    TrackModule,
    PlaylistModule
  ],
  exports: [
    DataserverService
  ]
})
export class DataserverModule {}
