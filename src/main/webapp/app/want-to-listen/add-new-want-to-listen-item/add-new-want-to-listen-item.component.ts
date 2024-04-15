import { Component, Input, OnInit } from '@angular/core';
import { faPlayCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import dayjs from 'dayjs/esm';
import { WantToListenService } from '../want-to-listen.service';
import { WantToListenListEntryService } from '../../entities/want-to-listen-list-entry/service/want-to-listen-list-entry.service';
import { NewWantToListenListEntry } from '../../entities/want-to-listen-list-entry/want-to-listen-list-entry.model';
import { Account } from '../../core/auth/account.model';
import { AccountService } from '../../core/auth/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-add-new-want-to-listen-item',
  templateUrl: './add-new-want-to-listen-item.component.html',
  styleUrls: ['./add-new-want-to-listen-item.component.scss'],
})
export class AddNewWantToListenItemComponent implements OnInit {
  constructor(private service: WantToListenService, private http: HttpClient, private accService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  @Input() itemURI!: string;
  @Input() userID!: string;

  protected addNewItem(): void {
    // Get user ID , check User login state
    this.accService.identity().subscribe(acc => {
      if (acc) {
        // if user logged in, then
        this.userID = acc.login;
        this.service.addNewItem(this.itemURI, this.userID).subscribe().unsubscribe(); //Add item to backend
        console.log('Item: ' + this.itemURI + 'have added to User: ' + this.userID);
      } else {
        // if user have not logged in, then navigate to the login page
        console.log('User have not logged in');
        this.router.navigate(['/login']);
      }
    });
  }

  protected readonly faPlusSquare = faPlusSquare;
}
