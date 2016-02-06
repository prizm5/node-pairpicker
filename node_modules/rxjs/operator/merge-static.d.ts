import { Scheduler } from '../Scheduler';
import { Observable } from '../Observable';
export declare function merge<T, R>(...observables: Array<Observable<any> | Scheduler | number>): Observable<R>;
