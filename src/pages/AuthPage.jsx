import React, { useState } from "react";
import SendOTP from "../components/templates/SendOTP";
import CheckOTP from "../components/templates/CheckOTP";
import  { Toaster } from "react-hot-toast";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  return (
    <div>
       <Toaster position="top-center" reverseOrder={false} />
    
      {step === 1 && (
        <SendOTP setStep={setStep} mobile={mobile} setMobile={setMobile} />
      )}
      {step === 2 && (
        <CheckOTP
          code={code}
          setCode={setCode}
          mobile={mobile}
          setStep={setStep}
        />
      )}
    </div>
  );
}

export default AuthPage;
