import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-outbound',
  templateUrl: './outbound.component.html',
  styleUrls: ['./outbound.component.scss']
})
export class OutboundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // TODO(txp271): get redirect URL from backend
  }

}
