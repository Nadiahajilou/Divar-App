import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/admin/Category";
import toast from "react-hot-toast";

import styles from "./addpost.module.css";
import { getCookie } from "../../utils/cookies";
import axios from "axios";

function AddPosts() {
  const { data, isLoading } = useQuery(["getCategory"], getCategory);
 

  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: null,
    images: null,
    city: "",
    category: "",
  });
  const changeHandler = (e) => {
    const name = e.target.name;

    if (name !== "images") {
      setForm({ ...form, [name]: e.target.value });
    } else {
      setForm({ ...form, [name]: e.target.files[0] });
    }
  };

  const addHandler = (e) => {
    e.preventDefault();

    //for sending data as file to server we have to put the data in formData()
    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }

    const token = getCookie("accessToken");

    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => toast.success(res.data.message))

      .catch((error) => console.log(error));
      // toast.error("مشکلی پیش امده ")
  };
  return (
    <form onChange={changeHandler} className={styles.form}>
      <h3>افزودن آگهی </h3>
      <label htmlFor="title">عنوان</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="">توضیحات</label>
      <textarea name="content" id="content" />
      <label htmlFor="amount">قیمت</label>
      <input type="number" name="amount" id="amount" />
      <label htmlFor="city">شهر</label>
      <input type="text" name="city" id="city" />
      <label htmlFor="category">دسته بندی </label>
      <select name="category" id="category">
        {data?.data.map((i) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>
      <label htmlFor="images">تصویر</label>
      <input type="file" name="images" id="images" />
      <button onClick={addHandler} disabled={isLoading}>
        ایجاد
      </button>
    </form>
  );
}

export default AddPosts;
