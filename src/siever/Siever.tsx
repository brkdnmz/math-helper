import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useCallback, useEffect } from "react";
import { useSieveStore } from "./SieveStore";
import { SieveTable } from "./SieveTable";
import { SieveState } from "./types";

export function Siever() {
  const { upperBound, setUpperBound, animation, startAnimation, proceedAnimation, resetAnimation } = useSieveStore();

  const isAnimationNotStarted = animation.state === SieveState.NOT_STARTED;
  const isAnimationFinished = animation.state === SieveState.AFTER_COMPLETED;

  const buttonText = (() => {
    if (animation.state === SieveState.NOT_STARTED) return "Start";
    else if (animation.state !== SieveState.AFTER_COMPLETED) return "Enter to proceed";
    else return "Stop";
  })();

  const onProceedAnimation = useCallback(() => {
    if (animation.state === SieveState.NOT_STARTED) startAnimation();
    else if (animation.state !== SieveState.AFTER_COMPLETED) proceedAnimation();
    else resetAnimation();
  }, [animation.state, proceedAnimation, resetAnimation, startAnimation]);

  useEffect(() => {
    const onEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onProceedAnimation();
      }
    };
    document.addEventListener("keydown", onEnter);

    return () => document.removeEventListener("keydown", onEnter);
  }, [animation.state, onProceedAnimation]);

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
                const newValue = Number(e.target.valueAsNumber);
                console.log(newValue);

                if (!isNaN(newValue) && !(1 <= newValue && newValue <= 100)) {
                  return;
                }
                setUpperBound(newValue);
              }}
              disabled={animation.state !== SieveState.NOT_STARTED}
            />
            <Button
              onClick={onProceedAnimation}
              disabled={isNaN(upperBound) || !upperBound || !(isAnimationNotStarted || isAnimationFinished)}
            >
              {buttonText}
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
