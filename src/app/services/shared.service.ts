import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class SharedService {
    public aNewUsers: Array<any>;
    public nUsersLength: number;

    constructor() {
        this.aNewUsers = new Array<any>();
        this.nUsersLength = 0;
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
                name: 'Sun',
                index: 1
            },
            {
                name: 'Mon',
                index: 2
            },
            {
                name: 'Tue',
                index: 3
            },
            {
                name: 'Wed',
                index: 4
            },
            {
                name: 'Thu',
                index: 5
            },
            {
                name: 'Fri',
                index: 6
            },
            {
                name: 'Sat',
                index: 7
            }
        ]);
    }

}
