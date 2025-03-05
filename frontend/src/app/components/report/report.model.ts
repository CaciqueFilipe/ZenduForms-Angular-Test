export interface Report {
    id?: number;
    name: string;
    created: string;
    createdFormated?: string;
    modified?: string;
    modifiedFormated?: string;
    owner: string;
    formId?: number;
    formName?: string;
}