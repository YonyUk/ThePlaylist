import { Component, Input } from '@angular/core';
import { Track } from '../global.interfaces';

@Component({
  selector: 'app-tracklistcontent',
  templateUrl: './tracklistcontent.component.html',
  styleUrls: ['./tracklistcontent.component.scss']
})
export class TracklistcontentComponent {

  @Input()
  Tracks!: Track[];

}
