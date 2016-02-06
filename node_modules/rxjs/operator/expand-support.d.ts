import { Operator } from '../Operator';
import { Scheduler } from '../Scheduler';
import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
import { OuterSubscriber } from '../OuterSubscriber';
import { Observable } from '../Observable';
export declare class ExpandOperator<T, R> implements Operator<T, R> {
    private project;
    private concurrent;
    private scheduler;
    constructor(project: (value: T, index: number) => Observable<R>, concurrent: number, scheduler: Scheduler);
    call(subscriber: Subscriber<R>): Subscriber<T>;
}
export declare class ExpandSubscriber<T, R> extends OuterSubscriber<T, R> {
    private project;
    private concurrent;
    private scheduler;
    private index;
    private active;
    private hasCompleted;
    private buffer;
    constructor(destination: Subscriber<R>, project: (value: T, index: number) => Observable<R>, concurrent: number, scheduler: Scheduler);
    private static dispatch({subscriber, result, value, index});
    protected _next(value: any): void;
    private subscribeToProjection(result, value, index);
    protected _complete(): void;
    notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number): void;
    notifyComplete(innerSub: Subscription): void;
}
