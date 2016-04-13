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

  getFoosball () {
    return this.http.get('api/data/foosball' + this.searchtoken)
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
    console.error(error);
    return Observable.throw(error);
  }
}

