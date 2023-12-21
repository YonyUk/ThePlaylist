import { Injectable } from '@nestjs/common';
import { PlaylistService } from '../playlist/playlist.service';
import { TrackService } from '../track/track.service';
import { v4 } from 'uuid';
import { readFileSync } from 'fs';
import { DataserverService } from '../dataserver/dataserver.service';
import { ValidatorToken } from '../dataserver/uploadValidatorToken'
import { OKStatus, OKOperationMessage } from '../globals';

@Injectable()
export class PagemanagerService {

  CurrentIP = JSON.parse(readFileSync('CurrentIP.json','utf-8')).CurrentIP;

  constructor(
    private readonly playListService: PlaylistService,
    private readonly tracksService: TrackService,
    private readonly dataserverService: DataserverService
  ) { 
    if (! this.CurrentIP.includes('.'))
      this.CurrentIP = 'localhost';
  }

  async getTracks() {
    return await this.tracksService.findAll();
  }

  async getUploadLink(filename: string,playlistID: string, mimetype: string,author: string) {
    const validatorToken: ValidatorToken = {
      ID: v4(),
      PlaylistID: playlistID,
      TrackName: filename,
      MimeType: mimetype,
      Author: author
    };
    await this.dataserverService.addValidatorToken(validatorToken);
    return {
      Link: `http://${this.CurrentIP}:3000/dataserver/${validatorToken.ID}`
    };
  }

  async removeTrack(id: string) {
    const playlists = await this.playListService.findAll();
    for(let playlist of playlists) {
      await this.playListService.deleteTrackFromPlayList(playlist.ID,id);
    }
    return {
      Status: OKStatus,
      Message: OKOperationMessage,
      ID: id
    };
  }
}
