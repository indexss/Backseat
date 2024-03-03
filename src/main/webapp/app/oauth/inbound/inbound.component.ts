import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApplicationConfigService} from "../../core/config/application-config.service";

export class CodeRequest {
  constructor(
    public code: string,
    public state: string
  ) {}
}

export class CodeResponse {
  constructor(
    public displayName: string,
  ) {}
}

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

  nextURL: string = "/";
  displayName: string = "";

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService, private route: ActivatedRoute, private router: Router) { }

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

    let respBody = new CodeRequest(
      this.code, this.state
    );

    this.http.post<CodeResponse>(this.applicationConfigService.getEndpointFor("api/oauth/store-result"), respBody).subscribe(resp => {
      // a-ok!
      this.displayName = resp.displayName;
      this.pageState = this.pageState_ready;
      window.setTimeout(() => {
        this.router.navigateByUrl(this.nextURL);
      }, 3000);
    })
  }
}
