import { User } from "./User";

export interface Question {
    content?: string;
    dateOfCreation?: string;
    dislikes?: number;
    id?: number;
    likes?: number;
    user?: User;
    userId?: number;
}