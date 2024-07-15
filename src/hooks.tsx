import { useEffect } from 'react';

const useClickOutside = (ref, handler, enabled = true, buttonRef = null) => {
  if (buttonRef) {
    buttonRef.current = buttonRef?.current || buttonRef;
  }
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        !ref.current ||
        ref.current.contains(event.composedPath()?.[0]) ||
        !enabled ||
        buttonRef?.current?.contains(event.composedPath()?.[0])
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler, enabled, buttonRef]);
};
export default useClickOutside;
