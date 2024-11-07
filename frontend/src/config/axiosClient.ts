import axios from "axios";
const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
import Cookies from "js-cookie";

const axiosConfig = {
  baseURL: serverUrl,
  withCredentials: true,
};

const AxiosClient = {
  date: Date.now(),
  timer: null as NodeJS.Timeout | null,
  accessToken: "",
  axios: axios.create(axiosConfig),

  login: async function ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const { data } = await this.axios.post(`/api/auth/login`, {
        email,
        password,
      });
      const { token } = data;
      this.accessToken = token;
      Cookies.set("kpiUserToken", token, {
        expires: 7,
      });
    } catch (error: any) {
      if (error.response?.data) {
        throw new Error(error.response.data?.message);
      } else {
        console.log(error);
        throw new Error("Something went wrong with signup try again later");
      }
    }
  },

  getAccessToken: async function () {
    try {
      const iniToken = Cookies.get("kpiUserToken") as string | null;
      this.accessToken = iniToken ?? "";
      const { data } = await this.axios.get(`/api/auth/me`, {
        headers: {
          authorization: `Bearer ${this.accessToken}`,
        },
      });
      const { token } = data;
      this.accessToken = token;
      Cookies.set("kpiUserToken", token, {
        expires: 7,
      });
      return token;
    } catch (error) {
      Cookies.remove("kpiUserToken");
      this.accessToken = "";
      console.log(error);
      return null;
    }
  },

  logout: async function () {
    try {
      this.accessToken = "";
      Cookies.remove("kpiUserToken");
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong from our side.");
    }
  },

  attachInterceptors: async function () {
    this.axios.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          // await this.getAccessToken();
          originalRequest.headers.Authorization = `Bearer ${this.accessToken}`;
          return this.axios(originalRequest);
        }

        return Promise.reject(error);
      }
    );
  },
};

AxiosClient.attachInterceptors();
export default AxiosClient;
