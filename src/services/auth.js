import Api from "../configs/Api";

const sendOtp = async (mobile) => {
  try {
    const response = await Api.post("auth/send-otp", { mobile: mobile });
    return { response };
  } catch (error) {
    return { error };
  }
};

const checkOtp = async (mobile, code) => {
  try {
    const response = await Api.post("auth/check-otp", { mobile, code });
    return { response };
  } catch (error) {
    return { error };
  }
};

export { sendOtp,checkOtp };
