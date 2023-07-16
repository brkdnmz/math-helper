import { z } from "zod";

export const MAX_PRIME_UPPER_BOUND = 1e7;
export const MAX_VALUE = 1e12;

export const integerSchema = z
  .number()
  .min(1, "The number must be positive")
  .max(MAX_VALUE, `The number must not exceed ${MAX_VALUE}`)
  .int("The number must be an integer");

export type PrimePower = {
  prime: number;
  exponent: number;
};

export type Factorization = PrimePower[];
