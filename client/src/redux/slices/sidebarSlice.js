import { createSlice } from "@reduxjs/toolkit";

const sidebarStatusSlice = createSlice({
  name: "sidebarStatus",
  initialState: { showSidebar: false },

  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export const { toggleSidebar } = sidebarStatusSlice.actions;
export const sidebarStatusReducer = sidebarStatusSlice.reducer;
