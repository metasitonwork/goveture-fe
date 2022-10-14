import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import rn from "../fn/module-global";
import "./register.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const Register = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  let timeStr = null;
  window.ck = false;
  const userNew = async event => {
    // setUsername(event.target.value);
    if (timeStr) {
      clearInterval(timeStr);
    }
    timeStr = setTimeout(async () => {
      //   console.log(event.target.value);
      if (event.target.value !== "") {
        let checkUser = await axios({
          method: "post",
          url: "https://goventure-be-test.vercel.app/check_user",
          data: { username: event.target.value },
          headers: { Accept: "application/json", "Content-Type": "application/json" }
        }).then(success => {
          return success;
        });
        if (checkUser.status === 200) {
          if (checkUser.data.status === 400) {
            document.getElementById("username").classList.add("is-invalid");
            document.getElementById("warning_username").innerText = " Username  repeat user";
            window.ckUser = true;
          } else {
            window.ckUser = false;
            document.getElementById("warning_username").innerText = "Please enter Username";
            setUsername(event.target.value);
          }
          console.log(checkUser.data.status, "status");
        }
      }
    }, 500);
  };
  const registerSave = async () => {
    let ck = false;
    if (username === "") {
      document.getElementById("warning_username").innerText = "Please enter Username";
      document.getElementById("username").classList.add("is-invalid");
      ck = true;
      console.log("username");
    }
    if (password === "") {
      document.getElementById("password").classList.add("is-invalid");
      ck = true;
      console.log("password");
    }
    if (confirmPassword === "" || confirmPassword !== password) {
      document.getElementById("confirm_password").classList.add("is-invalid");
      ck = true;
    }
    if (name === "") {
      document.getElementById("name").classList.add("is-invalid");
      ck = true;
      console.log("name");
    }
    if (surname === "") {
      document.getElementById("surname").classList.add("is-invalid");
      ck = true;
      console.log("surname");
    }
    if (email === "" || !rn.check_format_email(email)) {
      document.getElementById("email").classList.add("is-invalid");
      ck = true;
      console.log("email");
    }
    if (ck) return;
    if (window.ckUser) return;
    let resRegister = await axios({
      method: "post",
      url: "https://goventure-be-test.vercel.app/add_user",
      data: {
        username,
        password,
        name,
        surname,
        email
      },
      headers: { Accept: "application/json", "Content-Type": "application/json" }
    }).then(success => {
      MySwal.fire({
        icon: "success",
        title: "ลงทะเบียนสำเร็จ",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        history.push("/");
      });
      return success;
    });
    if (resRegister.status === 200) {
      console.log(resRegister.data);
    }

    return;
  };
  return (
    <>
      <div className="box-register d-flex justify-content-center align-items-center">
        <div>
          <div className="card w-500-px">
            <div className="text-center mt-2">
              <h2>Register</h2>
            </div>
            <div className="card-body">
              <div className="row g-0">
                <div className="col-md-auto me-3 fw-bold  pt-2  ">
                  <div className="label-width">username</div>
                </div>
                <div className="col-md">
                  <input id="username" onChange={event => userNew(event)} type="text" className="form-control" />
                  <div id="warning_username" className="invalid-feedback">
                    Please enter Username
                  </div>
                </div>
              </div>

              <div className="row g-0 mt-3">
                <div className="col-md-auto me-3 fw-bold  pt-2 label-width ">
                  <div className="label-width">password</div>
                </div>
                <div className="col-md">
                  <input
                    id="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    type="password"
                    className="form-control"
                  />
                  <div className="invalid-feedback">Please enter password</div>
                </div>
              </div>

              <div className="row g-0 mt-3">
                <div className="col-md-auto me-3 fw-bold  pt-2 label-width ">
                  <div className="label-width">confirm password</div>
                </div>
                <div className="col-md">
                  <input
                    id="confirm_password"
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                    type="password"
                    className="form-control"
                  />
                  <div className="invalid-feedback">Please enter confirm password And Seem password </div>
                </div>
              </div>

              <div className="row g-0 mt-3">
                <div className="col-md-auto me-3 fw-bold  pt-2 label-width ">
                  <div className="label-width">name</div>
                </div>
                <div className="col-md">
                  <input
                    id="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                  <div className="invalid-feedback">Please enter name </div>
                </div>
              </div>

              <div className="row g-0 mt-3">
                <div className="col-md-auto me-3 fw-bold  pt-2 label-width ">
                  <div className="label-width">surname</div>
                </div>
                <div className="col-md">
                  <input
                    id="surname"
                    value={surname}
                    onChange={event => setSurname(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                  <div className="invalid-feedback">Please enter surname</div>
                </div>
              </div>

              <div className="row g-0 mt-3">
                <div className="col-md-auto me-3 fw-bold  pt-2 label-width ">
                  <div className="label-width">email</div>
                </div>
                <div className="col-md">
                  <input
                    id="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                  <div className="invalid-feedback">Please enter email</div>
                </div>
              </div>

              <div className="row g-0 mt-3">
                <div className="col-md-auto me-3 fw-bold  pt-2 label-width ">
                  <div className="label-width" />
                </div>
                <div className="col-md">
                  <button onClick={() => registerSave()} className="btn btn-primary me-2" style={{ width: "100px" }}>
                    Save
                  </button>
                  <button onClick={() => history.push("/")} className="btn btn-secondary" style={{ width: "100px" }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
