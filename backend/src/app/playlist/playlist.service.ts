import { Injectable } from '@nestjs/common';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { UpdatePlaylistInput, AddTrackInput, CreateBelongInput } from './dto/update-playlist.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist, Belong } from './entities/playlist.entity';
import { ERRORStatus, MutationResponse, OKStatus, OKOperationMessage, DataPath } from '../globals';
import { v4 } from 'uuid';
import { TrackService } from '../track/track.service';
import { rmSync } from 'fs';

@Injectable()
export class PlaylistService {

  constructor(
    @InjectRepository(Playlist)
    private readonly playListRepository: Repository<Playlist>,
    @InjectRepository(Belong)
    private readonly belongRepository: Repository<Belong>,
    private readonly tracksService: TrackService
  ) { }

  async create(createPlaylistInput: CreatePlaylistInput) {
    try {
      const playlist: Playlist = {
        ID: v4(),
        Name: createPlaylistInput.Name,
        Date: (new Date(Date.now())).toLocaleString(),
        Tracks: []
      };
      await this.playListRepository.insert(playlist);
      const result: MutationResponse = {
        Status: OKStatus,
        Message: OKOperationMessage,
        ID: playlist.ID
      };
      return result;
    } catch (error) {
      return {
        Status: ERRORStatus,
        Message: error,
        ID: 'null'
      };
    }
  }

  async findAll() {
    const result = await this.playListRepository.find({
      relations: {
        Tracks: true
      }
    });
    return result;
  }

  async findOne(id: string) {
    const playlist = await this.playListRepository.findOneBy({ ID: id });
    const tracks = await this.belongRepository.findBy({ playlistID: id });
    let Tracks = [];
    for(let track of tracks) {
      Tracks.push(await this.tracksService.findOne(track.trackID));
    }
    const result = {
      ...playlist,
      Tracks
    };
    return result;
  }

  async addTrackToPlayList(id: string, track: AddTrackInput) {
    const results = await this.tracksService.findByAuthorAndName(track.Author, track.Name);

    let trackResponse;
    if (results.length === 0)
      trackResponse = await this.tracksService.create(track);
    else
      trackResponse = results[0]

    if (trackResponse.Status === ERRORStatus)
      return trackResponse;

    try {

      const belongInput: CreateBelongInput = {
        playlistID: id,
        trackID: trackResponse.ID
      };

      await this.belongRepository.insert(belongInput);

      return {
        Status: OKStatus,
        Message: OKOperationMessage,
        ID: id
      };

    } catch (error) {
      return {
        Status: ERRORStatus,
        Message: error,
        ID: 'null'
      };
    }
  }

  async deleteTrackFromPlayList(playlistid: string, trackid: string) {
    try {
      const a = await this.belongRepository.delete({ playlistID: playlistid, trackID: trackid });
      const remains = await this.belongRepository.countBy({ trackID: trackid });
      if (remains === 0) {
        const { Name } = await this.tracksService.findOne(trackid);
        await this.tracksService.remove(trackid);
        rmSync(`${DataPath}/${Name}`);
      }

      return {
        Status: OKStatus,
        Message: OKOperationMessage,
        ID: trackid
      };
    } catch (error) {
      return {
        Status: ERRORStatus,
        Message: error,
        ID: trackid
      };
    }
  }

  async update(id: string, updatePlaylistInput: UpdatePlaylistInput) {
    try {
      await this.playListRepository.update(id, updatePlaylistInput);
      return {
        Status: OKStatus,
        Message: OKOperationMessage,
        ID: id
      };
    } catch (error) {
      return {
        Status: ERRORStatus,
        Message: error,
        ID: 'null'
      };
    }
  }

  async remove(id: string) {
    try {
      //we updates the relationships
      const tracks = await this.belongRepository.findBy({ playlistID: id });
      for (let track of tracks) {
        const { Name } = await this.tracksService.findOne(track.trackID);
        await this.tracksService.remove(track.trackID);
        const remains = await this.belongRepository.countBy({ trackID: track.trackID });
        //if the track isn't at any playlist
        if (remains === 0) {
          await this.tracksService.remove(track.trackID);
          rmSync(`${DataPath}/${Name}`);
        }
      }
      await this.belongRepository.delete({ playlistID: id })
      await this.playListRepository.delete({ ID: id });
      return {
        Status: OKStatus,
        Message: OKOperationMessage,
        ID: id
      };
    } catch (error) {
      return {
        Status: ERRORStatus,
        Message: error,
        ID: 'null'
      };
    }
  }
}
