import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { SieveState } from "./types";

type SieveAnimationProps = {
  state: SieveState;
  curNum: number;
  curMultiple: number;
  highlightedNum: number;
  stepMessage: string;
};

const initialAnimationProps: SieveAnimationProps = {
  state: SieveState.NOT_STARTED,
  curNum: -1,
  curMultiple: -1,
  highlightedNum: -1,
  stepMessage: "",
};

type SieveStore = {
  upperBound: number;
  isPrime: boolean[];
  animation: SieveAnimationProps;
};

type SieveActions = {
  setUpperBound: (upperBound: number) => void;
  startAnimation: () => void;
  proceedAnimation: () => void;
  resetAnimation: () => void;
  resetAll: () => void;
};

const initialState: SieveStore = {
  upperBound: 0,
  isPrime: [],
  animation: initialAnimationProps,
};

export const useSieveStore = create(
  immer<SieveStore & SieveActions>((set, get) => ({
    upperBound: 0,
    isPrime: [],
    animation: initialAnimationProps,
    setUpperBound: (upperBound) =>
      set((state) => {
        state.upperBound = upperBound;
        if (!isNaN(state.upperBound)) {
          state.isPrime = Array<boolean>(state.upperBound + 1).fill(true);
          state.isPrime[0] = state.isPrime[1] = false;
        }
      }),
    startAnimation: () =>
      set((state) => {
        state.animation.state = SieveState.STARTED;
      }),
    proceedAnimation: () =>
      set((state) => {
        const props = state.animation;
        let nextState = props.state;
        switch (props.state) {
          case SieveState.STARTED:
            nextState = SieveState.NEW_NUM_STARTED;
            props.curNum = 2;
            props.highlightedNum = 2;
            props.stepMessage = "Starting with 2, the smallest prime!";
            break;
          case SieveState.NEW_NUM_STARTED: {
            const firstMultiple = props.curNum ** 2;
            props.curMultiple = firstMultiple;
            if (firstMultiple <= state.upperBound) {
              nextState = SieveState.NEW_MULTIPLE;
              props.stepMessage = `First multiple is ${firstMultiple} (smaller multiples already marked)`;
              props.highlightedNum = props.curMultiple;
            } else {
              nextState = SieveState.COMPLETED;
              props.stepMessage = `${firstMultiple} > ${state.upperBound}, which means we are done...`;
            }
            break;
          }
          case SieveState.CUR_NUM_FINISHED: {
            const nextNum = props.curNum + 1;
            props.curNum = nextNum;
            props.curMultiple = nextNum;
            props.highlightedNum = props.curNum;
            if (!state.isPrime[nextNum]) {
              if (nextNum ** 2 > state.upperBound) {
                nextState = SieveState.COMPLETED;
                props.stepMessage = `${nextNum ** 2} > ${state.upperBound}, which means we are done...`;
              } else {
                props.stepMessage = `${nextNum} isn't prime, passing...`;
              }
            } else {
              nextState = SieveState.NEW_NUM_STARTED;
              props.stepMessage = `${nextNum} is prime! Should go over its multiples.`;
            }
            break;
          }
          case SieveState.NEW_MULTIPLE: {
            state.isPrime[props.curMultiple] = false;
            props.stepMessage = `Marking ${props.curMultiple} as composite.`;
            if (props.curMultiple > state.upperBound) {
              nextState = SieveState.CUR_NUM_FINISHED;
              props.stepMessage = `${props.curNum} finished!`;
            } else {
              props.highlightedNum = props.curMultiple;
              props.curMultiple += props.curNum;
            }
            break;
          }
          case SieveState.COMPLETED:
            nextState = SieveState.AFTER_COMPLETED;
            props.stepMessage = `Done! This is the final list of primes:\n[${state.isPrime
              .map((_, i) => i)
              .filter((i) => state.isPrime[i])
              .join(", ")}]`;
            break;
          case SieveState.AFTER_COMPLETED:
            get().resetAnimation();
            break;
          default:
            break;
        }
        props.state = nextState;
      }),
    resetAnimation: () => set({ animation: initialAnimationProps }),
    resetAll: () => set(initialState),
  }))
);
