import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { MathHelper } from "./math-helper/MathHelper";

type AppStore = {
  sieveUpperBound?: number;
  mathHelper?: MathHelper;
};

type AppActions = {
  initialize: (sieveUpperBound: number) => void;
  reset: () => void;
};

function getSieveUpperBound() {
  return Number(localStorage.getItem("sieveUpperBound"));
}

function setSieveUpperBound(sieveUpperBound: number) {
  localStorage.setItem("sieveUpperBound", sieveUpperBound.toString());
}

function initMathHelper() {
  const sieveUB = getSieveUpperBound();
  return sieveUB !== undefined ? new MathHelper(sieveUB) : undefined;
}

export const useAppStore = create(
  immer<AppStore & AppActions>((set) => ({
    sieveUpperBound: getSieveUpperBound(),
    mathHelper: initMathHelper(),
    initialize: (sieveUpperBound) =>
      set((state) => {
        state.mathHelper = new MathHelper(sieveUpperBound);
        setSieveUpperBound(sieveUpperBound);
      }),
    reset: () => set({ mathHelper: undefined, sieveUpperBound: undefined }),
  }))
);
