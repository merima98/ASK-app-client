import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import { LOGGED_OUT_NO_LAYOUT_ROUTES } from "./routing/routes";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
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
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
