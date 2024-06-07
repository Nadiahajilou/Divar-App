import Api from "../../configs/Api";

const getUserProfile = () => Api.get("user/whoami").then((res) => res || false);
const getPost = () => Api.get("post/my");
const getAllPosts = () => Api.get("");

export { getUserProfile, getPost, getAllPosts };
