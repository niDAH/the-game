import { v4 as uuid } from 'uuid';

interface IInputTextProps {
    disabled?: boolean;
    label: JSX.Element | string;
    id?: string;
    key?: string;
    name: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string | undefined;
    value: string;
}

/**
 * Standard input text component w/label
 * @param  props {IInputTextProps}
 * @param  props.label The label for the input, text or JSX.Element
 * @param  [props.id] The id for the input, defaults to uuid
 * @param  [props.key] The key for the input (will fallback to id if not provided)
 * @param  props.name The name for the input
 * @param  props.onBlur (optional) The onBlur function, called after focusout
 * @param  props.onChange The onChange function, called after keyup
 * @param  props.placeholder (optional) The placeholder for the input
 * @param  props.value The value for the input
 *
 * @returns JSX.Element JSX.Element
 */

function InputText({
    disabled = false,
    label,
    id = uuid(),
    key,
    name,
    onBlur,
    onChange,
    placeholder = '',
    value,
}: IInputTextProps): JSX.Element {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-sm font-bold text-gray-500">
                {label}
            </label>

            <input
                className="input input-bordered input-sm w-full"
                disabled={disabled}
                id={id}
                key={key ?? id}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={placeholder}
                type="text"
                value={value}
            />
        </div>
    );
}

export default InputText;
