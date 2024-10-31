import { useRef, useState } from 'react';

import { createUniqueId } from '../utils/uniqueId';
import { isFunction, isObject } from '../utils/checkTypes';

const compareValues = (prev: Object, changed: Object): boolean =>
{
    let isSame = false;

    if (isObject(prev) && isObject(changed))
    {
        const changedKeys = <Array<keyof Object>>Object.keys(changed as Object);
        isSame = !changedKeys.some(key => prev[key] !== changed[key]);
    }

    return isSame;
};

type Dispatch<A> = (value: A) => void;
export type MergedStateAction<S> = Dispatch<S | ((prevState: S) => S)>;

export const useMergeState = <P> (initialState: Partial<P> | (() => Partial<P>)): [P, MergedStateAction<Partial<P>>] =>
{
    // The state below make ref is always live;
    const [, setKey] = useState('');

    const state = useRef<P>(initialState as P);

    const setState = (newState: Partial<P>) =>
    {
        state.current = { ...state.current, ...newState };
        setKey(createUniqueId());
    };

    const setMergedState: MergedStateAction<Partial<P>> = (param) =>
    {
        // Because old code sets state and makes it re-render multiple times with the same value.
        // So first, we have to compare them.
        // Then we will set state, if they have a change.
        const oldState = state.current;
        let newState = <Partial<P>>param;
        if (isFunction(param))
        {
            newState = param(oldState);
        }

        if (isObject(param) && isObject(oldState))
        {
            const isSame = compareValues(oldState as Object, newState as Object);
            if (isSame)
            {
                return;
            }
        }

        setState(newState);
    };

    return [state.current, setMergedState];
};
