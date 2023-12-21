import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistResolver } from './playlist.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist, Belong } from './entities/playlist.entity';
import { TrackModule } from '../track/track.module';

@Module({
  providers: [PlaylistResolver, PlaylistService],
  imports:[
    TypeOrmModule.forFeature([
      Playlist,
      Belong
    ]),
    TrackModule
  ],
  exports:[
    PlaylistService
  ]
})
export class PlaylistModule {}
