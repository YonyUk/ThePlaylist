import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlaylistService } from './playlist.service';
import { Playlist } from './entities/playlist.entity';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { UpdatePlaylistInput, AddTrackInput } from './dto/update-playlist.input';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { MutationResponse, ERRORStatus, ERRORInvalidDataMessage, OKStatus } from '../globals';
import { PlaylistResponse } from './dto/get-playlist.output';

@Resolver(() => Playlist)
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) {}

  @Mutation(() => MutationResponse)
  async createPlaylist(@Args('createPlaylistInput') createPlaylistInput: CreatePlaylistInput) {
    const input  = plainToClass(CreatePlaylistInput, createPlaylistInput);
    const errors = await validate(input);

    if (errors.length > 0) {
      return {
        Status: ERRORStatus,
        Message: `${ERRORInvalidDataMessage} on property ${errors[0].property}: ${errors[0].value}`
      };
    }

    return await this.playlistService.create(createPlaylistInput);
  }

  @Query(() => [PlaylistResponse], { name: 'playlists' })
  async findAll() {
    return await this.playlistService.findAll();
  }

  @Query(() => PlaylistResponse, { name: 'playlist' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.playlistService.findOne(id);
  }

  @Mutation(() => MutationResponse)
  async updatePlaylist(@Args('updatePlaylistInput') updatePlaylistInput: UpdatePlaylistInput) {
    const input = plainToClass(UpdatePlaylistInput, updatePlaylistInput);
    const errors = await validate(input);

    if(errors.length > 0) {
      return {
        Status: ERRORStatus,
        Message: `${ERRORInvalidDataMessage} on property ${errors[0].property}: ${errors[0].value}`,
        ID: 'null'
      };
    }
    return await this.playlistService.update(updatePlaylistInput.ID, updatePlaylistInput);
  }

  @Mutation(() => MutationResponse, { name: 'removePlayList'})
  async removePlaylist(@Args('id', { type: () => String! }) id: string) {
    return this.playlistService.remove(id);
  }

  @Mutation(() => MutationResponse, { name: 'quitTrackFromPlayList'})
  async deleteTrackFromPlaylist(
    @Args('playlistid', { type: () => String}) playlistid: string,
    @Args('trackid', { type: () => String}) trackid: string
  ) {
    return await this.playlistService.deleteTrackFromPlayList(playlistid, trackid);
  }
}
