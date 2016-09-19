import {Component, EventEmitter} from "angular2/core";
import {Pairing} from "../models/pairing";

interface CountAndDate {
  count?: number;
  last_ts?: string
}

type PairType = string; // TODO: change type value from [string] to ["random" | "pairing"] when we go TS 1.8+

interface PairCountAndDate {
  pairing?: CountAndDate;
  intentional?: CountAndDate;
}

interface OddCountAndDate {
  odd: CountAndDate;
}

interface KeyValuePair<T> {
  key: string;
  value: T
}

@Component({
  styles: [],
  selector: "pairs-section",
  template: `
    <!-- Pairs Section -->
    <section class="success" id="pairs">
      <div class="container">
        <div class="row">
          <div class="col-sm-5 text-center" *ngIf="pairing.randomPairs.length > 0">
            <h3>Random</h3>
            <hr class="star-light" />
            <table class="table">
              <tbody>
                <tr *ngFor="#peep of pairing.randomPairs" class="modal-body">
                  <td>{{peep.split(" :: ")[0]}}</td>
                  <td>{{peep.split(" :: ")[1]}}</td>
                  <td>({{getPairCount(paircounts, "random", peep)}})</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm-5 text-center">
            <div *ngIf="pairing.intentionalPairs.length > 0 ">
              <h3>Intentional</h3>
              <hr class="star-light" />
              <table class="table">
                <tbody>
                  <tr *ngFor="#peep of pairing.intentionalPairs" class="modal-body">
                    <td>{{peep.split(" :: ")[0]}}</td>
                    <td>{{peep.split(" :: ")[1]}}</td>
                    <td>({{getPairCount(paircounts, "intentional", peep)}})</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div *ngIf="pairing.odd.length > 0">
              <h3>Odd</h3>
              <hr class="star-light" />
              <ul class="list-block">
                <li *ngFor="#peep of pairing.odd">{{peep}} ({{getCount(paircounts,peep)}})</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" *ngIf="foosball">
          <hr />
          <div class="col-sm-1 portfolio-item">
            <a href="#foosballModal" class="portfolio-link" data-toggle="modal">
              <button type="submit" class="btn btn-primary btn-lg" (click)="savePair()">Start Game</button>
            </a>
          </div>
        </div>
        <div class="row" [hidden]="!canSavePairs">
          <hr />
          <div class="col-sm-1 portfolio-item">
            <a href="#myModal" class="portfolio-link" data-toggle="modal">
              <button type="submit" class="btn btn-primary btn-lg" (click)="savePair()">Save</button>
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- Modal -->

    <div class="modal fade" id="foosballModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" >&times;</button>
            <h4 class="modal-title" id="myModalLabel">Foosballerz</h4>
          </div>
          <div class="modal-body">
            <p class="medium">Game Started</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> 
          </div>
        </div>
      <!-- /.modal-content -->
      </div>
    <!-- /.modal-dialog -->
    </div>
  <!-- /.modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" >&times;</button>
            <h4 class="modal-title" id="myModalLabel">Pairing</h4>
          </div>
          <div class="modal-body">
            <p class="medium">Saved</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      <!-- /.modal-content -->
      </div>
    <!-- /.modal-dialog -->
    </div>
  <!-- /.modal -->
  `,
  inputs: ["pairing", "paircounts", "oddcounts", "canSavePairs", "foosball"],
  outputs: ["onSavePairing", "onStartGame"],
})
export class Pairs {
  public pairing: Pairing;
  public onSavePairing = new EventEmitter();
  public onStartGame = new EventEmitter();
  public paircounts = {};
  public canSavePairs = false;
  public foosball = false;

  constructor() { }

  getPairCount(data: KeyValuePair<PairCountAndDate>[], pairType: PairType, name: string): string {
    return firstOrElse("0", data.filter(d => d.key == name).map(d => {
      let [timesPaired, lastPairedDate] = Pairs.unapplyCountAndDate(d.value[pairType === "random" ? "pairing" : "intentional"]);
      return `${timesPaired} : ${Pairs.stringifyDate(lastPairedDate)}`;
    }));
  }

  getCount(data: KeyValuePair<OddCountAndDate>[], name: string): string {
    return firstOrElse("0", data.filter(d => d.key == name).map(d => {
      let [timesOdd, oddDate] = Pairs.unapplyCountAndDate(d.value.odd);
      return `${timesOdd} : ${Pairs.stringifyDate(oddDate)}`;
    }));
  }

  savePair(): void {
    if (this.pairing.randomPairs.length > 0 || this.pairing.intentionalPairs.length > 0 || this.pairing.odd.length > 0) {
      if (this.foosball) {
        this.onStartGame.emit(this.pairing);
      } else {
        this.onSavePairing.emit(this.pairing);
      }
    }
  }

  private static neverBefore(): Date {
    return new Date("1969-12-31 23:59:59");
  }

  private static unapplyCountAndDate({ count = 0, last_ts = Pairs.neverBefore().toString() }: CountAndDate = {}): [number, Date] {
    return [count, new Date(last_ts.toString())];
  }

  private static stringifyDate(d: Date): string {
    return d.toDateString() === Pairs.neverBefore().toDateString() ? "N/A" : d.toLocaleDateString("en-US");
  }
}

function firstOrElse<T>(orElse: T, coll: T[]): T {
  return coll.length >= 1 ? coll[0] : orElse;
}
