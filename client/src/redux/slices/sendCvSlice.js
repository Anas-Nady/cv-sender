import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  success: false,
  error: null,
  loading: false,
};

const sendCvSlice = createSlice({
  name: "sendCv",
  initialState,
  reducers: {
    sendCvRequest: (state) => {
      state.loading = true;
    },
    sendCvSuccess: (state, action) => {
      state.data = action.payload;
      state.success = true;
      state.error = null;
      state.loading = false;
    },
    sendCvFail: (state, action) => {
      state.data = null;
      state.error = action.payload;
      state.loading = false;
    },
    sendCvReset: (state) => {
      state.data = null;
      state.error = null;
      state.success = false;
      state.loading = false;
    },
  },
});

export const { sendCvRequest, sendCvSuccess, sendCvFail, sendCvReset } =
  sendCvSlice.actions;
export default sendCvSlice.reducer;
