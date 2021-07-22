import React from "react";
import cls from "classnames";
import classes from "./styles.module.scss";

const Input = ({ className, error, ...props }) => {

  return <input className={cls(classes.root, error && classes.root_error, className)} {...props} />
};

export default Input;