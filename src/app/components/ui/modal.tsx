import { useCallback, useEffect, useRef, useState } from "react";

export default function Modal({
  children,
  onClose,
  closed,
}: {
  children: React.ReactNode;
  onClose: any;
  closed?: any;
}) {
  const [close, setClose] = useState(false);
  const ref: any = useRef();
  const handleClose = useCallback(() => {
    setTimeout(() => {
      onClose();
    }, 300);
    setClose(true);
  }, [onClose]);

  useEffect(() => {
    if (closed) {
      handleClose();
    }
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [closed, handleClose, onClose]);
  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-blackCustom z-30 opacity-0 animate-fadeIn ${
        close ? "animate-fadeOut" : ""
      }`}
    >
      <div
        className="bg-slate-100 p-5 mx-2 rounded-xl animate-popUp dark:bg-dark"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
