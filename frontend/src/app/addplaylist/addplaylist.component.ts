import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataServerService } from '../data-server.service';

@Component({
  selector: 'app-addplaylist',
  templateUrl: './addplaylist.component.html',
  styleUrls: ['./addplaylist.component.scss']
})
export class AddplaylistComponent {

  @Input()
  PlayListName!: string;

  @Output()
  PlayListCreatedEventEmitter = new EventEmitter<boolean>();

  constructor(
    private readonly dataServerService: DataServerService
  ) { }

  addPlayList() {
    if(!this.PlayListName || this.PlayListName.length === 0){
      alert('The Playlist most have a name');
    }
    else
    {
      this.dataServerService.createPlaylist(this.PlayListName);
      this.PlayListCreatedEventEmitter.emit(false);
    }
  }

}
