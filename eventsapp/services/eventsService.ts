import axios from "axios";
import {BASE_URL} from "../constants";
import {EventType} from "../models/event";

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

export const addEventService = (token: string,event:EventType) =>
    axios
        .post(`http://${BASE_URL}:9090/api/events/create`, {
          image:event.image,
            city:event.city,
            street:event.street,
            description:event.description,
            type:event.type,
            name:event.name,
            latitude:event.latitude,
            longitude:event.longitude
        },{  headers: { "x-access-token": token },})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw new Error(error.response.data);
        });

export const updateEventService = (token: string,event:EventType,id) =>
    axios
        .patch(`http://${BASE_URL}:9090/api/events/${id}`, {
            image:event.image,
            city:event.city,
            street:event.street,
            description:event.description,
            type:event.type,
            name:event.name,
            latitude:event.latitude,
            longitude:event.longitude
        },{  headers: { "x-access-token": token },})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw new Error(error.response.data);
        });

export const deleteEventService = (eventId:EventType) =>
    axios
        .delete(`http://${BASE_URL}:9090/api/events/${eventId}` )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw new Error(error.response.data);
        });





