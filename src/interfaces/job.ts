import { Category } from "./category";
import { UserInterface } from "./user";

export interface Job {
    category: Category,
    employee?: UserInterface,
    hasAccepted: boolean,
    timestamp: number
}