import axios from "../httpClient";

function questions() {
    return axios.get(`/questions?_expand=user`);
}

const exports = {
    questions
};
export default exports;
