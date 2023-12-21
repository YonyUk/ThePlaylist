import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePlaylistInput {

  @IsString()
  @IsNotEmpty()
  @Field(() => String!, { description: 'Name of the playlist'})
  Name: string;
}
