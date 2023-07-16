import { Label } from "@radix-ui/react-label";
import "katex/dist/katex.min.css";
import { useEffect, useState } from "react";
import { FaDice } from "react-icons/fa";
import { InlineMath } from "react-katex";
import { useAppStore } from "./AppStore";
import { StartUp } from "./StartUp";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { MAX_VALUE } from "./math-helper/types";
import { Properties } from "./number-properties/Properties";

const genRandomNumber = () => Math.floor(Math.random() * MAX_VALUE).toString();

function App() {
  const mathHelper = useAppStore((state) => state.mathHelper);
  const reset = useAppStore((state) => state.reset);
  const [number, setNumber] = useState<string>(genRandomNumber());

  const onChooseRandomNumber = () => {
    setNumber(genRandomNumber());
  };

  useEffect(() => {
    if (!mathHelper) onChooseRandomNumber();
  }, [mathHelper]);

  return !mathHelper ? (
    <StartUp />
  ) : (
    <div className="grid h-screen grid-cols-8 md:grid-cols-6 lg:grid-cols-3">
      <div className="relative flex flex-col flex-wrap items-center justify-start col-span-6 col-start-2 gap-3 md:col-span-4 lg:col-start-2 md:col-start-2 lg:col-span-1">
        <button
          className="absolute text-xl italic top-5 text-slate-600"
          onClick={reset}
          title="Click to reset"
        >
          Sieved up to <InlineMath>{`${mathHelper.PRIME_UPPER_BOUND}`}</InlineMath>
        </button>
        <Card className="w-full p-3 mt-20">
          <CardTitle className="text-center">Math Helper</CardTitle>
          <CardHeader>
            <Label htmlFor="number">Enter a number to see its properties!</Label>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 max-lg:flex-wrap">
              <Input
                type="number"
                id="number"
                value={number}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  if (e.target.value && !(1 <= newValue && newValue <= MAX_VALUE)) {
                    return;
                  }
                  setNumber(e.target.value);
                }}
              />
              <Button
                variant={"link"}
                title="Random number"
                onClick={onChooseRandomNumber}
                className="px-2 text-center transition max-lg:w-full text-slate-400 hover:text-slate-700"
              >
                <FaDice size={30} />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Properties number={Number(number)} />
      </div>
    </div>
  );
}

export default App;
