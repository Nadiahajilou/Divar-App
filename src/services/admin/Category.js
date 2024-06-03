import Api from "../../configs/Api";
//data hamun form hastesh (name , icon , slug)
const addCategory = (data) => {
  return Api.post("category", data);
};
const getCategory = () => {
  return Api.get("category");
};

const deleteCategory=(id)=>{
  return Api.delete(`/category/${id}`)
  
}
export { addCategory  ,getCategory,deleteCategory};
