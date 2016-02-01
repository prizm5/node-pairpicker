import { Action } from './Action';
import { FutureAction } from './FutureAction';
export declare class AnimationFrameAction<T> extends FutureAction<T> {
    _schedule(state?: any, delay?: number): Action;
    _unsubscribe(): void;
}
