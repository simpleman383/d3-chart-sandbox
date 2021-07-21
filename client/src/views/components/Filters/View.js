import React from "react";
import cls from "classnames";
import classes from "./styles.module.scss";
import { Heading, Button } from "views/elements";
import { Filter } from "state/types/analytics";

const localizeFilter = (filter) => {
  if (filter === null) {
    return "Фильтр не применен";
  }
  else {
    const { type, value } = filter;

    let localizedType = type;
    switch(type) {
      case Filter.ByLawsuitType: 
      localizedType = "Тип иска";
        break;
      case Filter.ByCompany:
        localizedType = "Компания";
        break;
      default:
        break;
    }

    return `${localizedType}: ${value}`;
  }
};

const FiltersView = ({ className, filter, onResetFilter }) => {


  return (
    <div className={cls(classes.root, className)}>
      <div className={cls(classes.section, classes.root__section, classes.root__section_filters)}>
        <Heading className={cls(classes.section, classes.section__title)} component="h3">Состояние фильтра</Heading>

        <div className={cls(classes.section__body)}>
          {
            Boolean(filter) && (
              <div className={cls(classes.filter)}>
                <span className={cls(classes.message, classes.filter__message)} onClick={onResetFilter}>{localizeFilter(filter)}</span>
                <Button className={cls(classes.filter__reset)} onClick={onResetFilter}>Сбросить фильтр</Button>
              </div>
            )
          }
          {
            !Boolean(filter) && (
              <div className={cls(classes.filter)}>
                <span className={cls(classes.message, classes.message_nofilter)}>Фильтр не применен</span>
              </div>
            )
          }
        </div>

      </div>

      <div className={cls(classes.root__section, classes.root__section_settings)}>
      </div>
    </div>
  );
};

export default FiltersView;