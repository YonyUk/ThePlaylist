import { Component } from '@angular/core';
import { PlayList } from './global.interfaces';
import { DataServerService } from './data-server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  CreatingPlayList = false;

  CurrentPlayList!: PlayList;

  constructor(
    private readonly dataServerService: DataServerService
  ) { }

  setPlayList(playlist: PlayList) {
    this.CurrentPlayList = playlist;
  }

  createPlayList(value: boolean) {
    this.CreatingPlayList = value;
  }

  reload(value: boolean) {
    this.CreatingPlayList = value;
  }

  deletePlayList() {
    this.dataServerService.deletePlayList(this.CurrentPlayList.ID);
    
  }

}
