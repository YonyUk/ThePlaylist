import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { PlayList } from '../global.interfaces';
import { DataServerService } from '../data-server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit{

  PlayLists!: PlayList[];

  @Output()
  PlayListEmitter = new EventEmitter<PlayList>();

  @Output()
  CreatePlaylistEmitter = new EventEmitter<boolean>();

  CurrentPlayList = 0;

  constructor(
    private readonly dataSereverService: DataServerService,
    private readonly router: Router
  ) { }

  async ngOnInit() {
    this.PlayLists = await this.dataSereverService.getPlayLists();
    this.PlayListEmitter.emit(this.PlayLists[0]);
  }

  selectPlayList(playlist: PlayList) {
    this.PlayListEmitter.emit(playlist);
    this.CreatePlaylistEmitter.emit(false);
  }

  createPlayList() {
    this.CreatePlaylistEmitter.emit(true);
  }
}
