import { Operator } from '../Operator';
import { Subscriber } from '../Subscriber';
import { OuterSubscriber } from '../OuterSubscriber';
export declare class RaceOperator<T, R> implements Operator<T, R> {
    call(subscriber: Subscriber<T>): Subscriber<T>;
}
export declare class RaceSubscriber<T, R> extends OuterSubscriber<T, R> {
    private hasFirst;
    private observables;
    private subscriptions;
    constructor(destination: Subscriber<T>);
    _next(observable: any): void;
    _complete(): void;
    notifyNext(observable: any, value: R, outerIndex: number): void;
}
