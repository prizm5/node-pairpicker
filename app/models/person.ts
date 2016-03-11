export enum State {
    RandomPairing,
    IntentionalPairing,
    Odd,
    Absent
}

export interface Person {
    name: string;
    shouldPair: boolean;
    state: State;
}
