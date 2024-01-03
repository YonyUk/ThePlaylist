import { Injectable} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Track, PlayList } from './global.interfaces';
import { GET_TRACK, GET_PLAYLISTS, GET_PLAYLIST, GET_UPLOAD_LINK, CREATE_PLAYLIST, DELETE_TRACK_FROM_PLAYLIST, DELETE_PLAYLIST } from './querys';

@Injectable({
  providedIn: 'root'
})
export class DataServerService {

  Error = false;

  ErrorMessage = '';

  constructor(
    private readonly apollo: Apollo
  ) { }

  async createPlaylist(name: string) {
    const input = {
      Name: name
    };
    await this.apollo.mutate({
      mutation:CREATE_PLAYLIST,
      variables:{
        input
      }
    }).subscribe(({data,errors}) => {
      if(errors){
        this.Error = true;
        this.ErrorMessage = (errors as any)[0];
      }
      else {
        this.Error = false;
        this.ErrorMessage = '';
      }
    });
  }

  async deletePlayList(id: string) {
    await this.apollo.mutate({
      mutation: DELETE_PLAYLIST,
      variables: {
        playlistid: id
      }
    }).subscribe(({data,errors}) => {
      if(errors){
        this.Error = true;
        this.ErrorMessage = (errors as any)[0];
      }
      else {
        this.Error = false;
        this.ErrorMessage = '';
      }
    });
  }

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

  async uploadFile(file: string,playlistid: string,mimetype: string,author: string,fileData: any) {
    const result = (this.apollo.mutate({
      mutation: GET_UPLOAD_LINK,
      variables:{
        file,
        playlistid,
        mimetype,
        author
      }
    }).subscribe(({data,errors}) => {
      const link = (data as any).askForUpload.Link;
      fetch(link, {
        method: 'POST',
        body: fileData
      }).catch(error => console.log(error));
    }));
    this.apollo.client.cache.reset();
    return result;
  }

  async deleteTrackFromPlaylist(trackid: string, playlistid: string) {
    const result = (await this.apollo.mutate({
      mutation: DELETE_TRACK_FROM_PLAYLIST,
      variables:{
        trackid,
        playlistid
      }
    }).subscribe(({data,errors}) => {
      if (errors)
        document.write('!ERROR!');
    }));
    this.apollo.client.cache.reset();
    return result;
  }
}
