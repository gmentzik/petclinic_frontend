import { Customer } from "./Customer";

export interface CustomersList {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    customers: Customer[];
}


export const emptyCustomersList = {
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    customers: []
}