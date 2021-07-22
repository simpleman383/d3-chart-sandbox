import React from "react";


const debounce = (callback, timeout) => {
  let timer = null;

  const debounced = function() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      if (typeof(callback) === "function") {
        console.log(arguments);
        callback.apply(this, arguments);
      }
    }, timeout);
  };

  debounced.cancel = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  return debounced;
}

export const useDebouncedCallback = (callback, timeout = 300, dependencies) => {
  const debouncedCallback = React.useMemo(() => debounce(callback, timeout), [ dependencies ]);

  React.useEffect(() => {
    return () => {
      debouncedCallback.cancel();
    };
  }, [ debouncedCallback ]);

  return debouncedCallback;
};