import { ObjectType, Field } from '@nestjs/graphql';
import { Track } from '../../track/entities/track.entity';
import { Belong } from '../entities/playlist.entity';


@ObjectType()
export class PlaylistResponse {
    
    @Field(() => String, { description: 'Id of the playlist'})
    ID: string;

    @Field(() => String, { description: 'Name of the playlist'})
    Name: string;

    @Field(() => String, { description: 'Date of upload of the playlist'})
    Date: string;

    @Field(() => [Track], { description: 'tracks of the playlist'})
    Tracks: Track[];
}