import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./Login.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "gabriel@email.com",
    lPassword: "123456",
  });
  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: "Juan",
    rEmail: "juan@email.com",
    rPassword1: "123456",
    rPassword2: "123456",
  });
  const { lEmail, lPassword } = formLoginValues;
  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!!!rName) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes digitar un nombre",
      });
    } else if (!!!rEmail) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes digitar un nombre de usuario",
      });
    } else if (rPassword1 !== rPassword2) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas deben ser iguales",
      });
    }

    dispatch(startRegister(rEmail, rPassword1, rName));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                autoComplete="off"
                name="lEmail"
                onChange={handleLoginInputChange}
                value={lEmail}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                autoComplete="off"
                name="lPassword"
                onChange={handleLoginInputChange}
                value={lPassword}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                autoComplete="off"
                name="rName"
                onChange={handleRegisterInputChange}
                value={rName}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                autoComplete="off"
                name="rEmail"
                onChange={handleRegisterInputChange}
                value={rEmail}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                autoComplete="off"
                name="rPassword1"
                onChange={handleRegisterInputChange}
                value={rPassword1}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                autoComplete="off"
                name="rPassword2"
                onChange={handleRegisterInputChange}
                value={rPassword2}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
