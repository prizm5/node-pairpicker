import {Injectable} from 'angular2/core';
import {Pairing} from '../models/pairing';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NameService {
  private headers: Headers;
  private searchtoken: string;

  constructor (private http: Http) {
    if(!this.searchtoken) this.searchtoken = window.location.search;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  getSecureRoute (url) {
    return this.http.get(url + this.searchtoken)
      .map(res => res.json())
      .catch(this.logAndPassOn);
  }
  getLastParing () { return this.getSecureRoute('api/data/last-paired'); }
  getTeam () { return this.getSecureRoute('api/data/team') } 
  getFullTeam () { return this.getSecureRoute('api/data/fullteam') } 
  getPairDetails () { return this.getSecureRoute('api/data/pairdetails') }
  getPairCounts () { return this.getSecureRoute('api/data/paircounts') }

  savePair (p: Pairing) {
    return this.http.post('api/savePair' + this.searchtoken,
      JSON.stringify(p),
      { headers: this.headers })
      .catch(this.logAndPassOn);
  }

  moveTeam (p: string, teamname: string) {
    var url = '';
    if (teamname.toLowerCase() === "cloud"){
        url = 'api/moveToDev';
    }
    if (teamname.toLowerCase() === "v5"){
        url = 'api/moveToCloud';
    }
    return this.http.post(url + this.searchtoken, JSON.stringify({ name: p }),
      { headers: this.headers })
      .catch(this.logAndPassOn);
  }

  private logAndPassOn (error: Error) {
    console.error(error);
    return Observable.throw(error);
  }
}

