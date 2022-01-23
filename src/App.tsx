import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
import MenuHeader from "./components/header/MenuHeader";

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
      <ColorModeScript initialColorMode="light" />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <MenuHeader />
          <Routes>
            {isLoggedIn
              ? LOGGED_IN_DEFAULT_LAYOUT_ROUTES.map((item) => {
                  return (
                    <Route
                      key={item.path}
                      path={item.path}
                      element={<item.element />}
                    />
                  );
                })
              : LOGGED_OUT_NO_LAYOUT_ROUTES.map((item) => {
                  return (
                    <Route
                      key={item.path}
                      path={item.path}
                      element={<item.element />}
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
