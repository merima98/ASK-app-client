import axios from "../httpClient";

function questions() {
    return axios.get(`/questions?_expand=user&_sort=dateOfCreation&_order=desc`);
}

function getQuestionById(questionId: number) {
    return axios.get(`/questions/${questionId}?_expand=user&_embed=answers`);
}


function getAnswersByQuestionById(questionId: number) {
    const response = axios.get(`/answers?questionId=${questionId}&_sort=dateOfCreation&_order=desc`);
    return response;
}

function getAnswerById(answerId: number) {
    return axios.get(`/answers/${answerId}?_expand=user`);
}

function getHotQuestions() {
    return axios.get(`/questions?_expand=user&_sort=likes&_order=desc`);
}

function paginatedQuestions(pageSize: number) {
    return axios.get(`/questions?_expand=user&_sort=dateOfCreation&_order=desc&_limit=${pageSize}`);
}

function getUserQuestions(pageSize: number, userId: number) {
    return axios.get(`/questions?userId=${userId}&_expand=user&_sort=dateOfCreation&_order=desc&_limit=${pageSize}`);
}

const exports = {
    questions,
    getQuestionById,
    getAnswersByQuestionById,
    getAnswerById,
    getHotQuestions,
    paginatedQuestions,
    getUserQuestions
};
export default exports;
