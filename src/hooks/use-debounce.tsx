import {useCallback, useRef} from "react";

export const useDebounce = <
  F extends (...args: Parameters<F>) => ReturnType<F>,
>(
  func: F,
  delay: number,
) => {
  const timeRef = useRef<null | NodeJS.Timeout>(null);

  return useCallback(
    (...args: Parameters<F>) => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
      timeRef.current = setTimeout(func, delay, ...args);
    },
    [delay, func],
  );
};
