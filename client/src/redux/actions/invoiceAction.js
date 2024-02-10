import axios from "axios";
import {
  listInvoicesRequest,
  listInvoicesSuccess,
  listInvoicesFail,
  getInvoiceRequest,
  getInvoiceSuccess,
  getInvoiceFail,
  createInvoiceRequest,
  createInvoiceSuccess,
  createInvoiceFail,
  deleteInvoiceRequest,
  deleteInvoiceSuccess,
  deleteInvoiceFail,
} from "./../slices/invoiceSlice";

export const listInvoices =
  (customerEmail = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch(listInvoicesRequest());

      const { data } = await axios.get(
        `/api/invoices?customerEmail=${customerEmail}&pageNumber=${pageNumber}`
      );

      dispatch(listInvoicesSuccess(data));
    } catch (error) {
      dispatch(
        listInvoicesFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const getInvoiceDetails = (id) => async (dispatch) => {
  try {
    dispatch(getInvoiceRequest());

    const { data } = await axios.get(`/api/invoices/${id}`);

    dispatch(getInvoiceSuccess(data));
  } catch (error) {
    dispatch(
      getInvoiceFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const addInvoice =
  (invoiceNumber,customerName, customerEmail, packageType) => async (dispatch) => {
    try {
      dispatch(createInvoiceRequest());

      const { data } = await axios.post("/api/invoices", {
        invoiceNumber,
        customerName,
        customerEmail,
        packageType,
      });

      dispatch(createInvoiceSuccess(data));
    } catch (error) {
      dispatch(
        createInvoiceFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const deleteInvoice = (id) => async (dispatch) => {
  try {
    dispatch(deleteInvoiceRequest());

    await axios.delete(`/api/invoices/${id}`);

    dispatch(deleteInvoiceSuccess());
  } catch (error) {
    dispatch(
      deleteInvoiceFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
