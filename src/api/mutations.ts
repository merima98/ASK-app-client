import { FormControlOptions } from "@chakra-ui/react";
import { FieldValues } from "react-hook-form";

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

function updateQuestion(id: number, content: string) {
    return axios.patch(`/questions/${id}`, { 'content': content });
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

function deleteQuestion(id: number) {
    return axios.delete(`/questions/${id}`);
}

function likeAnswer(id: number, likes: number) {
    return axios.patch(`/answers/${id}`, { 'likes': likes });
}

function dislikeAnswer(id: number, dislikes: number) {
    return axios.patch(`/answers/${id}`, { 'dislikes': dislikes });
}

function deleteAnswer(id: number) {
    return axios.delete(`/answers/${id}`);
}

function updateAnswer(id: number, content: string) {
    return axios.patch(`/answers/${id}`, { 'content': content });
}

function updateProfileData(userId: number, data: FieldValues) {
    return axios.patch(`/users/${userId}`, data);
}

function checkPassword(data: { currentPassword: string; hash: string }) {
    return axios.post(`/check-password`, data);
}

function changePassword(data: { userId: number, password: string; email: string }) {
    return axios.patch(`/users/${data.userId}`, { 'password': data.password, 'email': data.email });
}

const exports = {
    register,
    login,
    newQuestion,
    likeQuestion,
    dislikeQuestion,
    updateQuestion,
    addAnswer,
    deleteQuestion,
    likeAnswer,
    dislikeAnswer,
    deleteAnswer,
    updateAnswer,
    updateProfileData,
    checkPassword,
    changePassword
};
export default exports;
