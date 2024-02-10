import { createSlice } from "@reduxjs/toolkit";

const listInvoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
  },
  reducers: {
    listInvoicesRequest: (state) => {
      state.loading = true;
    },
    listInvoicesSuccess: (state, action) => {
      state.loading = false;
      state.invoices = action.payload.invoices;
      state.totalInvoices = action.payload.totalInvoices;
      state.pages = action.payload.pages;
      state.page = action.payload.page;
    },
    listInvoicesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { listInvoicesRequest, listInvoicesSuccess, listInvoicesFail } =
  listInvoicesSlice.actions;
export const listInvoicesReducer = listInvoicesSlice.reducer;

const getInvoiceSlice = createSlice({
  name: "getInvoice",
  initialState: { invoice: {}, totalCompanies: 0 },
  reducers: {
    getInvoiceRequest: (state) => {
      state.loading = true;
    },
    getInvoiceSuccess: (state, action) => {
      state.loading = false;
      state.invoice = action.payload.invoice;
      state.totalCompanies = action.payload.totalCompanies;
    },
    getInvoiceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getInvoiceReset: (state) => {
      state.invoice = null;
      state.totalCompanies = 0;
      state.error = null;
    },
  },
});

export const {
  getInvoiceRequest,
  getInvoiceSuccess,
  getInvoiceFail,
  getInvoiceReset,
} = getInvoiceSlice.actions;
export const getInvoiceReducer = getInvoiceSlice.reducer;

const createInvoiceSlice = createSlice({
  name: "createInvoice",
  initialState: { invoice: {} },
  reducers: {
    createInvoiceRequest: (state) => {
      state.success = false;
    },
    createInvoiceSuccess: (state) => {
      state.success = true;
      state.error = null;
    },
    createInvoiceFail: (state, action) => {
      state.error = action.payload;
      state.success = false;
    },
    createInvoiceReset: (state) => {
      state.success = false;
      state.error = null;
      state.invoice = {};
    },
  },
});

export const {
  createInvoiceRequest,
  createInvoiceSuccess,
  createInvoiceFail,
  createInvoiceReset,
} = createInvoiceSlice.actions;
export const createInvoiceReducer = createInvoiceSlice.reducer;

const deleteInvoiceSlice = createSlice({
  name: "deleteInvoice",
  initialState: {},
  reducers: {
    deleteInvoiceRequest: (state) => {
      state.loading = true;
    },
    deleteInvoiceSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    deleteInvoiceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteReset: (state) => {
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  deleteInvoiceRequest,
  deleteInvoiceSuccess,
  deleteInvoiceFail,
  deleteReset,
} = deleteInvoiceSlice.actions;
export const deleteInvoiceReducer = deleteInvoiceSlice.reducer;
