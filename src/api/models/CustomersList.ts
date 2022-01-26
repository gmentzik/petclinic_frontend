import { Customer } from "./Customer";

export interface CustomersList {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    customers: Customer[];
}
