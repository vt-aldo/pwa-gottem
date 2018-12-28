import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  getNews(): Observable<any> {
    return this.http
      .get<any>(
        'https://us-central1-gottem-b0b2b.cloudfunctions.net/endpoints/news'
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  constructor(private http: HttpClient) { }
}
