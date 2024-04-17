import { Component, OnInit } from '@angular/core';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { sampleWithFullData } from '../entities/want-to-listen-list-entry/want-to-listen-list-entry.test-samples';
import { WantToListenService } from './want-to-listen.service';
import { AccountService } from '../core/auth/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-want-to-listen',
  templateUrl: './want-to-listen.component.html',
  styleUrls: ['./want-to-listen.component.scss'],
})
export class WantToListenComponent implements OnInit {
  constructor(private service: WantToListenService, private accService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  protected readonly faPlayCircle = faPlayCircle;
  protected readonly sampleWithFullData = sampleWithFullData;

  goPlaylist(): void {
    //go to spotify with user own want-to-listen list
    console.log('go to spotify');
    this.accService.identity().subscribe(account => {
      if (account) {
        this.service.createList(account.login).subscribe(date => {
          const playListId = date.data.playListId;
          window.location.href = 'https://open.spotify.com/playlist/' + playListId;
        });
      } else {
        console.log('No login');
        this.router.navigate(['/login']);
      }
    });
  }
}
