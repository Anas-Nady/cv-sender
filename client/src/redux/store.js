import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {
  listCompaniesReducer,
  getCompanyReducer,
  updateCompanyReducer,
  deleteCompanyReducer,
  createCompanyReducer,
} from "./slices/companySlice";
import { sidebarStatusReducer } from "./slices/sidebarSlice";
import sendCvReducer from "./slices/sendCvSlice";

import {
  listInvoicesReducer,
  getInvoiceReducer,
  createInvoiceReducer,
  deleteInvoiceReducer,
} from "./slices/invoiceSlice";

const rootReducer = {
  listCompanies: listCompaniesReducer,
  getCompany: getCompanyReducer,
  createCompany: createCompanyReducer,
  updateCompany: updateCompanyReducer,
  deleteCompany: deleteCompanyReducer,
  sidebarStatus: sidebarStatusReducer,
  sendCv: sendCvReducer,

  listInvoices: listInvoicesReducer,
  getInvoice: getInvoiceReducer,
  createInvoice: createInvoiceReducer,
  deleteInvoice: deleteInvoiceReducer,
};
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});

export default store;
