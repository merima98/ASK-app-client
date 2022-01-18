import { FormControlOptions } from "@chakra-ui/react";
import axios from "../httpClient";


function register(credentials: FormControlOptions) {
    return axios.post(`/register`, credentials);
}

function login(credentials: FormControlOptions) {
    return axios.post(`/login`, credentials);
}

const exports = {
    register,
    login
};
export default exports;
