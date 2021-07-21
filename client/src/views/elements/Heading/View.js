import React from "react";
import cls from "classnames";
import classes from "./styles.module.scss";

const Heading = ({ component = "h6", children, className, ...props }) => {
  const elementType = /^h[1-6]$/i.test(component) ? component : "h6"; 

  return React.createElement(
    elementType, 
    { 
      className: cls(classes.root, classes[`root_${component}`], className), 
      ...props 
    }, 
    children
  );
};

export default Heading;