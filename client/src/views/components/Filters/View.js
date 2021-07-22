import React from "react";
import cls from "classnames";
import classes from "./styles.module.scss";
import { Button } from "views/elements";
import { Filter } from "state/types/analytics";

const localizeFilter = (filter) => {
  const { type, value } = filter;

  let localizedType = type;

  switch(type) {
    case Filter.ByLawsuitType: 
    localizedType = "Lawsuit type";
      break;
    case Filter.ByCompany:
      localizedType = "Company";
      break;
    default:
      break;
  }

  return `${localizedType}: ${value}`;
};


const FiltersView = ({ className, filters, onRemoveFilter, onResetFilters }) => {

  const isFiltersSet = Boolean(filters) && Array.isArray(filters) && filters.length !== 0;

  return (
    <div className={cls(classes.filter, className)}>
      {
        !isFiltersSet && (
          <div className={cls(classes.filter__emptyBox)}>       
            <span className={cls(classes.filter__text)}>No filters</span>
          </div>      
        )
      }
      {
        isFiltersSet && (
          <>
            <ul className={cls(classes.filter__state)}>
              {
                filters.map(filter => {
                  return (
                    <li key={filter.id} className={cls(classes.filter__option)}>
                      <span className={cls(classes.filter__text)}>{localizeFilter(filter)}</span>
                      <Button className={cls(classes.filter__reset)} onClick={() => onRemoveFilter(filter.id)}>Delete</Button>
                    </li>
                  );
                })
              }
            </ul>

            <div className={cls(classes.filter__actions)}>
              <Button className={cls(classes.filter__resetAll)} onClick={onResetFilters}>Reset all</Button>
            </div>
          </>
        )
      }
    </div>
  );
};

export default FiltersView;