import { Observer } from './Observer';
import { Subscription } from './Subscription';
export declare class Subscriber<T> extends Subscription implements Observer<T> {
    static create<T>(next?: (x?: T) => void, error?: (e?: any) => void, complete?: () => void): Subscriber<T>;
    protected isStopped: boolean;
    protected destination: Observer<any>;
    constructor(destination?: Observer<any>);
    next(value?: T): void;
    error(err?: any): void;
    complete(): void;
    unsubscribe(): void;
    protected _next(value: T): void;
    protected _error(err: any): void;
    protected _complete(): void;
}
