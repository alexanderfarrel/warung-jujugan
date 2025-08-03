import { useCallback, useEffect, useRef, useState } from "react";

export default function Modal({
  children,
  onClose,
  closed,
  intro = false,
  addFnc,
  className,
}: {
  children: React.ReactNode;
  onClose: any;
  closed?: any;
  intro?: boolean;
  addFnc?: any;
  className?: string;
}) {
  const [close, setClose] = useState(false);
  const timeoutRef = useRef<any>(null);
  const ref: any = useRef();
  const handleClose = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      if (typeof addFnc === "function") {
        addFnc();
      }
      onClose();
    }, 300);
    setClose(true);
  }, [addFnc, onClose]);

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

    return () => {
      clearTimeout(timeoutRef.current);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closed, handleClose, onClose]);
  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-blackCustom z-[9999] opacity-0 ${
        intro ? "animate-fadeInIntro" : "animate-fadeIn"
      } ${close ? "animate-fadeOut" : ""}`}
    >
      <div
        className={`bg-slate-100 p-4 mx-2 rounded-xl animate-popUp dark:bg-dark ${className}`}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
