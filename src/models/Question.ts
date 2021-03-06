import { Answer } from "./Answer";
import { User } from "./User";

export type Question = {
    content: string;
    dateOfCreation: string;
    dislikes: number;
    id: number;
    likes: number;
    user: User;
    answers?: Answer[];
    userId: number;
}