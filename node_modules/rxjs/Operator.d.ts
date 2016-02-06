import { Subscriber } from './Subscriber';
export declare class Operator<T, R> {
    call<T, R>(subscriber: Subscriber<R>): Subscriber<T>;
}
