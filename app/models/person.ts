export enum State {
  RandomPairing,
  Odd,
  IntentionalPairing,
  Absent
}
export enum Team {
  V5,
  Cloud,
  QA,
  Reporting
}

export interface Person {
  name: string;
  nickname: string;
  shouldPair: boolean;
  state: State;
}
