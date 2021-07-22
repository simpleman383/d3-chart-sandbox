import React from "react";
import cls from "classnames";
import classes from "./styles.module.scss";

const SelectableBadges = ({ className, value, options, renderButtonLabelFn, children, onChange, ...props }) => {

  const handleBadgeClick = optionKey => {
    if (value !== optionKey && typeof(onChange) === "function") {
      onChange(optionKey);
    }
  };

  return (
    <div className={cls(classes.root, className)}>
      {
        (options || []).map(option => {
          const active = value === option.key;
          const label = typeof(renderButtonLabelFn) === "function" ? renderButtonLabelFn(option) : option.value;
          return <span key={option.key} className={cls(classes.badge, active && classes.badge_active, classes.root__badge)} onClick={() => handleBadgeClick(option.key)}>{label}</span>
        })
      }
    </div>
  );

};

export default SelectableBadges;