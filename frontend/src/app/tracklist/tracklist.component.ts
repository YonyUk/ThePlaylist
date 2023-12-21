import { Component, Input, OnInit } from '@angular/core';
import { DataServerService } from '../data-server.service';
import { Track, PlayList } from '../global.interfaces';

@Component({
  selector: 'app-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.scss']
})
export class TracklistComponent implements OnInit{

  Track: boolean = false;

  Playlist: boolean = true;

  FileData!: any;

  @Input()
  TrackName!: string;

  @Input()
  TrackAuthor!: string;
  
  @Input()
  PlaylistName!: string;

  FileMimeType!: string;

  Tracks!: Track[];

  PlayList!: PlayList;
  constructor(
    private readonly dataServerService: DataServerService
  ) {
  }

  async ngOnInit() {
    this.PlayList = await this.dataServerService.getPlayList("41028caf-e899-43be-a55c-8cb0b404540a");
    this.Tracks = this.PlayList.Tracks;
  }

  createTrackSelect() {
    this.Track = true;
    this.Playlist = false;
  }

  createPlaylistSelect() {
    this.Track = false;
    this.Playlist = true;
  }

  searchFile() {
    const fileOpener = document.getElementById('file');
    fileOpener?.click();
  } 

  async loadFile(event: any) {
    this.FileData = await event.target.files[0];
    const splitedName = this.FileData.name.split('.');
    this.FileMimeType = splitedName[splitedName.length - 1];
  }

  createPlaylist() {
    this.dataServerService.createPlaylist(this.PlaylistName);
  }

  async uploadFile() {
    const formData = new FormData();
    await formData.append('file',this.FileData);
    console.log(formData);
    const response = await this.dataServerService.uploadFile(this.TrackName,'41028caf-e899-43be-a55c-8cb0b404540a',this.FileMimeType,this.TrackAuthor,formData);
    const playlist = await this.dataServerService.getPlayList("41028caf-e899-43be-a55c-8cb0b404540a");
    this.Tracks = playlist.Tracks;
  }
}
