import { Answer } from "./Answer";

export type User = {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    password: string;
    answers?: Answer[]
}