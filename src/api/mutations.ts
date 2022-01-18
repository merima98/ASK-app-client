import { FormControlOptions } from "@chakra-ui/react";
import axios from "../httpClient";
import { Question } from "../models/Question";


function register(credentials: FormControlOptions) {
    return axios.post(`/register`, credentials);
}

function login(credentials: FormControlOptions) {
    return axios.post(`/login`, credentials);
}

function newQuestion(question: Question) {
    return axios.post(`/questions`, question);
}

const exports = {
    register,
    login,
    newQuestion
};
export default exports;
