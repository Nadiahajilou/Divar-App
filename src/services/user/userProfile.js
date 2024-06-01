import Api from "../../configs/Api";


const getUserProfile = () => Api.get("user/whoami").then((res) => res || false);

export { getUserProfile };
