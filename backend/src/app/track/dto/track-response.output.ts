import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TrackResponse {

    @Field(() => String, { description: 'Id of the soundtrack' })
    ID: string;
  
    @Field(() => String, { description: 'Name of the soundtrack' })
    Name: string;
  
    @Field(() => String, { description: 'Author of the soundtrack' })
    Author: string;
  
    @Field(() => Int, { description: 'Reproductions that the soundtrack has' })
    RepCount: number;
  
    @Field(() => String, { description: 'Link of this file'})
    Link: string;
}