import React from "react";
import cls from "classnames";
import classes from "./styles.module.scss";

import { AbsoluteSizingPanel, LawsuitNetworkChart, LawsuitTypeHistogram } from "views/components";


const DashboardView = () => {

  return (
    <div className={cls(classes.root)}>
      <div className={cls(classes.root__container)}>

        <div className={cls(classes.root__column, classes.root__column_main)}>
          <AbsoluteSizingPanel className={cls(classes.root__panel, classes.root__panel_main)}>
            {
              (size) => <LawsuitNetworkChart width={size.width} height={size.height} />
            }
          </AbsoluteSizingPanel>
        </div>

        <div className={cls(classes.root__column, classes.root__column_aside)}>
          <AbsoluteSizingPanel className={cls(classes.root__panel, classes.root__panel_aside)}>
            {
              (size) => <LawsuitTypeHistogram width={size.width} height={size.height} />
            }
          </AbsoluteSizingPanel>
        </div>

      </div>

    </div>
  );
};

export default DashboardView;