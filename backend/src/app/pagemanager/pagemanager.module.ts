import { Module } from '@nestjs/common';
import { PagemanagerService } from './pagemanager.service';
import { PagemanagerResolver } from './pagemanager.resolver';
import { PlaylistModule } from '../playlist/playlist.module';
import { TrackModule } from '../track/track.module';
import { DataserverModule } from '../dataserver/dataserver.module';

@Module({
  providers: [PagemanagerResolver, PagemanagerService],
  imports:[
    PlaylistModule,
    TrackModule,
    DataserverModule
  ]
})
export class PagemanagerModule {}
