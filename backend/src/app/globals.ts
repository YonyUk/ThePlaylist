import { ObjectType, Field, } from '@nestjs/graphql';

export const DataPath = '/media/yonyuk/Nuevo vol1/Projects/ThePlaylist/backend/src/data';

@ObjectType()
export class MutationResponse {
    @Field(() => String, { description: 'Status of the operation result' })
    Status: string;

    @Field(() => String, { description: 'Message of the operation' })
    Message: string;

    @Field(() => String, { description: 'Id of the object created' })
    ID: string;
}

export const OKOperationMessage = 'Operation succesfully done';

export const OKStatus = 'OK';

export const ERRORStatus = 'ERROR';

export const ERRORInvalidDataMessage = 'The provided data is invalid';