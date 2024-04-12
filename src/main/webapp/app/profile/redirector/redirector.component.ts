import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../core/auth/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'jhi-redirector',
  templateUrl: './redirector.component.html',
  styleUrls: ['./redirector.component.scss']
})
export class RedirectorComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe((acc) => {
      if (acc == null) {
        // Not logged in - not sure where this is supposed to be going so redirect to home
        this.router.navigateByUrl("/");
        return;
      }

      this.router.navigate(["profile", acc.login]);
    });
  }

}
