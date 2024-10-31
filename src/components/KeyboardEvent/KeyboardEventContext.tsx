import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { KeyCode } from './keys';

type Key = KeyCode;

type KeyboardEventContextProps = {
    holdingKeys: Set<Key>;

    bindKeys: (key: Key[], callback: (e: KeyboardEvent) => void) => void;
};

const KeyboardEventContext = createContext<KeyboardEventContextProps>({
    holdingKeys: new Set<Key>(),
    bindKeys: () => {},
});

export const useKeyboardEvent = (): KeyboardEventContextProps =>
{
    return useContext(KeyboardEventContext);
};

export const KeyboardEventProvider: React.FC<PropsWithChildren<{}>> = ({ children }) =>
{
    const [holding, setHolding] = useState<Set<Key>>(new Set<Key>());
    const keyBindings = useRef<{ [key: string]: (e: KeyboardEvent) => void }>();

    const bindKeys = (key: Key[], callback: (e: KeyboardEvent) => void) =>
    {
        keyBindings.current = {
            ...keyBindings.current,
            [key.join(' + ').toLowerCase()]: callback,
        };
    };

    useEffect(() =>
    {
        const handleKeyPress = (e: KeyboardEvent) =>
        {
            const keys = new Set<KeyCode>();

            if (e.ctrlKey) {keys.add(KeyCode.Control);}
            if (e.shiftKey) { keys.add(KeyCode.Shift); }
            if (e.altKey) { keys.add(KeyCode.Alt); }
            if (e.metaKey) { keys.add(KeyCode.MetaLeft); }

            keys.add(e.key as KeyCode);

            console.log('keys', keys, keyBindings.current);

            const callback = keyBindings.current?.[Array.from(keys).join(' + ').toLowerCase()];
            if (callback)
            {
                e.preventDefault();
                callback(e);
            }
        };
        window.addEventListener('keydown', handleKeyPress);

        return () =>
        {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <KeyboardEventContext.Provider value={{ holdingKeys: holding, bindKeys }}>
            {children}
        </KeyboardEventContext.Provider>
    );
};
