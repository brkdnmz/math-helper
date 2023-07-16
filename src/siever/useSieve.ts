import { useCallback, useEffect, useState } from "react";
import { useSieveStore } from "./SieveStore";
import { SieveState } from "./types";

const initialSieve = (upperBound: number) => {
  const sieve = Array<boolean>(upperBound + 1).fill(true);
  sieve[0] = sieve[1] = false;
  return sieve;
};

export function useSieve(upperBound: number) {
  const { state, setState } = useSieveStore();
  const resetSieveStore = useSieveStore((state) => state.reset);
  const [isPrime, setIsPrime] = useState(initialSieve(upperBound));
  const [curNum, setCurNum] = useState(-1);
  const [curMultiple, setCurMultiple] = useState(-1);
  const [highlightedNum, setHighlightedNum] = useState(-1);
  const [message, setMessage] = useState("");

  const reset = useCallback(() => {
    setState(SieveState.NOT_STARTED);
    setIsPrime(initialSieve(upperBound));
    setCurNum(-1);
    setCurMultiple(-1);
    setHighlightedNum(-1);
    setMessage("");
  }, [setState, upperBound]);

  const onStart = () => {
    setCurNum(2);
    setCurMultiple(2);
    setHighlightedNum(2);
    setMessage("Starting with 2, the smallest prime!");
    setState(SieveState.NEW_NUM_STARTED);
  };

  useEffect(() => {
    setIsPrime(initialSieve(upperBound));
  }, [upperBound]);

  useEffect(() => {
    if (state === SieveState.NOT_STARTED) {
      reset();
    }
  }, [state, reset, upperBound]);

  const proceed = () => {
    const prevState = state;
    switch (prevState) {
      case SieveState.NOT_STARTED:
        onStart();
        break;
      case SieveState.NEW_NUM_STARTED: {
        const firstMultiple = curNum ** 2;
        setCurMultiple(firstMultiple);
        if (firstMultiple <= upperBound) {
          setMessage(`First multiple is ${firstMultiple} (smaller multiples already marked)`);
          setHighlightedNum(firstMultiple);
          setState(SieveState.NEW_MULTIPLE);
        } else {
          setMessage(`${firstMultiple} > ${upperBound}, which means we are done...`);
          setState(SieveState.COMPLETED);
        }
        break;
      }
      case SieveState.CUR_NUM_FINISHED: {
        const nextNum = curNum + 1;
        setCurNum(nextNum);
        setCurMultiple(nextNum);
        setHighlightedNum(nextNum);
        if (!isPrime[nextNum]) {
          if (nextNum ** 2 > upperBound) {
            setMessage(`${nextNum ** 2} > ${upperBound}, which means we are done...`);
            setState(SieveState.COMPLETED);
          } else {
            setMessage(`${nextNum} isn't prime, passing...`);
          }
          // State remains the same
        } else {
          setMessage(`${nextNum} is prime! Should go over its multiples.`);
          setState(SieveState.NEW_NUM_STARTED);
        }
        break;
      }
      case SieveState.NEW_MULTIPLE: {
        setMessage(`Marking ${curMultiple} as composite.`);
        setIsPrime(isPrime.map((prevState, i) => (i == curMultiple ? false : prevState)));
        if (curMultiple > upperBound) {
          setMessage(`${curNum} finished!`);
          setState(SieveState.CUR_NUM_FINISHED);
        } else {
          setHighlightedNum(curMultiple);
          setCurMultiple(curMultiple + curNum);
        }
        break;
      }
      case SieveState.COMPLETED:
        setMessage(
          `Done! This is the final list of primes:\n[${Array(upperBound + 1)
            .fill(0)
            .map((_, i) => i)
            .filter((_, i) => isPrime[i])
            .join(", ")}]`
        );
        setCurNum(-1);
        setCurMultiple(-1);
        setState(SieveState.AFTER_COMPLETED);
        break;
      case SieveState.AFTER_COMPLETED:
        resetSieveStore();
        break;
      default:
        break;
    }
  };

  return { isPrime, curNum, curMultiple, highlightedNum, message, proceed, state };
}
