import { Observable } from '../Observable';
export declare function mergeMap<T, R, R2>(project: (value: T, index: number) => Observable<R>, resultSelector?: (outerValue: T, innerValue: R, outerIndex: number, innerIndex: number) => R2 | number, concurrent?: number): Observable<R2>;
