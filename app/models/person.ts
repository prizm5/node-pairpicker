export enum State {
  RandomPairing,
  Odd,
  IntentionalPairing,
  Absent
}

export interface Person {
  name: string;
  shouldPair: boolean;
  state: State;
}
