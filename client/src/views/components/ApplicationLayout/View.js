import React from "react";
import cls from "classnames";
import classes from "./styles.module.scss";

import { Dashboard } from "views/components";


export const ApplicationLayout = () => {

  return (
    <div className={cls(classes.root)}>
      <main className={cls(classes.root__main)}>
        <Dashboard className={cls(classes.root__dashboard)} />
      </main> 
    </div>
  )
};