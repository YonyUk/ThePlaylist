import { Injectable } from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { DataPath, MutationResponse, OKStatus, OKOperationMessage } from '../globals';
import { PlaylistService } from '../playlist/playlist.service';
import { ValidatorToken } from './uploadValidatorToken'
import { renameSync } from 'fs';
@Injectable()
export class DataserverService {

  ValidatorTokens: ValidatorToken[] = [];

  constructor(
    private readonly trackService: TrackService,
    private readonly playlitsService: PlaylistService
  ) {
  }

  async saveTrack(id: string, file: any) {
    let playlistID;
    let trackName;
    let author;

    for (let token of this.ValidatorTokens) {
      if (id === token.ID) {
        playlistID = token.PlaylistID;
        trackName = `${token.TrackName}.${token.MimeType}`;
        author = token.Author;
        break;
      }
    }

    const newTrack = {
      Name: trackName,
      Author: author
    };
    renameSync(`${DataPath}/${file.originalname}`,`${DataPath}/${trackName}`);
    return await this.playlitsService.addTrackToPlayList(playlistID, newTrack);
  }

  findAll() {
    return `This action returns all dataserver`;
  }

  async findOne(id: string) {
    const track = await this.trackService.findOne(id);
    return `${DataPath}/${track.Name}`;
  }

  async addValidatorToken(token: ValidatorToken) {
    //an instance of a validator token
    this.ValidatorTokens.push(token);
    setTimeout(() => {
      this.ValidatorTokens = this.ValidatorTokens.filter(element => element.ID !== token.ID);
    }, 10000)
  }

}
