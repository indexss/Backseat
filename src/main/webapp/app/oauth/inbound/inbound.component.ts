import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'jhi-inbound',
  templateUrl: './inbound.component.html',
  styleUrls: ['./inbound.component.scss']
})
export class InboundComponent implements OnInit {

  requestParams: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const pm: ParamMap = this.route.snapshot.queryParamMap;
    this.requestParams = pm.keys.reduce((acc, key) => {
      return acc + `${key}=${pm.get(key)} `
    }, "");
  }
}
