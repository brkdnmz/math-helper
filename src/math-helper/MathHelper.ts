import { Factorization, MAX_PRIME_UPPER_BOUND, MAX_VALUE, integerSchema } from "./types";

export class MathHelper {
  PRIME_UPPER_BOUND: number;
  primes: number[];
  private nPrimesUntil: number[];
  smallestPrimeFactor: number[];

  constructor(PRIME_UPPER_BOUND: number) {
    if (PRIME_UPPER_BOUND > MAX_PRIME_UPPER_BOUND) {
      throw new Error(`The upper bound for the primes must not exceed ${MAX_PRIME_UPPER_BOUND}`);
    }
    this.PRIME_UPPER_BOUND = PRIME_UPPER_BOUND;
    this.nPrimesUntil = new Array<number>(this.PRIME_UPPER_BOUND + 1).fill(1);
    this.smallestPrimeFactor = new Array<number>(this.PRIME_UPPER_BOUND + 1).fill(0);
    this.primes = [];
    this.initSieve();
  }

  private initSieve() {
    this.nPrimesUntil[0] = this.nPrimesUntil[1] = 0;
    for (let i = 2; i <= this.PRIME_UPPER_BOUND; i++) {
      this.nPrimesUntil[i] += this.nPrimesUntil[i - 1];
      if (this.nPrimesUntil[i] == this.nPrimesUntil[i - 1]) continue;
      this.primes.push(i);
      if (!this.smallestPrimeFactor[i]) this.smallestPrimeFactor[i] = i;
      for (let k = i; k <= Math.floor(this.PRIME_UPPER_BOUND / i); k++) {
        const multiple = i * k;
        this.nPrimesUntil[multiple] = 0;
        if (!this.smallestPrimeFactor[multiple]) this.smallestPrimeFactor[multiple] = i;
      }
    }
  }

  factorize(x: number): Factorization {
    if (!integerSchema.safeParse(x).success) return [];
    if (x <= this.PRIME_UPPER_BOUND) return this.factorizeSmall(x);
    else if (x <= this.PRIME_UPPER_BOUND ** 2) return this.factorizeLarge(x);
    else return this.factorizeHuge(x);
  }

  nDivisorsFactorization(factorization: Factorization) {
    let nDivisors = 1;
    factorization.forEach(({ exponent }) => {
      nDivisors *= exponent + 1;
    });
    return nDivisors;
  }

  nDivisorsNum(x: number) {
    return this.nDivisorsFactorization(this.factorize(x));
  }

  nPrimesUpTo(x: number) {
    if (x > this.PRIME_UPPER_BOUND) return undefined;
    return this.nPrimesUntil[x];
  }

  prevPrime(x: number) {
    let prevPrime = x - 1;
    if (prevPrime < 2) return undefined;
    while (this.nDivisorsNum(prevPrime) != 2) prevPrime--;
    return prevPrime;
  }

  nextPrime(x: number) {
    let nextPrime = x + 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (nextPrime <= MAX_VALUE) {
        if (this.nDivisorsNum(nextPrime) == 2) return nextPrime;
      } else if (this.nDivisorsFactorization(this.factorizeHuge(nextPrime)) == 2) return nextPrime;
      nextPrime++;
    }
  }

  private factorizeSmall(x: number): Factorization {
    const factorization: Factorization = [];
    while (x > 1) {
      const primeDivisor = this.smallestPrimeFactor[x];
      let exponent = 0;
      while (x % primeDivisor == 0) {
        exponent++;
        x /= primeDivisor;
      }
      factorization.push({ prime: primeDivisor, exponent });
    }
    return factorization;
  }

  private factorizeLarge(x: number): Factorization {
    const factorization: Factorization = [];
    for (const prime of this.primes) {
      if (prime ** 2 > x) break;
      if (x % prime) continue;
      let exponent = 0;
      while (x % prime == 0) {
        exponent++;
        x /= prime;
      }
      factorization.push({ prime, exponent });
    }
    if (x > 1) factorization.push({ prime: x, exponent: 1 });
    return factorization;
  }

  private factorizeHuge(x: number): Factorization {
    const factorization: Factorization = [];
    for (let d = 2; d ** 2 <= x; d++) {
      if (x % d) continue;
      let exponent = 0;
      while (x % d == 0) {
        exponent++;
        x /= d;
      }
      factorization.push({ prime: d, exponent });
    }
    if (x > 1) factorization.push({ prime: x, exponent: 1 });
    return factorization;
  }
}
