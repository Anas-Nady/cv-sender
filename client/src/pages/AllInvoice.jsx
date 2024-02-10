import Wrapper from "../assets/wrappers/DashboardFormPage";
import React, { useEffect, useRef } from "react";
import { FormRow } from "../components";
import {
  Form,
  useSubmit,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import InvoicesWrapper from "../assets/wrappers/CompaniesContainer";
import { useSelector, useDispatch } from "react-redux";
import { listInvoices } from "../redux/actions/invoiceAction";
import { PageBtnContainer, Invoice } from "../components";
import { Helmet } from "react-helmet";
import {
  FORM_TITLE,
  RESET_SEARCH,
  SEARCH,
  LOADING,
  NUMBER_OF_INVOICES,
  PAGE_TITLE,
} from "./../constants/ALL_INVOICES";
import { deleteReset } from "../redux/slices/invoiceSlice";

const AllInvoice = () => {
  const currentForm = useRef();
  const submit = useSubmit();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigateTo = useNavigate();

  const { loading, invoices, totalInvoices, pages, page, error } = useSelector(
    (state) => state.listInvoices
  );
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useSelector((state) => state.deleteInvoice);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const search = searchParams.get("search") || "";
    let pageNumber = searchParams.get("pageNumber") || 1;

    dispatch(listInvoices(search, pageNumber));
    dispatch(deleteReset());
  }, [deleteSuccess, currentForm, location, pages, page, navigateTo]);

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
      </Helmet>
      <Wrapper className="border border-gray-200">
        <Form className="form" ref={currentForm}>
          <h4 className="form-title">{FORM_TITLE}</h4>
          <div className="form-center">
            <FormRow
              type="search"
              name="search"
              defaultValue={""}
              labelText={SEARCH}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
            <Link to="/all-invoices" className="btn form-btn">
              {RESET_SEARCH}
            </Link>
          </div>
        </Form>
      </Wrapper>
      {loading ? (
        <h3 dir="rtl" className="my-10 text-center">
          {LOADING}
        </h3>
      ) : (
        <InvoicesWrapper>
          <h5 dir="rtl">
            {NUMBER_OF_INVOICES}: {totalInvoices}
          </h5>
          <div className="jobs">
            {invoices &&
              invoices.map((invoice) => (
                <Invoice
                  key={invoice._id}
                  _id={invoice._id}
                  invoiceNumber={invoice.invoiceNumber}
                  customerName={invoice.customerName}
                  customerEmail={invoice.customerEmail}
                  packageType={invoice.packageType}
                  createdAt={invoice.createdAt}
                />
              ))}
          </div>
          {pages > 1 && <PageBtnContainer pages={pages} page={page} />}
        </InvoicesWrapper>
      )}
    </>
  );
};

export default AllInvoice;
