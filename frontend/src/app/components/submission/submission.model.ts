export interface Submission {
    id?: number;
    check: boolean;
    task: string;
    status: number;
    statusName?: string;
    from: string;
    to: string;
    customerAddress: string;
    dueDate: string;
    dueDateFormated?: string;
    dueDateRed?: boolean;
}

export interface StatusSubmissions {
    status: number;
    description: string;
}

export const StatusSubmission: StatusSubmissions[] = [
    {
        status: 1,
        description: 'Unassigned',
    },
    {
        status: 2,
        description: 'Uncomplete',
    },
    {
        status: 3,
        description: 'Low Risk',
    },
]