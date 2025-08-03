import toast from "react-hot-toast";

export default function Counting(props: any) {
  const { className, count, setCount, maxCount } = props;
  const handleCountUp = () => {
    if (count >= maxCount) {
      toast.error("Stock Tidak Mencukupi");
      return;
    }
    setCount(count + 1);
  };

  const handleCountDown = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className={`inline-block gap-1 ${className}`}>
      <div className="border border-neutral-300 rounded-md flex items-center justify-center">
        <button
          className="px-2 py-1 text-primary"
          onClick={() => handleCountDown()}
        >
          -
        </button>
        <p className="px-4 dark:text-bright">{count}</p>
        <button
          className="px-2 py-1 text-primary"
          onClick={() => handleCountUp()}
        >
          +
        </button>
      </div>
    </div>
  );
}
