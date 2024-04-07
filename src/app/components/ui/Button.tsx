export default function Button({
  children,
  className,
  onClick,
  type,
  disabled = false,
}: {
  children: any;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  return (
    <button
      className={`py-2 px-4 ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
