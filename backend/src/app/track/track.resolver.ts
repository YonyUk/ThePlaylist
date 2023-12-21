import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TrackService } from './track.service';
import { Track } from './entities/track.entity';
import { UpdateTrackInput } from './dto/update-track.input';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ERRORStatus, ERRORInvalidDataMessage } from '../globals';
import { TrackResponse } from './dto/track-response.output';

@Resolver(() => TrackResponse)
export class TrackResolver {
  constructor(private readonly trackService: TrackService) {}

  @Mutation(() => TrackResponse)
  async updateTrack(@Args('updateTrackInput') updateTrackInput: UpdateTrackInput) {

    const input = plainToClass(UpdateTrackInput, updateTrackInput);
    const errors = await validate(input);

    if (errors.length > 0) {
      return {
        Status: ERRORStatus,
        Message: ERRORInvalidDataMessage + ` on property ${errors[0].property}: ${errors[0].value}`,
        ID: 'null'
      };
    }

    return this.trackService.update(updateTrackInput.ID, updateTrackInput);
  }

  @Query(() => TrackResponse,{ name: 'track'})
  async getTrack(
    @Args('id', { type: () => String!}) id: string
  )  {
    return this.trackService.findOne(id);
  }
}
