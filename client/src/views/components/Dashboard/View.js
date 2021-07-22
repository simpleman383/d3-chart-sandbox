import React from "react";
import cls from "classnames";
import classes from "./styles.module.scss";

import { AbsoluteSizingPanel, LawsuitNetworkGraph, LawsuitTypeHistogram, Settings } from "views/components";
import { Panel } from "views/elements";

const DashboardView = () => {

  return (
    <div className={cls(classes.root)}>
      <div className={cls(classes.root__container)}>

        <div className={cls(classes.root__column, classes.root__column_main)}>
          <AbsoluteSizingPanel className={cls(classes.root__panel, classes.root__panel_main)}>
            {
              (size) => <LawsuitNetworkGraph width={size.width} height={size.height} />
            }
          </AbsoluteSizingPanel>
        </div>

        <div className={cls(classes.root__column, classes.root__column_aside)}>
          <AbsoluteSizingPanel className={cls(classes.root__panel, classes.root__panel_aside_top)}>
            {
              (size) => <LawsuitTypeHistogram width={size.width} height={size.height} />
            }
          </AbsoluteSizingPanel>

          <Panel className={cls(classes.root__panel, classes.root__panel_aside_bottom)}>
            <Settings />
          </Panel>
        </div>

      </div>

    </div>
  );
};

export default DashboardView;