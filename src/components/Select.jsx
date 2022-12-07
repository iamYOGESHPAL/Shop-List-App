import React from "react";
import getClasses from "../utils/getClasses";
import styles from "../styles/modules/button.module.scss";

const Select = ({ children, ...rest }) => {
  return (
    <select
      className={getClasses([styles.button, styles.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
};

export default Select;
