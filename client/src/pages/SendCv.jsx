import { sendCvReset } from "../redux/slices/sendCvSlice";
import React, { useRef, useEffect, useState } from "react";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useNavigate } from "react-router-dom";
import { sendCvToCompanies } from "../redux/actions/sendCvAction";
import trueImage from "./../assets/imgs/true.png";
import {
  FORM_TITLE,
  PAGE_TITLE,
  NAME,
  PHONE,
  EMAIL,
  TITLE,
  YEARS_OF_EXPERIENCE,
  SPECIFIC,
  CATEGORY,
  PDF,
  CONTENT,
  BUTTON,
} from "../constants/SEND_CV";
import FormSelect from "../components/FormSelect";
import { CV_IS_SENDED, CV_IS_SENDED_COMPLETED } from "../constants/TOAST.JS";
import { Helmet } from "react-helmet";

const SendCV = () => {
  const currentForm = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigateTo = useNavigate();
  const { loading, success, error } = useSelector((state) => state.sendCv);

  let [stepsFromCategory, setStepsFromCategory] = useState(0);
  let [isPdfUploaded, setIsPdfUploaded] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(currentForm.current);

    sessionStorage.setItem(
      "step",
      JSON.stringify(+currentForm.current.step.value + 1)
    );
    await dispatch(sendCvToCompanies(formData));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setIsPdfUploaded(true);
      };

      reader.readAsDataURL(file);
    } else {
      setIsPdfUploaded(false);
    }
  };

  const handleNumberOfStepForSendCv = (e) => {
    e.preventDefault();

    const currentCategory = e.target.value;
    let steps = 0;
    if (currentCategory == "test") {
      steps = 1;
    } else if (currentCategory == "education") {
      steps = 3;
    } else if (currentCategory == "saudi") {
      steps = 6;
    } else if (currentCategory == "khalij") {
      steps = 6;
    }
    setStepsFromCategory(steps);
    sessionStorage.setItem("maxStep", JSON.stringify(steps));
  };

  useEffect(() => {
    if (success) {
      dispatch(sendCvReset());
      const currentStepFromLocalStorage = JSON.parse(
        sessionStorage.getItem("step")
      );
      const maxStepsFromLocalStorage = JSON.parse(
        sessionStorage.getItem("maxStep")
      );
      if (currentStepFromLocalStorage < maxStepsFromLocalStorage) {
        toast.success(CV_IS_SENDED, { autoClose: false });
      } else if (currentStepFromLocalStorage == maxStepsFromLocalStorage) {
        toast.success(CV_IS_SENDED_COMPLETED, { autoClose: false });
        currentForm.current.reset();
        sessionStorage.removeItem("step");
        sessionStorage.removeItem("maxStep");
        setIsPdfUploaded(false);
      }
    } else if (error) {
      toast.error(error);
      dispatch(sendCvReset());
    }
  }, [success, error, navigateTo, stepsFromCategory]);

  return (
    <Wrapper>
      <Helmet>
        <title>{PAGE_TITLE}</title>
      </Helmet>
      <Form
        method="post"
        className="form"
        encType="multipart/form-data"
        onSubmit={submitHandler}
        ref={currentForm}
      >
        <h4 className="form-title">{FORM_TITLE}</h4>
        <div className="form-center">
          <FormRow type="text" name="name" labelText={NAME} />
          <FormRow type="number" name="phone" labelText={PHONE} />
          <FormRow type="email" name="email" labelText={EMAIL} />
          <FormRow
            type="number"
            name="yearsOfExperience"
            labelText={YEARS_OF_EXPERIENCE}
          />
          <FormRow type="text" name="title" labelText={TITLE} />
          <FormRow type="text" name="specific" labelText={SPECIFIC} />
          <FormRowSelect
            labelText={CATEGORY}
            onChange={handleNumberOfStepForSendCv}
            name="category"
          />
          <FormSelect name="step" numberOfSteps={stepsFromCategory} />
          <div className="form-row">
            <label htmlFor="pdf" className="form-label">
              {PDF}
            </label>
            <input
              type="file"
              id="pdf"
              name="pdf"
              className="form-input"
              accept="application/pdf"
              onChange={handleFileUpload}
              required
            />
            {isPdfUploaded ? (
              <img
                src={trueImage}
                width={"20px"}
                alt="success"
                className="my-1 absolute"
              />
            ) : (
              ""
            )}
          </div>

          <div className="form-row">
            <label htmlFor="content" className="form-label">
              {CONTENT}
            </label>
            <textarea
              id="content"
              name="content"
              className="form-input textarea-content default-message"
            />
          </div>
          <button
            type="submit"
            className={`btn btn-block form-btn`}
            disabled={loading}
          >
            {BUTTON}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SendCV;
