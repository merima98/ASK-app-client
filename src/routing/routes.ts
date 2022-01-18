import Login from "../components/Login";
import QuestionDetails from "../components/question/QuestionDetails";
import QuestionsList from "../components/question/QuestionsList";
import Register from "../components/Register";

const LOGGED_IN_DEFAULT_LAYOUT_ROUTES = [
    {
        path: "/questions/:id",
        element: QuestionDetails,
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
        path: "/questions",
        element: QuestionsList,
    },
    {
        path: "/questions/:id",
        element: QuestionDetails,
    },
];

export { LOGGED_OUT_NO_LAYOUT_ROUTES, LOGGED_IN_DEFAULT_LAYOUT_ROUTES };