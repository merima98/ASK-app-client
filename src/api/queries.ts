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
const exports = {
    questions,
    getQuestionById,
    getAnswersByQuestionById
};
export default exports;
