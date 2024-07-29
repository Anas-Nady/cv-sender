import React, { useRef } from "react";
import { FormRow, FormRowSelect } from "../components";
import { Form, useSubmit, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import {
  FORM_TITLE,
  SEARCH,
  CATEGORY,
  RESET_SEARCH,
} from "./../constants/SEARCH_CONTAINER";

const SearchContainer = () => {
  const currentForm = useRef();

  const submit = useSubmit();
  return (
    <Wrapper className="border border-gray-200">
      <Form className="form" ref={currentForm}>
        <h5 className="form-title">{FORM_TITLE}</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            labelText={SEARCH}
            defaultValue={""}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            labelText={CATEGORY}
            name="category"
            list={["All"]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="/all-companies" className="btn form-btn">
            {RESET_SEARCH}
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
