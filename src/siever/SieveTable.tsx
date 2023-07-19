import clsx from "clsx";
import { useSieveStore } from "./SieveStore";
import { SieveState } from "./types";
import { useGrid } from "./useGrid";

export function SieveTable() {
  const { upperBound, isPrime, animation } = useSieveStore();
  const { rows: grid, rowsClass } = useGrid(upperBound);

  return (
    <div className="container mb-5">
      <h2 className="mb-2 whitespace-pre-wrap">{animation.stepMessage}</h2>
      <div className={clsx("grid gap-2 w-full", rowsClass)}>
        {grid.map((row, i) => (
          <div
            key={i}
            className={clsx("flex gap-2")}
          >
            {row.map((num) => (
              <div
                key={num}
                className={clsx(
                  "flex items-center justify-center text-lg border basis-1/12 aspect-square border-slate-600",
                  !isPrime[num] && "bg-rose-200 text-rose-800",
                  animation.curNum === num && animation.state < SieveState.COMPLETED && "bg-yellow-300 text-yellow-700",
                  animation.highlightedNum === num &&
                    animation.state < SieveState.COMPLETED &&
                    "ring-4 ring-sky-500 ring-offset-2",
                  animation.state === SieveState.AFTER_COMPLETED &&
                    isPrime[num] &&
                    "bg-green-300 text-green-800 ring-2 ring-green-600 border-none"
                )}
              >
                {num}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
