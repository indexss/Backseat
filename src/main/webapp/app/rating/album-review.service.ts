import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumReviewService {
  constructor(private http: HttpClient) {}

  submitReview(rating: number, content: string, id: string, AlbumBoolean: boolean): Observable<any> {
    const url = 'api/rating/addreview';
    const body = {
      rating: rating,
      content: content,
      id: id,
      // Album True, Track False
      AlbumBoolean: AlbumBoolean,
    };
    return this.http.post(url, body);
  }
}
