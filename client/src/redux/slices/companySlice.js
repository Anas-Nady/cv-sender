import { createSlice } from "@reduxjs/toolkit";

const listCompaniesSlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    totalCompanies: 0,
    pages: 0,
    page: 1,
    loading: false,
    error: null,
  },
  reducers: {
    listCompaniesRequest: (state) => {
      state.loading = true;
    },
    listCompaniesSuccess: (state, action) => {
      state.loading = false;
      state.companies = action.payload.companies;
      state.totalCompanies = action.payload.totalCompanies;
      state.pages = action.payload.pages;
      state.page = action.payload.page;
    },
    listCompaniesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { listCompaniesRequest, listCompaniesSuccess, listCompaniesFail } =
  listCompaniesSlice.actions;
export const listCompaniesReducer = listCompaniesSlice.reducer;

const getCompanySlice = createSlice({
  name: "getCompany",
  initialState: { company: null, loading: false, error: null },
  reducers: {
    getCompanyRequest: (state) => {
      state.loading = true;
    },
    getCompanySuccess: (state, action) => {
      state.loading = false;
      state.company = action.payload;
    },
    getCompanyFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCompanyReset: (state) => {
      state.company = null;
      state.error = null;
    },
  },
});

export const {
  getCompanyRequest,
  getCompanySuccess,
  getCompanyFail,
  getCompanyReset,
} = getCompanySlice.actions;
export const getCompanyReducer = getCompanySlice.reducer;

const createCompanySlice = createSlice({
  name: "createCompany",
  initialState: { company: {} },
  reducers: {
    createCompanyRequest: (state) => {
      state.loading = true;
      state.success = false;
    },
    createCompanySuccess: (state, action) => {
      state.loading = false;
      state.company = action.payload;
      state.success = true;
    },
    createCompanyFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    createCompanyReset: (state) => {
      state.success = false;
      state.error = null;
      state.company = {};
    },
  },
});

export const {
  createCompanyRequest,
  createCompanySuccess,
  createCompanyFail,
  createCompanyReset,
} = createCompanySlice.actions;
export const createCompanyReducer = createCompanySlice.reducer;

const updateCompanySlice = createSlice({
  name: "updateCompany",
  initialState: { company: {} },
  reducers: {
    updateCompanyRequest: (state) => {
      state.loading = true;
    },
    updateCompanySuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    updateCompanyFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCompanyReset: (state) => {
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  updateCompanyRequest,
  updateCompanySuccess,
  updateCompanyFail,
  updateCompanyReset,
} = updateCompanySlice.actions;
export const updateCompanyReducer = updateCompanySlice.reducer;

const deleteCompanySlice = createSlice({
  name: "deleteCompany",
  initialState: {},
  reducers: {
    deleteCompanyRequest: (state) => {
      state.loading = true;
    },
    deleteCompanySuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    deleteCompanyFail: (state, action) => {
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
  deleteCompanyRequest,
  deleteCompanySuccess,
  deleteCompanyFail,
  deleteReset,
} = deleteCompanySlice.actions;
export const deleteCompanyReducer = deleteCompanySlice.reducer;
