import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Track, PlayList } from './global.interfaces';
import { GET_TRACK, GET_PLAYLISTS, GET_PLAYLIST } from './querys';

@Injectable({
  providedIn: 'root'
})
export class DataServerService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  async getTrack(id: string) {
    const result =  (await this.apollo.watchQuery({
      query: GET_TRACK,
      variables:{
        id
      }
    }).result()).data;
    return (result as any).track as Track;
  }

  async getPlayLists() {
    const result = (await this.apollo.watchQuery({
      query: GET_PLAYLISTS
    }).result()).data;
    return (result as any).playlists as PlayList[];
  }

  async getPlayList(id: string) {
    const result = (await this.apollo.watchQuery({
      query: GET_PLAYLIST,
      variables:{
        playlistid:id
      }
    }).result()).data;
    return (result as any).playlist as PlayList;
  }
}
