import { Subscription } from '../Subscription';
import { Subject } from '../Subject';
import { Subscriber } from '../Subscriber';
import { Observable } from '../Observable';
export declare class RefCountSubscription extends Subscription {
    primary: Subscription;
    attemptedToUnsubscribePrimary: boolean;
    count: number;
    constructor();
    setPrimary(subscription: Subscription): void;
    unsubscribe(): void;
}
export declare class GroupedObservable<K, T> extends Observable<T> {
    key: K;
    private groupSubject;
    private refCountSubscription;
    constructor(key: K, groupSubject: Subject<T>, refCountSubscription?: RefCountSubscription);
    _subscribe(subscriber: Subscriber<T>): Subscription;
}
export declare class InnerRefCountSubscription extends Subscription {
    private parent;
    constructor(parent: RefCountSubscription);
    unsubscribe(): void;
}
