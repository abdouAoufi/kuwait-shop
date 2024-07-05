import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// https://casse-be.onrender.com
const local = "http://192.168.1.120:1337";
const cloud = "https://casse-be-wgwd.onrender.com/";
let adress = cloud;

if (import.meta.env.MODE === "development") {
  adress = local;
  console.log("Running in development mode");
}
export const API_URL = adress;

export const customInstanceFactory = (axiosBuilder: AxiosInstance) => {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const source = Axios.CancelToken.source();
    const promise: any = axiosBuilder({
      ...config,
      cancelToken: source.token,
    }).then(({ data }) => data);

    promise.cancel = () => {
      source.cancel("Query was cancelled by React Query");
    };

    promise.catch((error: Error) => {
      console.debug("API error:", error);
    });

    return promise;
  };
};

export const axiosInstance = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const customInstance = <T>(args: AxiosRequestConfig) => {
  return customInstanceFactory(axiosInstance)<T>({
    ...args,
    headers: {
      "accept-Language": "en",
      "x-custom-header": "header_pwd_key_xxcassenetX",
    },
  });
};
