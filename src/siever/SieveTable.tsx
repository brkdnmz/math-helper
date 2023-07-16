import clsx from "clsx";
import { useEffect } from "react";
import { useSieveStore } from "./SieveStore";
import { SieveState } from "./types";
import { useGrid } from "./useGrid";
import { useSieve } from "./useSieve";

export function SieveTable() {
  const { upperBound: upperBoundStr, state, start, setState } = useSieveStore();
  const upperBound = Number(upperBoundStr);
  const { rows: grid, rowsClass } = useGrid(upperBound);
  const sieve = useSieve(upperBound);

  useEffect(() => {
    const onEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (state === SieveState.NOT_STARTED) start();
        sieve.proceed();
      }
    };
    document.addEventListener("keydown", onEnter);

    return () => document.removeEventListener("keydown", onEnter);
  }, [sieve, start, state]);

  useEffect(() => {
    setState(SieveState.NOT_STARTED);
  }, [setState]);

  return (
    <div className="container mb-5">
      <h2 className="mb-2 whitespace-pre-wrap">{sieve.message}</h2>
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
                  !sieve.isPrime[num] && "bg-rose-200 text-rose-800",
                  sieve.curNum === num && sieve.state !== SieveState.AFTER_COMPLETED && "bg-yellow-300 text-yellow-700",
                  sieve.highlightedNum === num &&
                    sieve.state !== SieveState.AFTER_COMPLETED &&
                    "ring-4 ring-sky-500 ring-offset-2",
                  sieve.state === SieveState.AFTER_COMPLETED &&
                    sieve.isPrime[num] &&
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
