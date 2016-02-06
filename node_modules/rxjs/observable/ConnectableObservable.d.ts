import { Subject } from '../Subject';
import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
export declare class ConnectableObservable<T> extends Observable<T> {
    source: Observable<T>;
    protected subjectFactory: () => Subject<T>;
    subject: Subject<T>;
    subscription: Subscription;
    constructor(source: Observable<T>, subjectFactory: () => Subject<T>);
    _subscribe(subscriber: Subscriber<T>): Subscription;
    _getSubject(): Subject<T>;
    connect(): Subscription;
    refCount(): Observable<T>;
}
