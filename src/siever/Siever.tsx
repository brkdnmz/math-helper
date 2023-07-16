import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useSieveStore } from "./SieveStore";
import { SieveTable } from "./SieveTable";
import { SieveState } from "./types";

export function Siever() {
  const { upperBound, state, setUpperBound, start, reset } = useSieveStore();

  return (
    <>
      <Card className="w-full p-3">
        <CardTitle className="text-center">Siever</CardTitle>
        <CardDescription className="text-center">Watch How I Sieve!</CardDescription>
        <CardHeader>
          <Label
            htmlFor="number"
            className="text-center"
          >
            Enter the upper bound
          </Label>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 max-lg:flex-wrap">
            <Input
              type="number"
              id="number"
              value={upperBound}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                if (e.target.value && !(1 <= newValue && newValue <= 100)) {
                  return;
                }
                setUpperBound(e.target.value);
              }}
              disabled={state !== SieveState.NOT_STARTED}
            />
            <Button
              onClick={state !== SieveState.NOT_STARTED ? reset : start}
              disabled={upperBound === ""}
            >
              {state !== SieveState.NOT_STARTED ? "Stop" : "Start"}
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full p-3">
        <SieveTable />
      </Card>
    </>
  );
}
