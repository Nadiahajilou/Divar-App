import Api from "../configs/Api";
import { getCookie } from "../utils/cookies";

const getNewToken = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;
  try {
    const response = await Api.post("auth/check-refresh-token", {
      refreshToken,
    });
    return { response };
  } catch (error) {
    return {error};
  }
};
export {getNewToken}