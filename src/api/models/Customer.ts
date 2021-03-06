export interface Customer {
    id: number;
    name: string;
    surname: string;
    address: string;
    area: string;
    pobox: string;
    country: string;
    email: string;
    phone: string;
    mobilephone: string;
    note1: string;
    note2: string;
    note3: string;
    created: string;
    updated: string;
}

export const emptyCustomer = {
    id: -1,
    name: '',
    surname: '',
    address: '',
    area: '',
    pobox: '',
    country: '',
    email: '',
    phone: '',
    mobilephone: '',
    note1: '',
    note2: '',
    note3: '',
    created: '',
    updated: ''
}

export interface CustomerDTO {
    id?: number;
    name: string;
    surname: string;
    address: string;
    area: string;
    pobox: string;
    country: string;
    email: string;
    phone: string;
    mobilephone: string;
    note1: string;
    note2: string;
    note3: string;
}

export const emptyCustomerDTO:CustomerDTO = {
    name: '',
    surname: '',
    address: '',
    area: '',
    pobox: '',
    country: '',
    email: '',
    phone: '',
    mobilephone: '',
    note1: '',
    note2: '',
    note3: '',
}