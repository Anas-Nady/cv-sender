import React, { useRef, useEffect } from "react";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { addCompany } from "../redux/actions/companyAction";
import { createCompanyReset } from "../redux/slices/companySlice";
import {
  FORM_TITLE,
  NAME,
  EMAIL,
  CATEGORY,
  BUTTON,
  PAGE_TITLE,
} from "./../constants/ADD_COMPANY";
import { COMPANY_IS_ADDED } from "../constants/TOAST.JS";

const AddCompany = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const currentForm = useRef();

  const { success, error } = useSelector((state) => state.createCompany);

  const submitHandler = async (e) => {
    e.preventDefault();

    const company = {
      name: currentForm.current.name.value,
      email: currentForm.current.email.value,
      category: currentForm.current.category.value,
    };

    const { name, email, category } = company;
    dispatch(addCompany(name, email, category));
  };

  useEffect(() => {
    if (success) {
      toast.success(COMPANY_IS_ADDED);
      currentForm.current.reset();
    } else if (error) {
      toast.error(error);
    }
    dispatch(createCompanyReset());
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
          <FormRow type="text" name="name" labelText={NAME} />
          <FormRow type="email" name="email" labelText={EMAIL} />
          <FormRowSelect name="category" labelText={CATEGORY} />

          <button type="submit" className={`btn btn-block form-btn`}>
            {BUTTON}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddCompany;
