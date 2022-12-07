import React from "react";
import { Toaster } from "react-hot-toast";
import FilterBar from "./components/FilterBar.jsx";
import Header from "./components/Header.jsx";
import Shops from "./components/Shops.jsx";
import styles from "./styles/modules/app.module.scss";

const App = () => {
  return (
    <>
      <div className="container">
        <Header>SHOP LIST</Header>
        <div className={styles.app__wrapper}>
          <FilterBar />
          <Shops />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.5rem",
          },
        }}
      />
    </>
  );
};

export default App;
