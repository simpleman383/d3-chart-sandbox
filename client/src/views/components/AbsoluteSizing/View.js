import React from "react";

export const withAbsoluteSizing = Component => ({ children, ...props }) => {

  const ref = React.useRef();
  const [ size, setSize ] = React.useState({ width: 0, height: 0 });

  const updateSize = React.useCallback(() => {
    const width = ref.current ? ref.current.offsetWidth : 0;
    const height = ref.current ? ref.current.offsetHeight : 0;
    setSize({ width, height });
  }, [ setSize, ref.current ]);


  React.useEffect(() => {
    window.addEventListener('resize', updateSize);
    window.addEventListener('orientationchange', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('orientationchange', updateSize);
    }
  }, [ updateSize ]);


  React.useLayoutEffect(() => {
    updateSize();
  }, []);
  
  if (typeof(children) === "function") {
    return <Component ref={ref} children={children(size)} {...props} />;
  }
  else {
    return <Component ref={ref} children={children} {...props} />;
  }
};