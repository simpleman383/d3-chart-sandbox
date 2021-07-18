import React from "react";
import cls from "classnames";
import classes from "./styles.module.scss";
import { D3Graph } from "./Graph";

const NetworkChartView = ({ className, width, height, data, onNodeClick, ...props }) => {
  const containerRef = React.useRef(null);

  const handleNodeClick = React.useCallback((data, event, node) => {
    if (typeof(onNodeClick) === "function") {
      onNodeClick(data);
    }
  }, [ onNodeClick ]);

  React.useEffect(() => {
    const size = { width, height };

    const graph = new D3Graph(data, size, {
      onNodeClick: handleNodeClick,
    });

    graph.appendTo(containerRef.current);

    return () => {
      graph.dispose();
    };
  }, [ data, width, height, handleNodeClick ]);

  return (
    <div className={cls(classes.root, className)} style={{ width, height }}>
      <div ref={containerRef}  className={cls(classes.root__container)} />
    </div>
  );
};


export default NetworkChartView;