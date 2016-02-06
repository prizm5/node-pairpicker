import { Observable } from '../Observable';
/**
 * Returns an Observable that mirrors the first source Observable to emit an item.
 * @param {...Observables} ...observables sources used to race for which Observable emits first.
 * @returns {Observable} an Observable that mirrors the output of the first Observable to emit an item.
 */
export declare function race<T>(...observables: Array<Observable<any> | Array<Observable<any>>>): Observable<T>;
