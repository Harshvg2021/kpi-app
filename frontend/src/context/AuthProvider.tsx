"use client";
import AxiosClient from "@/config/axiosClient";
import {
  createContext,
  useEffect,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";
import { Toaster } from "sonner";

interface AuthState {
  status: "loading" | "authenticated" | "unauthenticated";
  accessToken: string;
}

interface AuthContextType {
  auth: AuthState;
  authDispatch: Dispatch<AuthAction>;
}

interface AuthAction {
  (state: AuthState): AuthState;
}

export const AuthContext = createContext<AuthContextType>({
  auth: {
    accessToken: "",
    status: "loading",
  },
  authDispatch: () => {},
});

const initialAuthState: AuthState = {
  status: "loading",
  accessToken: "",
};

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  return action(state);
};

export const AuthActions = {
  loading: (): AuthAction => (state) => {
    return { ...state, status: "loading" };
  },
  login: (): AuthAction => (state) => {
    return { status: "authenticated", accessToken: state.accessToken };
  },
  logout: (): AuthAction => () => {
    return { user: null, status: "unauthenticated", accessToken: "" };
  },
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, authDispatch] = useReducer(reducer, initialAuthState);
  useEffect(() => {
    async function autoLogin() {
      const client = AxiosClient;
      const response = await client.getAccessToken();
      if (!response) {
        authDispatch(AuthActions.logout());
        return;
      }
      if (response) {
        authDispatch(AuthActions.login());
        // router.replace("/dashboard");
      } else {
        authDispatch(AuthActions.logout());
      }
    }
    autoLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        authDispatch,
      }}
    >
      <Toaster richColors closeButton />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
