import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteShop } from "../slices/shopSlice";
import styles from "../styles/modules/shopCard.module.scss";
import ShopModal from "./ShopModal";
const ShopCard = ({ shop }) => {
  const [updateModelOpen, setUpdateModelOpen] = useState(false);
  const dispatch = useDispatch();
  const handleUpdate = () => {
    setUpdateModelOpen(true);
  };
  const handleDelete = () => {
    dispatch(deleteShop(shop.id));
  };
  return (
    <>
      <div className={styles.card}>
        <div className={styles.shopDetails}>
          <div className={styles.text}>
            <p className={styles.shopText}>{shop.name}</p>
            <div className={styles.text}>
              <span className={styles.time}>{shop.area}</span>,
              <span className={styles.time}> {shop.category}</span>
            </div>
            <div className={styles.text}>
              <p className={styles.time}> &nbsp;</p>
              <span className={styles.text}>
                Open from : {shop.openingDate}{" "}
              </span>
              <span className={styles.time}>
                &nbsp; &nbsp; &nbsp; Close on : {shop.closingDate}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.shopAction}>
          <div
            className={styles.icon}
            onClick={handleUpdate}
            role="button"
            tabIndex={0}
          >
            <MdEdit></MdEdit>
          </div>
          <div
            className={styles.icon}
            onClick={handleDelete}
            role="button"
            tabIndex={0}
          >
            <MdDelete></MdDelete>
          </div>
        </div>
      </div>
      <ShopModal
        type={"update"}
        modalOpen={updateModelOpen}
        setModalOpen={setUpdateModelOpen}
        oldShop={shop}
      />
    </>
  );
};

export default ShopCard;
