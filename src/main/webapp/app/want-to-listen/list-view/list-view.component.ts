import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import format from '@popperjs/core/lib/utils/format';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { IWantToListenListEntry } from '../../entities/want-to-listen-list-entry/want-to-listen-list-entry.model';
import { WantToListenListEntryService } from '../../entities/want-to-listen-list-entry/service/want-to-listen-list-entry.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WantToListenComponent } from '../want-to-listen.component';
import { WantToListenService } from '../want-to-listen.service';
import { AccountService } from '../../core/auth/account.service';
import { listEntry } from '../list-entry.interface';

@Component({
  selector: 'jhi-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss', '../want-to-listen.component.scss'],
})
export class ListViewComponent implements OnInit {
  // @ts-ignore
  public itemList: listEntry[] = [
    // {
    //   id: 0,
    //   itemName: 'Cut To The Feeling',
    //   itemURI: 'spotify:track:11dFghVXANMlKmJXsNCbNl',
    //   artistName: 'Carly Rae Jepsen',
    //   // Is single, no albumName
    //   reviewsCount: 45216,
    //   rating: 4.543123,
    //   addTime: new Date('2024-02-12'),
    //   releaseTime: new Date('2017-05-26'),
    //   imgURL: 'https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1',
    //   isFocus: false,
    // },
    // {
    //   id: 1,
    //   itemName: 'Unbreakable',
    //   itemURI: 'spotify:track:5L9anTQJGLyRObYDYvLWdh',
    //   artistName: 'Michael Jackson',
    //   albumName: 'Invincible',
    //   reviewsCount: 2345667,
    //   rating: 4.86443,
    //   addTime: new Date('2024-02-22'),
    //   releaseTime: new Date('2001-10-29'),
    //   imgURL: 'https://i.scdn.co/image/ab67616d0000b273463de2351439f6532ff0dfbd',
    //   isFocus: false,
    // },
    // {
    //   id: 2,
    //   itemName: 'Privacy',
    //   itemURI: 'spotify:track:53NdDxLiNn7VSgDVi9KsYl',
    //   artistName: 'Michael Jackson',
    //   albumName: 'Invincible',
    //   reviewsCount: 773342,
    //   rating: 4.7,
    //   addTime: new Date('2024-02-01'),
    //   releaseTime: new Date('2001-10-29'),
    //   imgURL: 'https://i.scdn.co/image/ab67616d0000b273463de2351439f6532ff0dfbd',
    //   isFocus: false,
    // },
    // {
    //   id: 3,
    //   itemName: 'Midnight Memories',
    //   itemURI: 'spotify:track:5wjmqUGN7vrAqFqDWrywlZ',
    //   artistName: 'One Direction',
    //   albumName: 'Midnight Memories (Deluxe)',
    //   reviewsCount: 553217,
    //   rating: 5,
    //   addTime: new Date('2024-03-02'),
    //   releaseTime: new Date('2013-11-25'),
    //   imgURL: 'https://i.scdn.co/image/ab67616d00001e022f76b797c382bedcafdf45e1',
    //   isFocus: false,
    // }
  ];

  protected faTrash = faTrash;
  constructor(
    private service: WantToListenService,
    public router: Router,
    protected http: HttpClient,
    protected modalService: NgbModal,
    private accService: AccountService
  ) {}

  ngOnInit(): void {
    this.accService.identity().subscribe(acc => {
      if (acc) {
        // check if user has logged in, if yes, then get
        this.service.getUserEntries(acc.login).subscribe(res => {
          this.itemList = res.data.entryList;
          console.log(res);
        });
      } else {
        console.log('No login');
        this.router.navigate(['/login']);
      }
    });
  }

  setFocusOn(): boolean {
    return true;
  }

  setFocusOff(): boolean {
    return false;
  }

  deleteItem(id: number): void {
    this.service.delEntry(id).subscribe(() => {
      // Make a notice to user: item deleted
      console.log('Entry id: ' + id + 'deleted!');
      this.ngOnInit(); //refresh page to show changes
    });
  }

  expand(): void {
    //On mouse click
  }

  protected readonly format = format;
  protected readonly WantToListenComponent = WantToListenComponent;
}
