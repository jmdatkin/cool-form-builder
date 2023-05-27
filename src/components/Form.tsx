import { AnimatePresence, motion } from "framer-motion";
import { ChangeEventHandler, useState } from "react";
import { FormData, FormField, FormType } from "../types/FormField";
import InputNumber from "./InputNumber";
import FormInputText from "./FormInputText";
import ProgressBar from "./ProgressBar";

type Props = {
    forms: FormData,
    onSubmit: Function
};

function Form(props: Props) {

    const condenseFormFields = function (forms: FormData) {
        const fields: { [key: string]: any } = {};

        for (const page of forms) {
            for (const field of page.fields) {
                fields[field.name] = ''
            }
        }
        return fields;
    };

    const [pageIndex, setPageIndex] = useState(0);

    const [data, setData] = useState(condenseFormFields(props.forms))

    const [complete, setComplete] = useState(false);

    const reset = function () {
        setPageIndex(0);
        setData(condenseFormFields(props.forms));
        setComplete(false);
    }

    const createChangeHandler = function (name: string) {
        return (value: any) => setData({ ...data, [name]: value });
    };

    const submitHandler = function (e: any) {
        e.preventDefault();
        setComplete(true);
        props.onSubmit(data);
    };

    const renderForm = function (idx: number) {
        const formPage = props.forms[idx];

        return (
            <motion.div key={idx} className="absolute w-full h-full"
                initial={{ left: '200px', opacity: 0 }}
                animate={{ left: '0', opacity: 1 }}
                exit={{ left: '-200px', opacity: 0 }}
            >
                <h1 className="mb-6">{formPage.title}</h1>
                <form className="flex flex-col h-full w-full space-y-4" onSubmit={(e) => { e.preventDefault(); setPageIndex(pageIndex + 1) }}>
                    {formPage.fields.map((field) => {
                        return (
                            <>
                                {
                                    field.type === FormType.text || !field.type ?
                                        <FormInputText placeholder={field.label} initialValue={data[field.name]} key={`${idx}${field.name}`} autoFocus onChange={createChangeHandler(field.name)}></FormInputText> :
                                        field.type === FormType.number ?
                                            <InputNumber placeholder={field.label} initialValue={data[field.name]} key={`${idx}${field.name}`} autoFocus onChange={createChangeHandler(field.name)}></InputNumber> :
                                            ''
                                }
                            </>
                        )
                    })}
                    <div className="grow flex flex-col justify-around">
                        {idx >= props.forms.length - 1 ? <button onClick={submitHandler}>Submit</button> : ''}
                    </div>
                </form>
            </motion.div>
        )
    }

    return (
        <div className="w-full h-full overflow-hidden">
            <ProgressBar numSteps={props.forms.length} currentStep={pageIndex}></ProgressBar>
            <div className="h-full flex flex-col w-full items-center justify-around max-w-[56rem] p-6 mx-auto relative">
                <AnimatePresence>
                    <motion.div key={complete ? 1 : 0} className="absolute p-6 w-full h-full flex flex-col items-center justify-around"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {!complete ?
                            <>
                                <div className="relative w-full">
                                    <AnimatePresence>
                                        {renderForm(pageIndex)}
                                    </AnimatePresence>
                                </div>
                                <div className="flex w-full justify-between h-12">
                                    <button className={`${pageIndex <= 0 ? '' : ''} button-outline`} disabled={pageIndex <= 0} onClick={() => setPageIndex(pageIndex - 1)}>Prev</button>
                                    <button className={`${pageIndex >= props.forms.length - 1 ? '' : ''} button-outline`} disabled={pageIndex >= props.forms.length - 1} onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
                                </div>
                            </> :
                            <div className="relative w-full flex flex-col space-y-4">
                                <h1>Results</h1>
                                {Object.keys(data).map((key) => {
                                    return (
                                        <div key={key} className="flex flex-col">
                                            <span className="font-medium">{key}</span>
                                            <span>{data[key]}</span>
                                        </div>
                                    );
                                })}
                                <button onClick={() => reset()}>Reset</button>
                            </div>
                        }
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Form;