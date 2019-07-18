import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class TableDataService {

  sUrl: string;

  constructor(
    private oHttp: HttpClient
  ) {
    this.sUrl = 'https://jsonplaceholder.typicode.com';
  }

  buscarUsuarios(): Observable<any> {
    return this.oHttp.get(`${this.sUrl}/users`);
  }

  buscarFotos(nUserId?: number): Observable<any> {
    return this.oHttp.get(`${this.sUrl}/photos?userId=${nUserId}`);
  }

  buscarAlbuns(): Observable<any> {
    return this.oHttp.get(`${this.sUrl}/albuns`);
  }

  buscarPosts(): Observable<any> {
    return this.oHttp.get(`${this.sUrl}/posts`);
  }

  rideInGroup(): Observable<any> {
    return of([
      {
        name: 'Always'
      },
      {
        name: 'Sometimes'
      },
      {
        name: 'Never'
      }
    ]);
  }

  daysOfWeek(): Observable<any> {
    return of([
      {
        name: 'Sun'
      },
      {
        name: 'Mon'
      },
      {
        name: 'Tue'
      },
      {
        name: 'Wed'
      },
      {
        name: 'Thu'
      },
      {
        name: 'Fri'
      },
      {
        name: 'Sat'
      }
    ]);
  }

}
