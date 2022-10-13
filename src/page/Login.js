import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
axios.create({
  withCredentials: true
});

const Login = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [token, setToken] = useState("");
  const login = async event => {
    event.preventDefault();
    console.log("login");
    let ck = false;
    if (userName === "") {
      document.getElementById("username").classList.add("is-invalid");
      ck = true;
    }

    if (password === "") {
      document.getElementById("password").classList.add("is-invalid");
      ck = true;
    }
    if (ck) return;

    console.log(userName, "userName");
    console.log(password, "password");
    var formData = new FormData();
    formData.append("image", "100");
    const resLogin = await axios({
      method: "POST",
      url: "https://goventure-be-test.vercel.app/login",
      data: { username: userName, password: password },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      credentials: "include",
      withCredentials: true
    })
      .then(success => {
        return success;
      })
      .catch(() => {
        MySwal.fire({
          icon: "error",
          title: "username หรือ password ไม่ถูกต้อง",
          showConfirmButton: false,
          timer: 2000
        });
        return;
      });

    // return;

    console.log(resLogin, "resLogin");
    if (resLogin)
      if (resLogin.status === 200) {
        localStorage.setItem("token", resLogin.data.token);
        history.push({
          pathname: "/home"
        });
        //   protect(resLogin.data.token);
      }
  };
  const clearForm = () => {
    setUserName("");
    setPassWord("");
    document.getElementById("username").classList.remove("is-invalid");
    document.getElementById("password").classList.remove("is-invalid");
  };
  const protect = async value => {
    console.log(value);
    let resProtect = await axios({
      method: "post",
      url: "https://goventure-be-test.vercel.app/protected",
      data: { token: value },
      withCredentials: true
      //   headers: { Accept: "application/json", "Content-Type": "application/json" }
    }).then(success => {
      return success;
    });
    console.log(resProtect, "resProtect");
  };
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh", width: "100%" }}>
        <form onSubmit={login}>
          <div className="row">
            <div className="col-md-auto pt-1 me-2" style={{ width: "95px" }}>
              Username
            </div>
            <div className="col-md-auto">
              <input
                id="username"
                value={userName}
                onChange={event => setUserName(event.target.value)}
                type="text"
                style={{ width: "250px" }}
                className="form-control "
              />
              <div className="invalid-feedback">Please enter username</div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-auto pt-1 me-2" style={{ width: "95px" }}>
              password
            </div>
            <div className="col-md-auto">
              <input
                id="password"
                value={password}
                onChange={event => setPassWord(event.target.value)}
                type="password"
                style={{ width: "250px" }}
                className="form-control "
              />
              <div className="invalid-feedback">Please enter password</div>
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-md-auto pt-1 me-2" style={{ width: "95px" }} />
            <div className="col-md-auto">
              <Link to="register" className="me-3 text-decoration-none">
                ลงทะเบียน
              </Link>
              <Link to="forget_password" className="text-decoration-none">
                ลืมรหัสผ่าน
              </Link>
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-md-auto pt-1 me-2" style={{ width: "95px" }} />
            <div className="col-md-auto">
              <button type="submit" className="btn btn-primary me-2" style={{ width: "100px" }}>
                Login
              </button>
              <button onClick={clearForm} type="reset" className="btn btn-secondary" style={{ width: "100px" }}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
