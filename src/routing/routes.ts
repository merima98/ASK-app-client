import AnswerDetails from "../components/answer/AnswerDetails";
import Login from "../components/Login";
import QuestionDetails from "../components/question/QuestionDetails";
import QuestionsList from "../components/question/QuestionsList";
import Register from "../components/Register";

const LOGGED_IN_DEFAULT_LAYOUT_ROUTES = [
    {
        path: "/",
        element: QuestionsList,
    },
    {
        path: "/questions/:id",
        element: QuestionDetails,
    },
    {
        path: "/answer/:id",
        element: AnswerDetails,
    },
];

const LOGGED_OUT_NO_LAYOUT_ROUTES = [
    {
        path: "/",
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
    {
        path: "/answer/:id",
        element: AnswerDetails,
    },
];

export { LOGGED_OUT_NO_LAYOUT_ROUTES, LOGGED_IN_DEFAULT_LAYOUT_ROUTES };