import React, { useRef, useEffect } from "react";
import Wrapper from "./../assets/wrappers/DashboardFormPage";
import { Form, useNavigate } from "react-router-dom";
import { FormRow, FormRowSelect } from "./../components";
import { addInvoice } from "./../redux/actions/invoiceAction";
import { createInvoiceReset } from "./../redux/slices/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import {
  FORM_TITLE,
  INVOICE,
  NAME,
  EMAIL,
  CATEGORY,
  BUTTON,
  PAGE_TITLE,
} from "./../constants/ADD_INVOICE";
import { INVOICE_IS_ADDED } from "../constants/TOAST.JS";

const AddInvoice = () => {
  const currentForm = useRef();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.createInvoice);

  const submitHandler = async (e) => {
    e.preventDefault();

    const invoiceNumber = currentForm.current.invoiceNumber.value;
    const customerName = currentForm.current.customerName.value;
    const customerEmail = currentForm.current.customerEmail.value;
    const packageType = currentForm.current.packageType.value;

    dispatch(
      addInvoice(invoiceNumber, customerName, customerEmail, packageType)
    );
  };

  useEffect(() => {
    if (success) {
      toast.success(INVOICE_IS_ADDED);
      dispatch(createInvoiceReset());
      currentForm.current.reset();
    } else if (error) {
      toast.error(error);
      dispatch(createInvoiceReset());
    }
  }, [success, error, navigateTo]);

  return (
    <Wrapper className="border border-gray-200">
      <Helmet>
        <title>{PAGE_TITLE}</title>
      </Helmet>
      <Form
        method="post"
        className="form"
        ref={currentForm}
        onSubmit={submitHandler}
      >
        <h4 className="form-title">{FORM_TITLE}</h4>
        <div className="form-center">
          <FormRow type="number" name="invoiceNumber" labelText={INVOICE} />
          <FormRow type="text" name="customerName" labelText={NAME} />
          <FormRow type="email" name="customerEmail" labelText={EMAIL} />
          <FormRowSelect name="packageType" labelText={CATEGORY} />

          <button type="submit" className={`btn btn-block form-btn`}>
            {BUTTON}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddInvoice;
