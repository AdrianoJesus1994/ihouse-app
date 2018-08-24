export interface Job {
    id: number,
    category_id: number,
    employee_id?: number,
    employer_id: number,
    name: string,
    value: number
}