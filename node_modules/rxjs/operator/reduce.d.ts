import { Observable } from '../Observable';
export declare function reduce<T, R>(project: (acc: R, value: T) => R, seed?: R): Observable<R>;
