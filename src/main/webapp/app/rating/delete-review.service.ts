import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteReviewService {
  constructor(private http: HttpClient) {}

  deleteReview(id: string): Observable<any> {
    const url = 'api/rating/deleteReview';
    const body = {
      id: id,
      content: '',
      rating: 0,
    };
    return this.http.post(url, body);
  }
}
