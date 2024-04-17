import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  protected loading: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
