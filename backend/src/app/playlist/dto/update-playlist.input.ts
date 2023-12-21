import { CreatePlaylistInput } from './create-playlist.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdatePlaylistInput extends PartialType(CreatePlaylistInput) {

  @IsUUID()
  @Field(() => String!, { description: 'Id of the playlist'})
  ID: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String!, { description: 'Name of the playlist'})
  Name: string;
}

@InputType()
export class AddTrackInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String!, { description: 'Name of the track'})
  Name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String!, { description: 'Author of the track'})
  Author: string;
}

@InputType()
export class CreateBelongInput {
  @Field(() => String!, { description: 'Playlist id'})
  playlistID: string;

  @Field(() => String!, { description: 'Track id'})
  trackID: string;
}