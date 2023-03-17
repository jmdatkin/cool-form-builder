export enum FormType {
    text,
    number,
    date
};

export type FormField = {
    name: string,
    label: string,
    required?: boolean,
    type?: FormType
    extraProps?: any[]
};

export type FormPage = {
    title: string,
    fields: FormField[]
};

export type FormData = FormPage[];