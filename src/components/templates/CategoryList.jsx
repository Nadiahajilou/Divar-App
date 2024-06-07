import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getCategory, deleteCategory } from "../../services/admin/Category";
import Loader from "../modules/Loader";
import { LuTrash2 } from "react-icons/lu";
import styles from "./categorylist.module.css";

function CategoryList() {
  const { data, isLoading } = useQuery(["getCategory"], getCategory);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("getCategory");
    },
  });

  const deleteHandler = (id) => {
    mutate(id);
  };

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data.data.map((item) => (
          <div key={item._id}>
            <img src={`${item.icon}.svg`} />
            <h5>{item.name}</h5>
            <p>slug :{item.slug}</p>
            <span onClick={() => deleteHandler(item._id)} >
              <LuTrash2 />
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
