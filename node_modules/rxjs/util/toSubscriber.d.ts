import { Observer } from '../Observer';
import { Subscriber } from '../Subscriber';
export declare function toSubscriber<T>(next?: Observer<T> | ((value: T) => void), error?: (error: any) => void, complete?: () => void): Subscriber<T>;
