import { ChangeEventHandler, useState } from "react";

type Props = {
    onChange: Function,
    initialValue?: number,
    [key: string]: any
};

function InputNumber(props: Props) {

    const {onChange, initialValue, ...restProps} = props;

    const [value, setValue] = useState<number | null>(initialValue as number);
    const [error, setError] = useState('');

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = function(event) {
        const {value: newValue} = event.target;
        const re = RegExp('[^0-9]');    // String has non-numeric chars

        if (newValue === '') {
            setValue(null);
            props.onChange(null);
        }
        else if (re.test(newValue)) {
            setError("Please input a numeric value.");
        } else {
            setError('');
            setValue(parseInt(newValue));
            props.onChange(parseInt(newValue));
        }
    }

    return ( 
        <>
        <input className="form-input" type="text" onChange={onChangeHandler} {...restProps} value={value === null ? '' : value}></input>
        {error !== '' ? <span className="text-red-600 font-medium">{error}</span> : ''}
        </>
     );
}

InputNumber.defaultProps = { initialValue: 0 }

export default InputNumber;