import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UploadLink {
    @Field(() => String, { description: 'Url to upload files' })
    Link: string;
}

export interface ValidatorToken {
    ID: string,
    PlaylistID: string,
    TrackName: string,
    MimeType: string,
    Author: string
}