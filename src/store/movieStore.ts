import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface MovieStore {
  currentPage: number;
  term: string;
  setCurrentPages: (page: number) => void;
  setTerm: (text: string) => void;
}

export const useMovieStore = create<MovieStore>()(
  immer((set) => ({
    currentPage: 1,
    term: "",
    setCurrentPages: (page: number) =>
      set((state) => {
        state.currentPage = page;
      }),
    setTerm: (text: string) =>
      set((state) => {
        state.term = text;
        state.currentPage = 1;
      }),
  })),
);
