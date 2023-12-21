import { Component, OnInit } from '@angular/core';
import { DataServerService } from '../data-server.service';
import { Track } from '../global.interfaces';

@Component({
  selector: 'app-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.scss']
})
export class TracklistComponent implements OnInit{

  Track!: Track;

  constructor(
    private readonly dataServerService: DataServerService
  ) {
  }

  async ngOnInit() {
    const playlist = await this.dataServerService.getPlayList('41028caf-e899-43be-a55c-8cb0b404540a');
    console.log(playlist);
  }

}
