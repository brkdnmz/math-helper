import "katex/dist/katex.min.css";
import { useState } from "react";
import { InlineMath } from "react-katex";
import { useAppStore } from "./AppStore";
import { StartUp } from "./StartUp";
import { Button } from "./components/ui/button";
import { KnowYourInteger } from "./know-your-integer";
import { Siever } from "./siever/Siever";

enum Mode {
  KnowYourInteger = "Know Your Integer",
  Siever = "Siever",
}

const otherMode = (mode: Mode) => (mode === Mode.KnowYourInteger ? Mode.Siever : Mode.KnowYourInteger);

function App() {
  const [mode, setMode] = useState(Mode.KnowYourInteger);
  const reset = useAppStore((state) => state.reset);
  const mathHelper = useAppStore((state) => state.mathHelper);

  const onChangeMode = () => {
    setMode(otherMode(mode));
  };

  return (
    <>
      {mathHelper && (
        <div className="grid h-screen grid-cols-8 md:grid-cols-6 lg:grid-cols-3">
          <div className="relative flex flex-col flex-wrap items-center justify-start col-span-6 col-start-2 gap-3 md:col-span-4 lg:col-start-2 md:col-start-2 lg:col-span-1">
            <button
              className="my-3 text-xl italic text-slate-600"
              onClick={reset}
              title="Click to reset"
            >
              Sieved up to <InlineMath>{`${mathHelper?.PRIME_UPPER_BOUND ?? "-"}`}</InlineMath>
            </button>
            <Button
              onClick={onChangeMode}
              className="mb-3"
            >
              {otherMode(mode)}
            </Button>
            {mode === Mode.KnowYourInteger ? <KnowYourInteger /> : <Siever />}
          </div>
        </div>
      )}
      {!mathHelper && <StartUp />}
    </>
  );
}

export default App;
