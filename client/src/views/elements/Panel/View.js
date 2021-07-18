import React from "react";
import cls from "classnames";
import classes from "./styles.module.scss";

export const Panel = React.forwardRef(({ className, ...props }, ref) => {
  return <section ref={ref} className={cls(classes.root, className)} {...props} />;
});