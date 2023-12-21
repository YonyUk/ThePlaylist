import { CreateTrackInput } from './create-track.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateTrackInput extends PartialType(CreateTrackInput) {

  @IsUUID()
  @Field(() => String!, { description: 'Id of the soundtrack' })
  ID: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String!, { description: 'Name of the soundtrack'})
  Name: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String!, { description: 'Author of the soundtrack'})
  Author: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int!, { description: 'Reproductions that the soundtrack has'})
  RepCount: number;
}
