import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'jhi-inbound',
  templateUrl: './inbound.component.html',
  styleUrls: ['./inbound.component.scss']
})
export class InboundComponent implements OnInit {

  pageState_error: string = "error";
  pageState_ready: string = "ready";
  pageState: string = "";

  errorMessage: string = "";

  state: string = "";
  code: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const pm: ParamMap = this.route.snapshot.queryParamMap;

    if (!pm.get("state")) {
      this.errorMessage = "Missing state";
      this.pageState = this.pageState_error;
      return;
    }

    if (pm.get("error")) {
      this.errorMessage = <string>pm.get("error");
      this.pageState = this.pageState_error;
      return;
    }

    if (!pm.get("code")) {
      this.errorMessage = "Missing code";
      this.pageState = this.pageState_error;
      return;
    } else {
      this.code = <string>pm.get("code");
      this.state = <string>pm.get("state");
    }

    // TODO(txp271): communicate this to the backend

    this.pageState = this.pageState_ready;
  }
}
