import { useEffect } from "react";

type keyPressOptions = {
  callback?: () =>void;
  shiftKey?: boolean;  
  altKey?: boolean;  
  ctrlKey?: boolean;
  event?: "keyup" | "keydown";
}

//By default, this hook listens 'keydown' events.
const useKeyPress = (keyCode: string, options?: keyPressOptions): void => {

  const event = options?.event ? "keyup" : "keydown";

  const handler = ({ code, shiftKey, ctrlKey, altKey }: KeyboardEvent): void => {
    if (code === keyCode) {
      options?.callback();
    }
  };

  useEffect(() => {
    window.addEventListener(event, handler);

    return () => {
      window.removeEventListener(event, handler);
    };
  }, []);
};

export default useKeyPress;