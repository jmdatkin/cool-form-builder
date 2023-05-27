import { useState } from "react";
import useBus from "use-bus";
import { FormField } from "../types/FormField";
import FormBuilderPage from "./FormBuilderPage";
import { AnimatePresence, motion } from 'framer-motion';

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

    const createPageDeleteSelfFunction = function (idx: number) {
        return () => {
            console.log(idx);
            setPages((prev: any) => {
                return prev.toSpliced(idx,1);
            });
        };
    };

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

    const viewSample = function () {
        props.onFinish(false);
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-col justify-around basis-[8rem] bg-zinc-900 text-zinc-50 p-6">
                <h1>Form Builder</h1>
            </div>
            <div className="flex flex-col max-w-[56rem] w-full mx-auto">
                <div className="flex flex-col w-full space-y-2 py-4">
                    <AnimatePresence>
                        {pages.map((page, idx) => {
                            return (
                                <motion.div key={idx} className="flex flex-col relative"
                                    initial={{ opacity: 0, top: 15 }}
                                    animate={{ opacity: 1, top: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="">
                                        <FormBuilderPage
                                            index={idx}
                                            deleteSelf={createPageDeleteSelfFunction(idx)}
                                            // setTitle={createSetPageTitleCallback(idx)}
                                            // setLabel={createSetPageFieldLabelCallback(idx,)}
                                            // setLabel={createSetPageFieldLabelCallback(idx,page.name)}
                                            data={page}></FormBuilderPage>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>
                {/* </div> */}
                <div className="p-6 flex flex-col">
                    <button onClick={addPage}>+ Page</button>
                    <button onClick={submit}>Finish</button>
                    <span className="text-center">or, test a sample form:</span>
                    <button onClick={viewSample}>View Sample</button>
                </div>
            </div>
        </div >
    );
}

export default FormBuilder;