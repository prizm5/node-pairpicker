import {Injectable} from 'angular2/core';
import {Person} from '../models/person';
import {Pairing} from '../models/pairing';
import {Team} from '../models/team';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NameService {
  private headers: Headers;
  private searchtoken = window.location.search;

  constructor (private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  getTeam () {
    return this.http.get('api/data/team' + this.searchtoken)
      .map(res => res.json())
      .catch(this.logAndPassOn);
  }

  getPairCounts () {
    return this.http.get('api/data/paircounts' + this.searchtoken)
      .map(res => res.json())
      .catch(this.logAndPassOn);
  }

  sendToSlack (p: Pairing) {
    return this.http.post('api' + this.searchtoken,
      JSON.stringify(p),
      { headers: this.headers })
      .catch(this.logAndPassOn);
  }

  savePair (p: Pairing) {
    return this.http.post('api/savePair' + this.searchtoken,
      JSON.stringify(p),
      { headers: this.headers })
      .catch(this.logAndPassOn);
  }

  moveTeam (p: string, teamname: string) {
    var url = '';
    switch (teamname) {
      case "Cloud":
        url = 'api/moveToDev';
        break;
      case "V5":
        url = 'api/moveToCloud';
        break;
    }
    return this.http.post(url + this.searchtoken, JSON.stringify({ name: p }),
      { headers: this.headers })
      .catch(this.logAndPassOn);
  }

  private logAndPassOn (error: Error) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error);
  }
}

