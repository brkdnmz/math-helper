import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MAX_VALUE } from "@/math-helper/types";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { FaDice } from "react-icons/fa";
import { Properties } from "./number-properties/Properties";

const genRandomNumber = () => Math.floor(Math.random() * MAX_VALUE).toString();

export function KnowYourInteger() {
  const [number, setNumber] = useState<string>(genRandomNumber());

  const onChooseRandomNumber = () => {
    setNumber(genRandomNumber());
  };

  return (
    <>
      <Card className="w-full p-3">
        <CardTitle className="text-center">Know Your Integer</CardTitle>
        <CardDescription className="text-center">Don't be shy!</CardDescription>
        <CardHeader className="text-center">
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
    </>
  );
}
