import { Observable } from '../Observable';
export declare function skipWhile<T>(predicate: (value: T, index: number) => boolean): Observable<T>;
