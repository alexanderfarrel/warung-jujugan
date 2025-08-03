import { useState } from "react";
import Warning from "./Warning";

type typesProp = {
  type: string;
  placeholder?: string;
  name?: string;
  className?: string;
  id?: string;
  maxLength?: number;
  spellCheck?: boolean;
  onChange?: (e: any) => void;
  defaultValue?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  totalChar?: number;
};

export default function Input(props: typesProp) {
  const {
    type,
    name,
    placeholder,
    className,
    id,
    label,
    onChange,
    defaultValue,
    maxLength,
    spellCheck,
    disabled = false,
    error,
    required = false,
    totalChar = 0,
  } = props;

  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const borderColor = disabled
    ? "border-gray"
    : error
    ? "border-red-500"
    : isFocus
    ? "border-primary"
    : "border-blue-500";

  return (
    <div className="relative flex flex-col items-center">
      {label && (
        <label
          className={`self-start font-bold absolute ${
            isFocus || totalChar > 0
              ? "-top-0 text-[14px] dark:text-bright"
              : "ml-2 top-2 dark:text-neutral-400"
          } text-neutral-500 transition-all duration-300 z-10 `}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="flex w-full">
        <input
          type={type}
          name={name}
          id={id}
          maxLength={maxLength}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          autoComplete="off"
          className={`${className} outline-none w-full p-2 rounded-t-lg border-b-2 ${borderColor} ${
            disabled
              ? "cursor-not-allowed bg-neutral-200 text-zinc-400"
              : "bg-slate-200"
          } ${
            (label && isFocus) || (label && totalChar > 0) ? "mt-6" : "mt-0"
          } transition-all duration-200 dark:bg-dark2 dark:text-neutral-200 appearance-none focus:dark:bg-dark2`}
          spellCheck={spellCheck}
          disabled={disabled}
        />
        {error && (
          <div className="group text-red-500 relative right-4 flex justify-center">
            <Warning
              className={` absolute animate-bounce-fast ${
                label ? "top-[50%]" : "top-[25%]"
              }`}
            >
              <p
                className={`group-hover:opacity-100 ${
                  label
                    ? "group-hover:-top-1 top-2"
                    : "group-hover:-top-7 -top-3"
                } absolute text-sm -right-5 opacity-0 bg-neutral-200 whitespace-nowrap px-2 rounded-xl transition-all duration-300`}
              >
                {error}
              </p>
            </Warning>
          </div>
        )}
      </div>
    </div>
  );
}
