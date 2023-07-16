import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useAppStore } from "./AppStore";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { MAX_PRIME_UPPER_BOUND } from "./math-helper/types";

const inputSchema = z.object({
  number: z
    .number()
    .int("Must be an integer")
    .min(0, "Must be non-negative")
    .max(MAX_PRIME_UPPER_BOUND, `Must not exceed ${MAX_PRIME_UPPER_BOUND}`),
});

type Input = z.infer<typeof inputSchema>;

export function StartUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Input>({ resolver: zodResolver(inputSchema), mode: "all" });

  const { initialize } = useAppStore();

  const onSubmit: SubmitHandler<Input> = (data) => {
    setTimeout(() => initialize(data.number), 1000);
  };

  return (
    <form
      className="grid h-screen grid-cols-5 md:grid-cols-3 place-items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="col-span-3 col-start-2 md:col-span-1 md:col-start-2">
        <CardHeader className="font-bold text-center">Up to which number do you want me to sieve?</CardHeader>
        <CardContent>
          <Input
            className={clsx(errors.number && "focus-visible:ring-rose-400")}
            placeholder="Enter a number within [1, 10^7]"
            type="number"
            {...register("number", { valueAsNumber: true })}
          />
          <span className="inline-block mt-2 text-sm text-rose-500">{errors.number?.message}</span>
        </CardContent>
        <CardFooter className="justify-center">
          <Button
            variant={!isSubmitSuccessful ? "default" : "outline"}
            type="submit"
            disabled={errors.number !== undefined || isSubmitSuccessful}
          >
            {!isSubmitSuccessful ? "OK, let me in" : "Alright, letting you in..."}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
