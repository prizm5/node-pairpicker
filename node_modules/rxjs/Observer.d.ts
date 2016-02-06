export interface Observer<T> {
    isUnsubscribed: boolean;
    next(value: T): void;
    error(error: any): void;
    complete(): void;
}
export declare const empty: Observer<any>;
