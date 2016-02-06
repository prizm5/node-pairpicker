export enum State {
    Paring,
    Odd,
    Absent
}

export interface Person {
    name: string;
    shouldPair: boolean;
    state: State;
}
