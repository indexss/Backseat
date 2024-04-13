import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchText: any;
  heroes = [
    { id: 11, name: 'Mr. Nice', country: 'India' },
    { id: 12, name: 'Narco', country: 'USA' },
    { id: 13, name: 'Bombasto', country: 'UK' },
    { id: 14, name: 'Celeritas', country: 'Canada' },
    { id: 15, name: 'Magenta', country: 'Russia' },
    { id: 16, name: 'RubberMan', country: 'China' },
    { id: 17, name: 'Dynama', country: 'Germany' },
    { id: 18, name: 'Dr IQ', country: 'Hong Kong' },
    { id: 19, name: 'Magma', country: 'South Africa' },
    { id: 20, name: 'Tornado', country: 'Sri Lanka' },
  ];
  constructor() {}

  ngOnInit(): void {
    console.log('ksdj1');
  }

  get filteredHeroes() {
    return this.searchText ? this.heroes.filter(hero => hero.name.toLowerCase().includes(this.searchText.toLowerCase())) : this.heroes;
  }
}
