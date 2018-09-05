import { Category } from "./category";
import { Employee } from "./user";

export interface Job {
    category: Category,
    employee?: Employee,
    hasAccepted: boolean,
    timestamp: number
}