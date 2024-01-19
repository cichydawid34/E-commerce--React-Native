import axios from "axios";
import {BASE_URL} from "../constants";

//Get Events
export const getEvents = (token: string) =>
  axios
    .get(`http://${BASE_URL}:9090/api/events`, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response.data);
    });





