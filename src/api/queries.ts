import axios from "../httpClient";

function questions() {
    return axios.get(`/questions?_expand=user&_sort=dateOfCreation&_order=desc`);
}

const exports = {
    questions
};
export default exports;
