import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import "./forget_password.css";
import rn from "../fn/module-global";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
const MySwal = withReactContent(Swal);

const id = new URLSearchParams(window.location.search).get("id");
const code = new URLSearchParams(window.location.search).get("code");
const ForgetPassword = () => {
  const resProtect = useCallback(async () => {
    await axios({
      method: "post",
      url: "https://goventure-be-test.vercel.app/protectForgot",
      data: { token: code },
      headers: { Accept: "application/json", "Content-Type": "application/json" }
    }).then(success => {
      return success;
    });
  }, []);
  useEffect(
    () => {
      resProtect();
    },
    [resProtect]
  );

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [statusSend, setStatusSend] = useState(false);
  const forgot = async () => {
    if (email === "" || !rn.check_format_email(email)) {
      document.getElementById("email_forgot").classList.add("is-invalid");
      return;
    }
    setStatusSend(true);
    let resForgot = await axios({
      method: "post",
      url: "https://goventure-be-test.vercel.app/forgot",
      data: { email: email },
      headers: { Accept: "application/json", "Content-Type": "application/json" }
    }).then(success => {
      return success;
    });
    if (resForgot.status === 200) {
      console.log(resForgot.data.stauts, "resForgot");
      if (resForgot.data.status === 400) {
        MySwal.fire({
          icon: "error",
          title: "ไม่พบ Email",
          showConfirmButton: true
        }).then(() => {
          document.getElementById("email_forgot").classList.remove("is-invalid");
          setEmail("");
          document.getElementById("email_forgot").focus();
          setStatusSend(false);
        });
      } else if (resForgot.data.status === 200) {
        MySwal.fire({
          icon: "info",
          title: resForgot.data.message,
          showConfirmButton: true
        }).then(() => {
          document.getElementById("email_forgot").classList.remove("is-invalid");
          setEmail("");
          setStatusSend(false);
        });
      }
    }
  };
  const mailSet = event => {
    if (event.keyCode === 13) {
      forgot();
      return;
    }
  };
  return (
    <div className="box-forget d-flex justify-content-center align-items-center">
      <div className="card" style={{ width: "700px" }}>
        <div className="card-body">
          <div className="d-flex">
            <div className="w-100">
              <input
                id="email_forgot"
                value={email}
                onChange={event => setEmail(event.target.value)}
                onKeyDown={event => mailSet(event)}
                type="text"
                placeholder="Email"
                className="form-control"
              />
              <div className="invalid-feedback">Please enter Format Email.</div>
            </div>
            <button
              disabled={statusSend}
              onClick={() => forgot()}
              className="ms-3 btn btn-primary"
              style={{ width: "150px", height: "38px" }}
            >
              Forgot
            </button>
            <button
              onClick={() => history.push("/login")}
              className="btn btn-secondary ms-2"
              style={{ width: "150px", height: "38px" }}
            >
              Login
            </button>
          </div>
          <div className="text-center" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
