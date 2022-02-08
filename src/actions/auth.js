import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => async (dispatch) => {
  const resp = await fetchWithoutToken("auth", { email, password }, "POST");
  const body = await resp.json();

  if (body.ok) {
    localStorage.setItem("ctoken", body.token);
    localStorage.setItem("ctoken-init-date", new Date().getTime());

    dispatch(
      login({
        uid: body.uid,
        name: body.name,
      })
    );
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: body.msg,
    });
  }
};

export const startRegister = (email, password, name) => async (dispatch) => {
  const resp = await fetchWithoutToken(
    "auth/new",
    { email, password, name },
    "POST"
  );
  const body = await resp.json();

  if (body.ok) {
    localStorage.setItem("ctoken", body.token);
    localStorage.setItem("ctoken-init-date", new Date().getTime());

    dispatch(
      login({
        uid: body.uid,
        name: body.name,
      })
    );
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: body.msg,
    });
  }
};

export const startChecking = () => async (dispatch) => {
  const resp = await fetchWithToken("auth/renew");
  const body = await resp.json();

  if (body.ok) {
    localStorage.setItem("ctoken", body.token);
    localStorage.setItem("ctoken-init-date", new Date().getTime());

    dispatch(
      login({
        uid: body.uid,
        name: body.name,
      })
    );
  } else {
    dispatch(checkingFinish());
  }
};

export const startLogout = () => async (dispatch) => {
  localStorage.clear();
  dispatch(logout());
  dispatch({ type: types.eventClearActiveEvent });
};

const logout = () => ({
  type: types.authLogout,
});

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
