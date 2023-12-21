import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
  providers: [TrackResolver, TrackService],
  imports: [TypeOrmModule.forFeature([
    Track
  ])],
  exports: [
    TrackService
  ]
})
export class TrackModule {}
