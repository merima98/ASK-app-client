import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import QuestionsList from "./components/question/QuestionsList";
import Register from "./components/Register";
import {
  LOGGED_IN_DEFAULT_LAYOUT_ROUTES,
  LOGGED_OUT_NO_LAYOUT_ROUTES,
} from "./routing/routes";
import { useAuth } from "./state";

const queryClient = new QueryClient();

function App() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {isLoggedIn && (
            <Routes>
              <Route path="/" element={<QuestionsList />} />
              {LOGGED_IN_DEFAULT_LAYOUT_ROUTES.map((item) => {
                return (
                  <Route
                    key={item.path}
                    element={<item.element />}
                    path={item.path}
                  />
                );
              })}
            </Routes>
          )}
          {!isLoggedIn && (
            <Routes>
              <Route path="/" element={<Register />} />
              {LOGGED_OUT_NO_LAYOUT_ROUTES.map((item) => {
                return (
                  <Route
                    key={item.path}
                    element={<item.element />}
                    path={item.path}
                  />
                );
              })}
            </Routes>
          )}
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
