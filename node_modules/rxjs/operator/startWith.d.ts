import { Scheduler } from '../Scheduler';
import { Observable } from '../Observable';
export declare function startWith<T>(...array: Array<T | Scheduler>): Observable<T>;
