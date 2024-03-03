import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApplicationConfigService} from "../../core/config/application-config.service";

export class URLResponse {
  constructor(
    public url: string
  ) {}
}


@Component({
  selector: 'jhi-outbound',
  templateUrl: './outbound.component.html',
  styleUrls: ['./outbound.component.scss']
})
export class OutboundComponent implements OnInit {

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) { }

  redirectURL: string | null = null;

  ngOnInit(): void {
    this.http.get<URLResponse>(this.applicationConfigService.getEndpointFor("api/oauth/get-url")).subscribe(resp => {
      this.redirectURL = resp.url;
      window.location.replace(this.redirectURL);
    });
  }
}
