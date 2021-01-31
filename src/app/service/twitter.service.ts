import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  'user-key': '68efea89d7ceebfbba8bc168e193af2b' })
};

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  private apiEndPoint: string = "http://localhost:3000/";
  private zomatoLocation: string = 'https://developers.zomato.com/api/v2.1/cities?lat=';
  private zomatoLocationres: string = 'https://developers.zomato.com/api/v2.1/search?lat=';

  constructor(private http: HttpClient) { }

  getlocation( lng : number, lat: number): Observable<any>{
    return this.http.get(this.zomatoLocationres + lat +'&lon='+ lng +'&radius=2000', httpOptions);
  }

  getTweets(): Observable<any> {
    return this.http.get(this.apiEndPoint + 'home_timeline', httpOptions);
  }
}