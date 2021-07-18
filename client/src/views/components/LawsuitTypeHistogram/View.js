import React from "react";
import cls from "classnames";
import classes from "./styles.module.scss";
import { D3Histogram } from "./Histogram";


const LawsuitTypeHistogramView = ({ className, data, width, height }) => {
  const containerRef = React.useRef();

  React.useEffect(() => {
    const chart = new D3Histogram(data, { width, height });
    chart.appendTo(containerRef.current);

    return () => {
      chart.dispose();
    };
  }, [ containerRef.current, data, width, height ]);

  return <div ref={containerRef} className={cls(classes.root, className)} style={{ width, height }} />;
};

export default LawsuitTypeHistogramView;
