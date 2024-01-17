import axios from "axios";
import {BASE_URL} from "../constants";

//Register User
export const RegisterUser = (email: string, password: string) =>
  axios
    .post(`http://${BASE_URL}:9090/api/register`, {
      email: email,
      password: password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response.data);
    });

//Login User
export const LoginUser = (email: string, password: string) =>
  axios
    .post(`http://${BASE_URL}:9090/api/login`, {
      email: email,
      password: password,
    })
    .then((response: any): string => {
      console.log(response.data.token, "token");
      return response.data.token;
    })
    .catch((error): string => {
      console.log(error.response.data);
      throw new Error(error.response.data);
    });
