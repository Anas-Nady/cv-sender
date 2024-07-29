import React, { useEffect, useRef } from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigation, useNavigate, useParams } from "react-router-dom";
import { FormRow, FormRowSelect } from "./../components";
import {
  updateCompany,
  getCompanyDetails,
} from "../redux/actions/companyAction";
import {
  FORM_TITLE,
  NAME,
  EMAIL,
  CATEGORY,
  BUTTON,
} from "./../constants/EDIT_COMPANY";
import { COMPANY_IS_UPDATED } from "../constants/TOAST.JS";

const EditCompany = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigateTo = useNavigate();
  const params = useParams();
  const currentForm = useRef();
  const { id: companyId } = params;
  const isSubmitting = navigation.state === "updating";

  const { company: getCompany, error: getCompanyError } = useSelector(
    (state) => state.getCompany
  );

  const { success: successUpdate, error: updateCompanyError } = useSelector(
    (state) => state.updateCompany
  );

  useEffect(() => {
    // Check if the company details have already been fetched
    dispatch(getCompanyDetails(companyId));

    if (successUpdate) {
      toast.success(COMPANY_IS_UPDATED);
      navigateTo("/all-companies");
    } else if (updateCompanyError) {
      toast.error(updateCompanyError);
    }
  }, [successUpdate, updateCompanyError, companyId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    await dispatch(
      updateCompany({
        _id: companyId,
        name: currentForm.current.name.value,
        email: currentForm.current.email.value,
        category: currentForm.current.category.value,
      })
    );
  };

  return (
    <Wrapper>
      <Form
        method="post"
        className="form"
        ref={currentForm}
        onSubmit={submitHandler}
      >
        <h4 className="form-title">{FORM_TITLE}</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            labelText={NAME}
            defaultValue={getCompany?.data?.name || ""}
          />
          <FormRow
            type="text"
            name="email"
            labelText={EMAIL}
            defaultValue={getCompany?.data?.email || ""}
          />
          <FormRowSelect
            name="category"
            labelText={CATEGORY}
            defaultValue={getCompany?.data?.category || ""}
          />
          <button
            type="submit"
            className={`btn btn-block form-btn`}
            disabled={isSubmitting}
          >
            {BUTTON}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditCompany;
