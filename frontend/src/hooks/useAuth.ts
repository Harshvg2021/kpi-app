"use client";
import { useRouter } from "next/navigation";
import AxiosClient from "@/config/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthDispatch } from "./useSession";
import { AuthActions } from "@/context/AuthProvider";

interface LoginProps {
  email: string;
  password: string;
}
export const useAuth = () => {
  const router = useRouter();
  const authDispatch = useAuthDispatch();
  const loginMutation = useMutation({
    mutationFn: (params: LoginProps) => login(params),
  });
  const autoLoginMutation = useMutation({
    mutationFn: async () => {
      const response = await AxiosClient.getAccessToken();
      if (!response) {
        authDispatch(AuthActions.logout());
        return;
      }
      if (response) {
        authDispatch(AuthActions.login());
      } else {
        authDispatch(AuthActions.logout());
      }
    },
  });

  const login = async ({ email, password }: LoginProps) => {
    try {
      await AxiosClient.login({
        email,
        password,
      });
      authDispatch(AuthActions.login());
      router.replace("/kpi/therapy");
      return null;
    } catch (error: any) {
      toast(error.message);
      return error;
    }
  };

  return {
    loginMutation,
    autoLoginMutation,
  };
};
