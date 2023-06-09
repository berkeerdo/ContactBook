import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { Contact } from "../models/contact";
import { PaginatedResponse } from "../models/pagination";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErorrs: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErorrs.push(data.errors[key]);
            }
          }
          throw modelStateErorrs.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }

    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Contacts = {
  list: (params: URLSearchParams) => requests.get("/contact", params),
  details: (id: string) => requests.get(`/contact/${id}`),
  create: (contact: Contact) => requests.post<void>("/contact", contact),
  update: (contact: Contact) =>
    requests.put<void>(`/contact/${contact.id}`, contact),
  delete: (id: string) => requests.del<void>(`/contact/${id}`),
};

const agent = {
  Contacts,
};

export default agent;
