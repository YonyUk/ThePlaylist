import { Component, Input, OnInit } from '@angular/core';
import { PlayList, Track } from '../global.interfaces';
import { DataServerService } from '../data-server.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  @Input()
  PlayListItem!: PlayList;

  constructor(
    private readonly dataServerService: DataServerService
  ) { }

}
