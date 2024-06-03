import React, { useState } from "react";
import styles from "./categoryform.module.css";
import {
 
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { addCategory } from "../../services/admin/Category";

function CategoryForm() {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });
  const queryClient = useQueryClient();
  const { mutate, error, isLoading, data } = useMutation(addCategory, {
    onSuccess: () => queryClient.invalidateQueries("getCategory"),
  });
  console.log({ error, isLoading, data });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const submitHandler = (event) => {
    event.preventDefault();

    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
  };
  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <h3>ایجاد دسته بندی جدید</h3>
      {!!error && <p>مشکلی پیش امده !</p>}
      {data?.status === 201 && <p>دسته بندی با موفقیت انجام شد</p>}
      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">ایکون</label>
      <input type="text" name="icon" id="icon" />
      <button type="submit" disabled={isLoading}>
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;
