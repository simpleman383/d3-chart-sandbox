import React from "react";
import cls from "classnames";
import classes from "./styles.module.scss";
import { Heading } from "views/elements";
import { FilterControls, DataSourceControls } from "views/components";


const SettingsView = ({ className }) => {
  return (
    <div className={cls(classes.root, className)}>
      <div className={cls(classes.section, classes.root__section, classes.root__section_filters)}>
        <Heading className={cls(classes.section, classes.section__title)} component="h3">Filters</Heading>
        <div className={cls(classes.section__body)}>
          <FilterControls />
        </div>
      </div>

      <div className={cls(classes.root__section, classes.root__section_datasource)}>
        <Heading className={cls(classes.section, classes.section__title)} component="h3">Data Source</Heading>
        <div className={cls(classes.section__body)}>
          <DataSourceControls />
        </div>
      </div>
    </div>
  );
};

export default SettingsView;