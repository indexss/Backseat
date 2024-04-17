import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApplicationConfigService} from "../core/config/application-config.service";
import {ReviewService} from "../entities/review/service/review.service";
import {IReview} from "../entities/review/review.model";

interface SpotifySearchResult {
  tracks: TrackBox;
}

interface TrackBox {
  items: SpotifyTrack[];
}

interface SpotifyTrack {
  name: string;
  uri: string;
  id: string;

  artists: SpotifyArtist[];
  album: SpotifyAlbum;
}

interface SpotifyArtist {
  name: string;
  id: string;
  uri: string;
}

interface SpotifyAlbum {
  name: string;
  id: string;
  uri: string;
  images: SpotifyImage[];
}

const getLargestAlbumImage = (album: SpotifyAlbum): SpotifyImage | null => {
  let max: number = 0;
  let maxIdx: number | null = null;
  for (let i = 0; i < album.images.length; i += 1) {
    let img = album.images[i];
    if (img.width > max) {
      max = img.width;
      maxIdx = i;
    }
  }

  if (maxIdx != null) {
    return album.images[maxIdx];
  }
  return null;
}

const joinTrackArtists = (track: SpotifyTrack): string => {
  return track.artists.map((v) => {return v.name}).join(", ");
}

interface SpotifyImage {
  height: number;
  width: number;
  url: string;
}

const debounce = (callback: Function, ms: number = 500) => {
  let timer = 0;
  return function(this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(this, args), ms)
  }
}

@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private appConfig: ApplicationConfigService,
  ) {}

  protected loading: boolean = false;

  protected spotifySearchResults: SpotifySearchResult | null = null;

  protected searchQuery: string = "";

  ngOnInit(): void {}

  protected searchImpl = debounce(() => {
    if (this.searchQuery == "") {
      this.spotifySearchResults = null;
      return;
    }

    this.loading = true
    this.makeSearchRequest(this.searchQuery);
  }, 500);

  doSearch(): void {
    this.searchImpl();
  }

  makeSearchRequest(query: string): void {
    this.http.get<SpotifySearchResult>(this.appConfig.getEndpointFor("/api/search/do") + "?q=" + encodeURIComponent(query)).subscribe({
      next: (res) => {
        this.spotifySearchResults = res;
      },
      error: (err) => {
        alert("Failed to search!\n" + JSON.stringify(err));
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  protected readonly getLargestAlbumImage = getLargestAlbumImage;
  protected readonly joinTrackArtists = joinTrackArtists;
}
