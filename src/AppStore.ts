import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { MathHelper } from "./math-helper/MathHelper";

type AppStore = {
  mathHelper?: MathHelper;
};

type AppActions = {
  initialize: (upperBound: number) => void;
};

export const useAppStore = create(
  immer<AppStore & AppActions>((set) => ({
    mathHelper: undefined,
    initialize: (upperBound) =>
      set((state) => {
        state.mathHelper = new MathHelper(upperBound);
      }),
  }))
);
