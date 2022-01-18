import Login from "../components/Login";
import QuestionsList from "../components/question/QuestionsList";
import Register from "../components/Register";

const LOGGED_IN_DEFAULT_LAYOUT_ROUTES = [
    {
        path: "/",
        element: QuestionsList,
    },
];

const LOGGED_OUT_NO_LAYOUT_ROUTES = [
    {
        path: "/register",
        element: Register,
    },
    {
        path: "/login",
        element: Login,
    },
    {
        path: "/home",
        element: QuestionsList,
    },
];

export { LOGGED_OUT_NO_LAYOUT_ROUTES, LOGGED_IN_DEFAULT_LAYOUT_ROUTES };