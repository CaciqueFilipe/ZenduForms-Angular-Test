export interface History {
    id?: number;
    audit: string;
    auditFormated?: string;
    subject: string;
    action: string;
    contact: string;
    customerId: number;
    customer?: string;
    formId: number;
    form?: string;
}