import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntegerProperties } from "@/hooks/useIntegerProperties";
import { useMemo } from "react";
import { InlineMath } from "react-katex";

export function Properties({ number }: { number: number }) {
  const properties = useIntegerProperties(number);
  const factorizationLatex = useMemo(() => {
    if (properties.factorization.length == 0) return "-";
    return properties.factorization.map((f) => `${f.prime}^{${f.exponent}}`).join(" \\cdot ");
  }, [properties.factorization]);
  const exponentsProductLatex = useMemo(() => {
    if (properties.factorization.length < 2) return "";
    return ` \\ (${properties.factorization.map(({ exponent }) => exponent + 1).join(" \\cdot ")})`;
  }, [properties.factorization]);

  if (isNaN(number) || !number) return <></>;

  return (
    <Card className="w-full p-3">
      <CardTitle className="text-center">
        Properties of <InlineMath>{`${number}`}</InlineMath>
      </CardTitle>
      <CardHeader>
        <ul className="grid grid-cols-1 text-xl">
          <li>
            <h1 className="text-2xl font-light">Number of digits</h1>
            <InlineMath>{`${properties.nDigits}`}</InlineMath>
          </li>
          <li>
            <h1 className="text-2xl font-light">Factorization</h1>
            <InlineMath>{factorizationLatex}</InlineMath>
          </li>
          <li>
            <h1 className="text-2xl font-light">Number of divisors</h1>
            <InlineMath>{`${properties.nDivisors} ${exponentsProductLatex}`}</InlineMath>
          </li>
          <li>
            <h1 className="text-2xl font-light">Is Prime</h1>
            <InlineMath>{`\\text{${properties.isPrime ? "Yes" : "No"}}`}</InlineMath>
          </li>
          <li>
            <h1 className="text-2xl font-light">Number of primes up to current</h1>
            <InlineMath>
              {properties.nPrimesUpTo === undefined
                ? `\\text{Number too big } (> ${properties.maxPrimeLimit ?? 0})`
                : `${properties.nPrimesUpTo}`}
            </InlineMath>
          </li>
          <li>
            <h1 className="text-2xl font-light">Previous Prime</h1>
            <InlineMath>{`${properties.prevPrime ?? "-"}`}</InlineMath>
          </li>
          <li>
            <h1 className="text-2xl font-light">Next Prime</h1>
            <InlineMath>{`${properties.nextPrime}`}</InlineMath>
          </li>
        </ul>
      </CardHeader>
    </Card>
  );
}
