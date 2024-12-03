import { InputProps } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { useMemo } from 'react';

type IMask = {
    mask: string;
    regex: string;
} & {[key: string]: any};

type InputMaskProps = InputProps & {
    value?: any,
    defaultValue?: any,
    masks: IMask[];

    onMatch?: (mask?: IMask) => void;
}

// use ref to get access to internal "masked = ref.current.maskRef"

export const InputMask: React.FC<InputMaskProps> = (props) =>
{
    const { masks, onMatch, ...rest } = props;
    const mask = useMemo(() =>
    {
        return masks.map((m) => ({
            mask: m.mask,
            regex: new RegExp(m.regex),
            lazy: true,
        }));
    }, []);

    return (
        <MaskedInput
            {...rest}
            mask={mask}
            maskOptions={{
                placeholderChar: '*',
                dispatch: function (appended, dynamicMasked): any
                {
                    const number = (dynamicMasked.value + appended).replace(/\D/g, '');

                    for (let i = 0; i < dynamicMasked.compiledMasks.length; i++)
                    {
                        const regex = (dynamicMasked.compiledMasks[i] as any)?.regex;
                        if (regex)
                        {
                            const re = new RegExp(regex);
                            if (number.match(re) !== null)
                            {
                                onMatch?.(masks[i]);
                                return dynamicMasked.compiledMasks[i];
                            }
                        }
                    }

                    return dynamicMasked.compiledMasks[0];
                },
            }}
        />
    );
};
