import { Component, OnInit } from '@angular/core';
import { faPlay, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-want-to-listen',
  templateUrl: './want-to-listen.component.html',
  styleUrls: ['./want-to-listen.component.scss'],
})
export class WantToListenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  protected readonly faPlay = faPlay;
  protected readonly faPlayCircle = faPlayCircle;
}
