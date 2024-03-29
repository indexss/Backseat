import { Component, OnInit } from '@angular/core';
import { faPlay, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { sampleWithFullData } from '../entities/want-to-listen-list-entry/want-to-listen-list-entry.test-samples';

@Component({
  selector: 'jhi-want-to-listen',
  templateUrl: './want-to-listen.component.html',
  styleUrls: ['./want-to-listen.component.scss'],
})
export class WantToListenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  protected readonly faPlayCircle = faPlayCircle;
  protected readonly sampleWithFullData = sampleWithFullData;

  goPlaylist(): void {
    //go to spotify with user own want-to-listen list
    console.log('go to spotify');
  }
}
