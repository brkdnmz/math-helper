import { create } from "zustand";
import { SieveState } from "./types";

type SieveStore = {
  upperBound: string;
  state: SieveState;
};

type SieveActions = {
  setUpperBound: (upperBound: string) => void;
  start: () => void;
  reset: () => void;
  setState: (newState: SieveState) => void;
};

export const useSieveStore = create<SieveStore & SieveActions>((set) => ({
  upperBound: "",
  state: SieveState.NOT_STARTED,
  setUpperBound: (upperBound) => set({ upperBound }),
  start: () => set({ state: SieveState.NEW_NUM_STARTED }),
  reset: () => set({ state: SieveState.NOT_STARTED }),
  setState: (newState) => set({ state: newState }),
}));
