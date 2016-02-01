import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
export declare class FromEventObservable<T, R> extends Observable<T> {
    private sourceObj;
    private eventName;
    private selector;
    static create<T>(sourceObj: any, eventName: string, selector?: (...args: Array<any>) => T): FromEventObservable<T, {}>;
    constructor(sourceObj: any, eventName: string, selector?: (...args: Array<any>) => T);
    private static setupSubscription<T>(sourceObj, eventName, handler, subscriber);
    _subscribe(subscriber: Subscriber<T>): void;
}
