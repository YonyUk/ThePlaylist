import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PagemanagerService } from './pagemanager.service';
import { DataPath, MutationResponse, OKStatus, OKOperationMessage } from '../globals';
import { Track } from '../track/entities/track.entity';
import { TrackResponse } from '../track/dto/track-response.output';
import { writeFileSync, unlinkSync, createWriteStream } from 'fs';
import { UploadLink } from '../dataserver/uploadValidatorToken';

@Resolver(() => MutationResponse)
export class PagemanagerResolver {
  constructor(private readonly pagemanagerService: PagemanagerService) {}

  @Query(() => [TrackResponse], { name: 'tracks'})
  async findAllTracks() {
    return this.pagemanagerService.getTracks();
  }

  @Mutation(() => UploadLink, { name: 'askForUpload'})
  async getUploadValidation(
    @Args('filename', { type: () => String}) filename: string,
    @Args('playlistID', { type: () => String!}) playlistID: string,
    @Args('mimetype', { type: () => String!}) mimetype: string,
    @Args('author', { type: () => String!}) author: string
  ) {
    return this.pagemanagerService.getUploadLink(filename, playlistID, mimetype,author);
  }

  @Mutation(() => MutationResponse, { name: 'removeTrack'})
  async removeTrack(
    @Args('trackid', { type: () => String!}) trackid: string
  ) {
    return this.pagemanagerService.removeTrack(trackid);
  }
  
  // @Mutation(() => Pagemanager)
  // updatePagemanager(@Args('updatePagemanagerInput') updatePagemanagerInput: UpdatePagemanagerInput) {
  //   return this.pagemanagerService.update(updatePagemanagerInput.id, updatePagemanagerInput);
  // }

  // @Mutation(() => Pagemanager)
  // removePagemanager(@Args('id', { type: () => Int }) id: number) {
  //   return this.pagemanagerService.remove(id);
  // }
}
