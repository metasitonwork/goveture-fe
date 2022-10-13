import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
let checkString = null;
const Input = (fn, username = "") => {
  const history = useHistory();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState(false);

  const changeValue = (event, statusClear = false) => {
    if (username === "username") {
      if (statusClear) {
        setValue("");
        setStatus(false);
        return;
      }
      if (checkString) {
        clearInterval(checkString);
      }
      setValue(event.target.value);
      if (event.target.value.length > 5) {
        checkString = setTimeout(async () => {
          let checkUser = await axios({
            method: "post",
            url: "https://goventure-be-test.vercel.app/check_user",
            data: { username: event.target.value },
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token")
            },
            withCredentials: true
          }).then(success => {
            try {
              if (success.data.text === "Error") {
                // history.push("/login");
              }
            } catch (error) {}
            return success;
          });
          if (checkUser.status === 200) {
            if (checkUser.data.status === 400) {
              setStatus(true);
            } else {
              setStatus(false);
            }
          }
        }, 1000);
      }
    } else {
      if (statusClear) {
        setValue("");
        setStatus(false);
      } else {
        setStatus(false);
        setValue(event.target.value);
      }
    }
  };
  function CheckValid(valid) {
    const ck = fn(value);
    setStatus(!ck);
    return !ck;
  }
  function UsernameStatus(valueStatus) {
    setStatus(valueStatus);
    return valueStatus;
  }
  return {
    value,
    status,
    changeValue,
    CheckValid,
    UsernameStatus,
    setValue
  };
};

export default Input;
