import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => async (dispatch, getState) => {
  const { uid, name } = getState().auth;
  try {
    const resp = await fetchWithToken("events", event, "POST");
    const body = await resp.json();

    if (body.ok) {
      event.id = body.event.id;
      event.user = {
        uid,
        name,
      };
      dispatch(eventAddNew(event));
    }
  } catch (e) {
    console.log(e);
  }
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const eventStartUpdate = (event) => async (dispatch) => {
  try {
    const resp = await fetchWithToken(`events/${event.id}`, event, "PUT");
    const body = await resp.json();

    if (body.ok) {
      dispatch(eventUpdated(event));
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: body.msg,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const eventUpdated = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

export const eventStartDelete = () => async (dispatch, getState) => {
  const { id } = getState().calendar.activeEvent;

  try {
    const resp = await fetchWithToken(`events/${id}`, {}, "DELETE");
    const body = await resp.json();

    if (body.ok) {
      dispatch(eventDeleted());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: body.msg,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventStartLoading = () => async (dispatch) => {
  try {
    const resp = await fetchWithToken("events");
    const body = await resp.json();
    const events = prepareEvents(body.events);

    dispatch(eventLoaded(events));
  } catch (e) {
    console.log(e);
  }
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});
