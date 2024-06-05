import React, { useState } from "react";
import { sendOtp } from "../../services/auth";

import styles from "./sendotpform.module.css";

function SendOTP({ setMobile, mobile, setStep }) {
  const [warn, setWarn] = useState(false);
  const submitHandler = async (event) => {
    event.preventDefault();

    if (mobile.length !== 11) {
      setMobile("");
      setWarn("لطفا شماره تلفن معتبر وارد کنید ");
      return;
    }
    const { response, error } = await sendOtp(mobile);
    if (response) setStep(2);
    if (error) console.log(error);
  };
  return (
    <div>
      <form onSubmit={submitHandler} className={styles.form}>
        <p>ورود به حساب کاربری</p>
        <span>
          برای استفااده از امکانات دیوار ، لطفا شماره موبایل خود را وارد کنید ،
          کد تایید به این شماره ارسال خواهد شد.
        </span>
        <label htmlFor="input"> شماره موبایل خود را وارد کنید </label>

        {warn && <span>{warn}</span>}
        <input
          type="text"
          id="input"
          placeholder="شماره موبایل"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button type="submit">ارسال کد تایید</button>
      </form>
    </div>
  );
}

export default SendOTP;
