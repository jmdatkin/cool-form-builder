import { useEffect, useState } from "react";
import { dispatch } from "use-bus";
import { FormField } from "../types/FormField";
import FormInputText from "./FormInputText";

type Props = {
    data: any,
    index: number,
    deleteSelf: Function
};

function FormBuilderPage(props: Props) {

    const [title, setTitle] = useState('');
    const [fields, setFields] = useState<FormField[]>([]);

    const addField = function () {
        setFields([...fields, { name: '', label: '' }])
    }

    useEffect(() => {
        dispatch({ type: 'formBuilderPageUpdate', payload: { idx: props.index, data: { title, fields } } });
    }, [title, fields]);

    return (
        <div className="flex flex-col p-6 border">
            <div className="flex w-full justify-between items-center">
                <h2 className="mb-4">Page {props.index + 1}</h2>
                <button onClick={() => props.deleteSelf()}></button>
            </div>
            <span>Title</span>
            <FormInputText className="mb-4 ml-4 text-lg p-2" placeholder="Title" onChange={setTitle}></FormInputText>
            <span>Fields</span>
            {fields.map((field, idx) => {
                return <div key={idx} className="flex flex-col ml-4 relative">
                    <span className="top-2 left-[-1rem] absolute">{idx + 1}</span>
                    <FormInputText className="text-lg p-2" placeholder="Label" onChange={(value: any) =>
                        setFields(fields.map((innerField: any, innerIdx: any) => {
                            // if (innerField.name === field.name) {
                            if (idx === innerIdx) {
                                return {
                                    ...innerField,
                                    label: value
                                };
                            } else {
                                return innerField;
                            }
                        }))
                    }></FormInputText>
                    <FormInputText className="text-lg p-2 mb-4" placeholder="Key" onChange={(value: any) =>
                        setFields(fields.map((innerField: any, innerIdx: any) => {
                            // if (innerField.name === field.name) {
                            if (idx === innerIdx) {
                                return {
                                    ...innerField,
                                    name: value
                                };
                            } else {
                                return innerField;
                            }
                        }))
                    }></FormInputText>
                </div>
            })}
            <button onClick={addField}>+ Field</button>
        </div>
    );
}

export default FormBuilderPage;