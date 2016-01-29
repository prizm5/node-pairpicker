import {Injectable} from 'angular2/core';
import {Person} from '../models/person'
import {Team} from '../models/team'
import {Http, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NameService {
    constructor(private http: Http) {    }
        
    getTeam(t:string) {
                return this.http.get('api/data/' + t)
                .map(res =>  <Person[]> res.json())
                .catch(this.logAndPassOn);
    }
    
    private logAndPassOn (error: Error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error);
    }
}

