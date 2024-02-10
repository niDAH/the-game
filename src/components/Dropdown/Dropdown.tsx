import {
    createRef,
    useState,
    // MutableRefObject,
    useEffect,
} from 'react';
import cn from 'classnames';
import { v4 as uuid } from 'uuid';

import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
// import { useOnClickOutside } from '../../hooks/useOnClickOutside'; // replace with something that doesn't suck

// Dropdown component
interface IDropdownProps {
    disabled?: boolean;
    id: string;
    label: string | JSX.Element;
    labelClasses?: string;
    onClick: (option: IDropdownOptionProps) => void;
    options: IDropdownOptionProps[];
    startOpen?: boolean;
}

// Dropdown option component
export interface IDropdownOptionProps {
    label: string;
    value: string;
    [key: string]: any; // allows additional props to be passed in
}

/**
 * Standard dropdown component
 * @param  props {IDropdownProps}
 * @param  props.label The label for the dropdown
 * @param  props.onChange The onChange function, called after mouseup
 * @param  props.options The options for the dropdown
 *
 * @returns JSX.Element
 */
function Dropdown({
    disabled = false,
    id = uuid(),
    label,
    labelClasses,
    onClick,
    options,
    startOpen = false,
}: IDropdownProps): JSX.Element {
    const [open, setOpen] = useState(startOpen);
    const ref = createRef<HTMLDivElement>(); // had to use a createRef instead of useRef to get the type to work

    // const dropdownClasses = );

    function handleClick(option: any): void {
        setOpen(false);
        if (onClick) onClick(option);
    }

    useEffect(() => {
        if (startOpen) {
            setOpen(true);
        }
    }, [startOpen]);

    // useOnClickOutside(ref.current as unknown as MutableRefObject<HTMLElement>, () => { setOpen(false); });

    return (
        <div
            className={cn({
                dropdown: true,
                'dropdown-open': open,
            })}
            ref={ref}
        >
            <label
                tabIndex={0}
                className={cn([{
                    'flex items-center cursor-pointer': true,
                    'text-gray-400 italic': disabled,
                    [`${labelClasses as string}`]: labelClasses !== undefined,
                }])}
                onClick={() => { if (!disabled) setOpen((prev) => !prev); }}
            >
                <div className="flex items-center">
                    {label}
                    <div className="margin-left-auto p-0">
                        {open ? <FiChevronUp /> : <FiChevronDown />}
                    </div>
                </div>
            </label>

            <ul
                id={id}
                // add hidden class when the dropdown is not open
                className={cn({
                    'dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52': true,
                    hidden: !open,
                })}
                tabIndex={0}
            >
                {options.map((option) => (
                    <li
                        className="text-sm"
                        key={option.value}
                        role="option"
                        tabIndex={0}
                    >
                        <a
                            onClick={() => { handleClick(option); }}
                        >
                            {option.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dropdown;
