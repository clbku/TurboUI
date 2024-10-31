import { useEffect, useRef } from 'react';
import './FloatInput.css';

type FloatInputProps = {
    location: { x: number, y: number };
    defaultValue?: string;
    fontSize?: number;
    color?: string;

    onChange: (value?: string) => void;
    onClose: () => void;
} & Omit<React.HTMLProps<HTMLInputElement>, 'onChange'>;

export const FloatInput: React.FC<FloatInputProps> = (props) =>
{
    const { defaultValue, fontSize = 40, color, onClose, onChange, ...rest } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);

    const valueRef = useRef(defaultValue);

    useEffect(() =>
    {
        if (inputRef.current)
        {
            const delta = inputRef.current.clientHeight - fontSize;
            inputRef.current.style.top = `${props.location.y - inputRef.current.clientHeight / 2 - delta / 2}px`;
        }
    }, []);

    return (
        <>
            <div
                className="float-input-overlay-mask"
                onClick={() => onChange(valueRef.current)}
            />
            <input
                ref={inputRef}
                {...rest}
                style={{ left: props.location.x, fontSize, color }}
                className='float-input'
                defaultValue={defaultValue}
                autoFocus
                onChange={(e) => valueRef.current = e.target.value}
            />
        </>
    );
};
