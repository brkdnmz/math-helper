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

  const propertiesList = [
    { description: "Number of digits", value: `${properties.nDigits}` },
    { description: "Factorization", value: factorizationLatex },
    { description: "Number of divisors", value: `${properties.nDivisors} ${exponentsProductLatex}` },
    { description: "Is prime?", value: `\\text{${properties.isPrime ? "Yes" : "No"}}` },
    {
      description: "Primes up to current",
      value: properties.nPrimesUpTo === undefined ? "\\text{Number too big}" : `${properties.nPrimesUpTo}`,
    },
    { description: "Previous prime", value: `${properties.prevPrime ?? "-"}` },
    { description: "Next prime", value: `${properties.nextPrime ?? "-"}` },
  ];

  return (
    <Card className="w-full p-3">
      <CardTitle>
        Properties of <InlineMath>{`${number}`}</InlineMath>
      </CardTitle>
      <CardHeader>
        <ul className="grid grid-cols-1 gap-2 divide-y divide-slate-300">
          {propertiesList.map(({ description, value }) => (
            <li key={description}>
              <h2 className="text-lg font-light">{description}</h2>
              <span className="text-xl">
                <InlineMath>{value}</InlineMath>
              </span>
            </li>
          ))}
        </ul>
      </CardHeader>
    </Card>
  );
}