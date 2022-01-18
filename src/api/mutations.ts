import { FormControlOptions } from "@chakra-ui/react";
import axios from "../httpClient";

function register(credentials: FormControlOptions) {
    return axios.post(`/register`, credentials);
}

function login(credentials: FormControlOptions) {
    return axios.post(`/login`, credentials);
}

function newQuestion(question: {
    content: string;
    likes: number;
    dislikes: number;
    dateOfCreation: string;
    userId: number;
}) {
    return axios.post(`/questions`, question);
}

function likeQuestion(id: number, likes: number) {
    return axios.patch(`/questions/${id}`, { 'likes': likes });
}

function dislikeQuestion(id: number, dislikes: number) {
    return axios.patch(`/questions/${id}`, { 'dislikes': dislikes });
}

function addAnswer(answer: {
    content: string;
    likes: number;
    dislikes: number;
    dateOfCreation: string;
    userId: number;
    questionId: number;
}) {
    return axios.post(`/answers`, answer);
}


const exports = {
    register,
    login,
    newQuestion,
    likeQuestion,
    dislikeQuestion,
    addAnswer
};
export default exports;
