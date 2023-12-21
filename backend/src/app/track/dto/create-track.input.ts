import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateTrackInput {

  @IsNotEmpty()
  @IsString()
  @Field(() => String!, { description: 'Name of the soundtrack'})
  Name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String!, { description: 'Author of the soundtrack'})
  Author: string;
}
