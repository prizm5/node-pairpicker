import { Subscriber } from './Subscriber';
import { InnerSubscriber } from './InnerSubscriber';
export declare class OuterSubscriber<T, R> extends Subscriber<T> {
    notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number): void;
    notifyError(error: any, innerSub: InnerSubscriber<T, R>): void;
    notifyComplete(innerSub: InnerSubscriber<T, R>): void;
}
