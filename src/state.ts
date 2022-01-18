import create, { SetState } from "zustand";

type Auth = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean, token: string) => void;
};

const useAuth = create<Auth>((set: SetState<Auth>) => ({
    isLoggedIn: Boolean(window.localStorage.getItem("token")) || false,
    setIsLoggedIn: (value: boolean, token?: string) => {
        if (value && token) {
            window.localStorage.setItem("token", token);
            return set({ isLoggedIn: value });
        }
        window.localStorage.removeItem("token");
        return set({ isLoggedIn: value });
    },
}));

export { useAuth };
