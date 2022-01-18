import { User } from "./User";

export type Answer = {
    content: string;
    dateOfCreation: string;
    dislikes: number;
    id: number;
    likes: number;
    user: User;
    userId: number;
    questionId: number;
}