import { Label } from "@radix-ui/react-label";
import "katex/dist/katex.min.css";
import { useState } from "react";
import { useAppStore } from "./AppStore";
import { StartUp } from "./StartUp";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { MAX_VALUE } from "./math-helper/types";
import { Properties } from "./number-properties/Properties";

function App() {
  const mathHelper = useAppStore((state) => state.mathHelper);
  const [number, setNumber] = useState<string>("123");

  return !mathHelper ? (
    <StartUp />
  ) : (
    <div className="grid h-screen grid-cols-3">
      <div className="flex flex-col flex-wrap items-center justify-start col-start-2 gap-3">
        <Card className="w-full p-3 mt-20">
          <CardTitle className="text-center">Math Helper</CardTitle>
          <CardHeader>
            <Label htmlFor="number">Enter a number to see its properties!</Label>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        <Properties number={Number(number)} />
      </div>
    </div>
  );
}

export default App;
