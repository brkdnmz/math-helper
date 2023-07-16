import { useAppStore } from "@/AppStore";
import { useMemo } from "react";

export function useIntegerProperties(x: number) {
  const mathHelper = useAppStore((state) => state.mathHelper);
  const factorization = useMemo(() => mathHelper?.factorize(x) ?? [], [mathHelper, x]);
  const nDivisors = useMemo(() => mathHelper?.nDivisorsFactorization(factorization) ?? 0, [factorization, mathHelper]);
  const isPrime = useMemo(() => nDivisors == 2, [nDivisors]);
  const prevPrime = useMemo(() => mathHelper?.prevPrime(x), [mathHelper, x]);
  const nextPrime = useMemo(() => mathHelper?.nextPrime(x), [mathHelper, x]);
  const nDigits = useMemo(() => x.toString().length, [x]);
  const nPrimesUpTo = useMemo(() => mathHelper?.nPrimesUpTo(x), [mathHelper, x]);

  return {
    maxPrimeLimit: mathHelper?.PRIME_UPPER_BOUND,
    factorization,
    nDivisors,
    isPrime,
    prevPrime,
    nextPrime,
    nDigits,
    nPrimesUpTo,
  };
}
