import { create } from "zustand";

interface DashboardState {
  searchQuery: string;
  page: number;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  searchQuery: "",
  page: 1,
  setSearchQuery: (query) => set({ searchQuery: query, page: 1 }), // Reset to page 1 on new search
  setPage: (page) => set({ page }),
}));
