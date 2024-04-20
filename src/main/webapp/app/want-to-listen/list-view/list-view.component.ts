import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import format from '@popperjs/core/lib/utils/format';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
  public itemList: listEntry[] = [];

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
          console.log(res.data.entryList);
        });
      } else {
        console.log('No login');
        this.router.navigate(['/login']);
      }
    });
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
