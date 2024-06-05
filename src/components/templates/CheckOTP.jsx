import React, { useState } from "react";
import { checkOtp } from "../../services/auth";

import { setCookie } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/user/userProfile";
import styles from "./checkotpform.module.css";

function CheckOTP({ code, setCode, setStep, mobile }) {
  const { refetch } = useQuery(["profile"], getUserProfile);
  const [warn, setWarn] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    if (code.length !== 5) {
      setWarn("کد وارد شده باید 5 رقمی باشد.");
      return;
    }
    const { response, error } = await checkOtp(mobile, code);

    if (response) {
      setCookie(response.data);
      navigate("/");
      refetch();
    }
    if (error) console.log(error);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد اس ام اس شده</p>
      <span>کد پیامک شده به شماره «{mobile}» را وارد کنید .</span>
      <label htmlFor="input">کد تایید را وارد کنید :</label>
      {warn && <span>{warn}</span>}
      <input
        type="text"
        id="input"
        placeholder=" کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)} className={styles.backbtn}>
        تغییر شماره
      </button>
    </form>
  );
}

export default CheckOTP;
