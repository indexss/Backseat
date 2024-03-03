import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddReviewService {
  constructor(private http: HttpClient) {}

  submitReview(rating: number, content: string, id: string): Observable<any> {
    const url = 'api/addreview';
    const body = {
      rating: rating,
      content: content,
      id: id,
    };
    return this.http.post(url, body);
  }
}
