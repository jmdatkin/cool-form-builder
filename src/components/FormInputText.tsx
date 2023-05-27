import { ChangeEventHandler, useState } from "react";

type Props = {
    // onChange: ChangeEventHandler<HTMLInputElement>,
    onChange: Function,
    initialValue?: string,
    required?: boolean,
    className?: string,
    [key: string]: any
};

function FormInputText(props: Props) {

    const { onChange, initialValue, required, className, ...restProps } = props;

    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState('');

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = function (event) {
        const { value: newValue } = event.target;

        setValue(newValue);
        props.onChange(newValue);
    };

    return (
        <>
        <input className={`${className} form-input`} type="text" onChange={onChangeHandler} {...restProps} value={value === null ? '' : value}></input>
        {error !== '' ? <span className="text-red-600 font-medium">{error}</span> : ''}
        </>
    );
}

FormInputText.defaultProps = {
    initialValue: '',
    required: false
};

export default FormInputText;