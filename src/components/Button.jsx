import React from "react";
import styles from "../styles/modules/button.module.scss";
import modalStyles from "../styles/modules/modal.module.scss";
import getClasses from "../utils/getClasses";

const Button = ({ children, varient, type, ...rest }) => {
  const buttonType = {
    primary: "primary",
    secondary: "secondary",
  };
  return (
    <button
      className={getClasses([
        styles.button,
        styles[`button--${buttonType[varient]}`],
        type === "submit" ? modalStyles.button__submit : "",
      ])}
      type={type === "submit" ? "submit" : "button"}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
