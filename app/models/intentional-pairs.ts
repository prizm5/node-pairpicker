import {Person} from '../models/person';
import {State} from '../models/person';

export class IntentionalPairs {
  private intentionalPairs: { [name: string]: Person };

  constructor () {
    this.intentionalPairs = {}
  }

  /**
   * Return an array of the pairs of peeps that are intentionally pairing together.
   */
  public getAllIntentionalPairs (): [Person, Person][] {
    var u = Object.keys(this.intentionalPairs).reduce<[[Person, Person][], { string: string }]>(([pairs, seen], name) => {
      if (!(name in seen)) {
        let first = this.intentionalPairs[name];
        let other = this.intentionalPairs[first.name];
        let pair: [Person, Person] = [first, other];

        return [
          pairs.concat([pair]),
          Object.assign(seen, {
            [first.name]: first.name,
            [other.name]: other.name
          })
        ];
      } else {
        return [pairs, seen];
      }
    }, <[[Person, Person][], { string: string }]> [[], {}]);
    return u[0];
  }

  /**
   * Return the other peep that the given peep is intentionally pairing with, if any
   */
  public getIntentionalPairOf (peep: Person): Person {
    return this.intentionalPairs[peep.name];
  }

  /**
   * Put the given peeps together in an intentional pair, removing any other intentional pairs they were previously in
   */
  public assignIntentionalPair (peep: Person, otherPeep: Person): void {
    this.removeIntentionalPairOf(peep);
    this.removeIntentionalPairOf(otherPeep);

    peep.state = State.IntentionalPairing;
    otherPeep.state = State.IntentionalPairing;

    this.intentionalPairs[peep.name] = otherPeep;
    this.intentionalPairs[otherPeep.name] = peep;
  }

  /**
   * Remove the given peep from whatever intentional pair she was in
   */
  public removeIntentionalPairOf (peep: Person): void {
    let otherPeep: Person = this.intentionalPairs[peep.name];

    if (otherPeep) {
      otherPeep.state = State.RandomPairing;
      delete this.intentionalPairs[this.intentionalPairs[peep.name].name];
    }

    delete this.intentionalPairs[peep.name];
  }
}
