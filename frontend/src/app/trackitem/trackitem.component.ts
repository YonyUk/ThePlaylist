import { Component, Input, OnInit } from '@angular/core';
import { DataServerService } from '../data-server.service';
import { Track } from '../global.interfaces';

@Component({
  selector: 'app-trackitem',
  templateUrl: './trackitem.component.html',
  styleUrls: ['./trackitem.component.scss']
})
export class TrackitemComponent implements OnInit{

  @Input()
  TrackID!: string;

  TrackLink!: string;

  @Input()
  TrackName!: string;

  @Input()
  TrackAuthor!: string;

  @Input()
  TrackRepCount!: number;

  Play: boolean = false;
  
  ButtonText: string = 'Play track';

  private audio!: HTMLMediaElement;

  constructor(
    private readonly dataServerService: DataServerService
  ) { }

  async ngOnInit() {
    const track: Track = await this.dataServerService.getTrack(this.TrackID);
    this.TrackLink = track.Link;
    this.audio = document.getElementById(this.TrackID) as HTMLMediaElement;
    // this.audio.autoplay = true;
  }

  deleteSelf() {
    this.dataServerService.deleteTrackFromPlaylist(this.TrackID,"41028caf-e899-43be-a55c-8cb0b404540a");
  }

  playTrack() {
    if (this.Play === false) {
      this.Play = true;
      this.ButtonText = 'Stop track';
      this.audio.play();
    }
    else{
      this.Play = false;
      this.ButtonText = 'Play track';
      this.audio.pause();
    }
  }

}
