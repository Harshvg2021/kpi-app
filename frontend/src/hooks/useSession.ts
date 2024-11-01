import { useContext } from "react";
import { AuthActions, AuthContext } from "@/context/AuthProvider";
import AxiosClient from "@/config/axiosClient";

export const useSession = () => {
  return useContext(AuthContext).auth;
};

export const useAuthDispatch = () => {
  // ideally this function should take an
  // const queryClient = useQueryClient();
  return useContext(AuthContext).authDispatch;
};

export const useLogout = () => {
  const authDispatch = useAuthDispatch();

  const logout = () => {
    authDispatch(AuthActions.loading());
    AxiosClient.logout()
      .then(() => {
        console.log("logging out");
        authDispatch(AuthActions.logout());
        window.location.reload();
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { logout };
};
