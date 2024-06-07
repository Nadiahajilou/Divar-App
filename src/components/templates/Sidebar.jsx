import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/admin/Category";
import styles from "./sidebar.module.css";
import { useState } from "react";
function Sidebar() {
  const { data, isLoading } = useQuery(["getCategory"], getCategory);

  return (
    <div className={styles.sidebar}>
        <h4>دسته بندی </h4>
      <ul>
        {data?.data.map((item) => (
          <li key={item._id}>
            <img src={`${item.icon}.svg`} />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
 
}

export default Sidebar;
