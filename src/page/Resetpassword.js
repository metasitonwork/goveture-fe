import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./forget_password.css";
import rn from "../fn/module-global";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import "./reset_password.css";

const MySwal = withReactContent(Swal);
const id = new URLSearchParams(window.location.search).get("id");

const ResetPassword = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusSend, setStatusSend] = useState(false);
  const clearForm = () => {
    setPassword("");
    setConfirmPassword("");
  };
  const reset_password = async () => {
    let ck = false;

    if (password === "") {
      document.getElementById("password").classList.add("is-invalid");
      ck = true;
    }
    if (confirmPassword === "") {
      document.getElementById("confirm_password").classList.add("is-invalid");
      ck = true;
    }

    if (password !== confirmPassword) {
      MySwal.fire({
        icon: "error",
        title: "Password ไม่ตรงกัน",
        showConfirmButton: true
      });
      ck = true;
    }
    if (ck) return;
    setStatusSend(true);
    let resReset = await axios({
      method: "post",
      url: "https://goventure-be-test.vercel.app/reset_password",
      data: { id, password },
      headers: { Accept: "application/json", "Content-Type": "application/json" }
    }).then(success => {
      setStatusSend(false);
      return success;
    });

    if (resReset.status === 200) {
      MySwal.fire({
        icon: "success",
        title: resReset.data.message,
        showConfirmButton: true
      }).then(() => {
        history.push("/login");
      });
    }
    console.log(resReset, "resReset");
  };

  return (
    <div className="box-reset-password d-flex justify-content-center align-items-center">
      <div className="card" style={{ width: "500px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Change Password</h2>
          <div className="row g-0">
            <div className="col-md-auto fw-bold" style={{ width: "150px" }}>
              Password
            </div>
            <div className="col-md">
              <input
                value={password}
                onChange={event => setPassword(event.target.value)}
                type="password"
                className="form-control"
                id="password"
              />
              <div className="invalid-feedback">Please enter password</div>
            </div>
          </div>
          <div className="row g-0 mt-3">
            <div className="col-md-auto fw-bold" style={{ width: "150px" }}>
              confirm password
            </div>
            <div className="col-md">
              <input
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
                type="password"
                className="form-control"
                id="confirm_password"
              />
              <div className="invalid-feedback">Please enter confirm password</div>
            </div>
          </div>
          <div className="row g-0 mt-3">
            <div className="col-md-auto" style={{ width: "150px" }} />
            <div className="col-md">
              <button
                disabled={statusSend}
                onClick={() => reset_password()}
                className="btn btn-primary me-2"
                style={{ width: "100px" }}
              >
                Save
              </button>
              <button onClick={() => clearForm()} className="btn btn-secondary" style={{ width: "100px" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
