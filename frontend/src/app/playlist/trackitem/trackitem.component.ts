import { Component, Input, OnInit } from '@angular/core';
import { DataServerService } from '../../data-server.service';
import { Track } from '../../global.interfaces';

@Component({
  selector: 'app-trackitem',
  templateUrl: './trackitem.component.html',
  styleUrls: ['./trackitem.component.scss']
})
export class TrackitemComponent implements OnInit {

  @Input()
  TrackItem!: Track;

  Loaded: boolean = false;

  AudioPlayer!: HTMLMediaElement;

  ProgressBar!: HTMLInputElement;

  VolumeBar!: HTMLInputElement;

  Max: number = 0;

  Value: number = 0;

  Play = false;

  ButtonText = '▶';

  Volume = 50;

  constructor(
    private readonly dataServerService: DataServerService
  ) { }

  async ngOnInit() {
    this.TrackItem = await this.dataServerService.getTrack(this.TrackItem.ID);
    this.Loaded = true;
    setTimeout(() => {
      this.AudioPlayer = document.getElementById(`track-${this.TrackItem.ID}`) as HTMLMediaElement;
      this.ProgressBar = document.getElementById(`bar-${this.TrackItem.ID}`) as HTMLInputElement;
      this.VolumeBar = document.getElementById(`volume-${this.TrackItem.ID}`) as HTMLInputElement;
      this.buildControls();
    }, 100);
  }

  buildControls() {
    this.AudioPlayer.onloadeddata = () => {
      this.Max = this.AudioPlayer.duration;
      this.Value = this.AudioPlayer.currentTime;
      this.AudioPlayer.volume = this.Volume / 100;
    }

    this.AudioPlayer.ontimeupdate = () => {
      this.Value = this.AudioPlayer.currentTime;
    }

    this.ProgressBar.onchange = () => {
      this.Value = parseInt(this.ProgressBar.value);
      this.AudioPlayer.currentTime = this.Value;
    }

    this.AudioPlayer.onended = () => {
      this.ButtonText = '▶';
      this.Play = false;
      this.Value = 0;
      this.AudioPlayer.currentTime = 0;
    }

    this.VolumeBar.onchange = () => {
      this.Volume = parseInt(this.VolumeBar.value);
      this.AudioPlayer.volume = this.Volume / 100;
    }
  }

  playTrack() {
    if (!this.Play) {
      this.Play = true;
      this.AudioPlayer.play();
      this.ButtonText = '⎮⎮';
    }
    else {
      this.Play = false;
      this.AudioPlayer.pause();
      this.ButtonText = '▶';
    }
  }
}
