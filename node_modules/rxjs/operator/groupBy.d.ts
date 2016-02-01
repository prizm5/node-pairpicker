import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
import { Observable } from '../Observable';
import { GroupedObservable } from './groupBy-support';
export declare function groupBy<T, K, R>(keySelector: (value: T) => K, elementSelector?: (value: T) => R, durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>): GroupByObservable<T, K, R>;
export declare class GroupByObservable<T, K, R> extends Observable<GroupedObservable<K, R>> {
    source: Observable<T>;
    private keySelector;
    private elementSelector;
    private durationSelector;
    constructor(source: Observable<T>, keySelector: (value: T) => K, elementSelector?: (value: T) => R, durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>);
    _subscribe(subscriber: Subscriber<any>): Subscription;
}
