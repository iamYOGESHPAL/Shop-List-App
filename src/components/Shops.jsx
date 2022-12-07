import React from "react";
import { useSelector } from "react-redux";
import ShopCard from "./ShopCard";
import styles from "../styles/modules/shopCard.module.scss";
import getClasses from "../utils/getClasses";

const Shops = () => {
  const shopList = useSelector((state) => state.shopReducer.filteredShopList);
  const sortedShopList = [...shopList];
  sortedShopList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="shops">
      {sortedShopList && sortedShopList.length > 0 ? (
        sortedShopList.map((shop) => <ShopCard shop={shop} key={shop.id} />)
      ) : (
        <div className={styles.card}>
          <div className={getClasses([styles.shopText])}>No Shop Found</div>
        </div>
      )}
    </div>
  );
};

export default Shops;
