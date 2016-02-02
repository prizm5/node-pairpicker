import {Injectable} from 'angular2/core';
import {Person} from '../models/person'
import {Pairing} from '../models/pair'
import {Team} from '../models/team'
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NameService {
    private headers: Headers;
    constructor(private http: Http) { 
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    
    getTeam(t: string) {
        return this.http.get('api/data/' + t)
            .map(res => <Person[]>res.json())
            .catch(this.logAndPassOn);
    }
 
    sendToSlack(p: Pairing) {       
        return this.http.post('api',
            JSON.stringify(p),
            { headers: this.headers })
            .catch(this.logAndPassOn);
    }
    
    savePair(p: Pairing) {       
        return this.http.post('api/savePair',
            JSON.stringify(p),
            { headers: this.headers })
            .catch(this.logAndPassOn);
    }
    
    moveTeam(p:string, teamname:string){
        var url = '';
        switch(teamname){
            case "cloud":
                url = 'api/moveToDev';
                break;
            case "V5":
                url = 'api/moveToCloud';
                break;
        }
        return this.http.post(url,JSON.stringify({name: p}),
            { headers: this.headers })
            .catch(this.logAndPassOn);
    }

    private logAndPassOn(error: Error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error);
    }
}

