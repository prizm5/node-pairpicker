import { Observable } from '../Observable';
import { Scheduler } from '../Scheduler';
export declare function merge<T, R>(...observables: Array<Observable<any> | Scheduler | number>): Observable<R>;
