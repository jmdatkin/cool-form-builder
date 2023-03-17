import { useState } from "react";
import useBus from "use-bus";
import { FormField } from "../types/FormField";
import FormBuilderPage from "./FormBuilderPage";

type Props = {
    onFinish: Function
};

function FormBuilder(props: Props) {

    const [pages, setPages] = useState<any>([]);

    const addPage = function () {
        setPages([...pages, {}]);
    }

    useBus(
        'formBuilderPageUpdate',
        (action) => {
            setPages(pages.map((page: any, idx: number) => {
                if (idx === action.payload.idx) {
                    return action.payload.data;
                } else return page;
            }));
        }, [pages]
    );

    // const createSetPageTitleCallback = function (idx: number) {
    //     return (title: string) => {
    //         setPages(pages.map((page: any, innerIdx: number) => {
    //             if (innerIdx === idx) {
    //                 return {
    //                     ...page,
    //                     title
    //                 }
    //             } else return page;
    //         }));
    //     };
    // };

    // const createSetPageFieldNameCallback = function (pageIdx: number, fieldIdx: number) {
    //     return (value: string) => {
    //         setPages(pages.map((page: any, innerIdx: number) => {
    //             if (innerIdx === pageIdx) {
    //                 return page.map((field: FormField, innerInnerIdx: number) => {
    //                     if (innerInnerIdx === fieldIdx) {
    //                         return {
    //                             ...field,
    //                             name: value
    //                         }
    //                     } else return field;
    //                 });
    //             } else return page;
    //         }));
    //     };
    // };

    // const createSetPageFieldLabelCallback = function (pageIdx: number, fieldIdx: number) {
    //     return (value: string) => {
    //         setPages(pages.map((page: any, innerIdx: number) => {
    //             if (innerIdx === pageIdx) {
    //                 return page.map((field: FormField, innerInnerIdx: number) => {
    //                     if (innerInnerIdx === fieldIdx) {
    //                         return {
    //                             ...field,
    //                             label: value
    //                         }
    //                     } else return field;
    //                 });
    //             } else return page;
    //         }));
    //     };
    // };

    const submit = function () {
        props.onFinish(pages);
    };

    const viewSample = function() {
        props.onFinish(false);
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-col justify-around basis-[8rem] bg-zinc-900 text-zinc-50 p-6">
                <h1>Form Builder</h1>
            </div>
            <div className="flex flex-col max-w-[56rem] w-full mx-auto">
                <div className="flex flex-col w-full [&>*]:border-b">
                    {pages.map((page, idx) => {
                        return (
                            <div key={idx} className="flex flex-col">
                                <div className="">
                                    <FormBuilderPage
                                        index={idx}
                                        // setTitle={createSetPageTitleCallback(idx)}
                                        // setLabel={createSetPageFieldLabelCallback(idx,)}
                                        // setLabel={createSetPageFieldLabelCallback(idx,page.name)}
                                        data={page}></FormBuilderPage>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="p-6 flex flex-col">
                    <button onClick={addPage}>+ Page</button>
                    <button onClick={submit}>Finish</button>
                    <span className="text-center">or, test a sample form:</span>
                    <button onClick={viewSample}>View Sample</button>
                </div>
            </div>
        </div>
    );
}

export default FormBuilder;