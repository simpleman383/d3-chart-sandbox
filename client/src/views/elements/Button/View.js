import React from "react";
import cls from "classnames";
import classes from "./styles.module.scss";

const Button = ({ className, ...props }) => {
  return <button className={cls(classes.root, className)} {...props} />
};

export default Button;