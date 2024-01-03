import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayList } from '../../global.interfaces';

@Component({
  selector: 'app-playlistitem',
  templateUrl: './playlistitem.component.html',
  styleUrls: ['./playlistitem.component.scss']
})
export class PlaylistitemComponent implements OnInit{

  @Input()
  PlayListItem!: PlayList;

  @Output()
  PlayListEventEmitter = new EventEmitter<PlayList>();

  Name!: string;

  DateOfCreation!: Date;

  TracksCount!: number;

  async ngOnInit() {
    this.Name = this.PlayListItem.Name;
    this.DateOfCreation = this.PlayListItem.Date;
    this.TracksCount = this.PlayListItem.Tracks.length;
  }

  playlistSelected() {
    this.PlayListEventEmitter.emit(this.PlayListItem);
  }

}
