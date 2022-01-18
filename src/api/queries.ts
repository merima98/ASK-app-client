import axios from "../httpClient";

function questions() {
    return axios.get(`/questions?_expand=user&_sort=dateOfCreation&_order=desc`);
}

function getQuestionById(questionId: number) {
    return axios.get(`/questions/${questionId}?_expand=user&_embed=answers`);
}

const exports = {
    questions,
    getQuestionById
};
export default exports;
