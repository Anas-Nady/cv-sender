import { sendCvRequest, sendCvReset } from "../redux/slices/sendCvSlice";
import { useRef, useEffect, useState } from "react";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendCvToCompanies } from "../redux/actions/sendCvAction";
import trueImage from "./../assets/imgs/true.png";
import {
  FORM_TITLE,
  PAGE_TITLE,
  JOBTITLE,
  PHONE,
  EMAIL,
  TITLE,
  YEARS_OF_EXPERIENCE,
  SPECIFIC,
  CATEGORY,
  PDF,
  CONTENT,
  BUTTON,
  MESSAGE_CONTENT,
} from "../constants/SEND_CV";
import FormSelect from "../components/FormSelect";
import { CV_IS_SENDED, CV_IS_SENDED_COMPLETED } from "../constants/TOAST.JS";
import { Helmet } from "react-helmet";
import { listCompanies } from "../redux/actions/companyAction";

const SendCV = () => {
  const currentForm = useRef();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { loading, success, error } = useSelector((state) => state.sendCv);

  let [stepsFromCategory, setStepsFromCategory] = useState(0);
  let [isPdfUploaded, setIsPdfUploaded] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    await dispatch(sendCvRequest());

    const formData = new FormData(currentForm.current);

    localStorage.setItem(
      "step",
      JSON.stringify(+currentForm.current.step.value + 1)
    );
    await dispatch(sendCvToCompanies(formData));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setIsPdfUploaded(true);
      };

      reader.readAsDataURL(file);
    } else {
      setIsPdfUploaded(false);
    }
  };
  const { totalCompanies } = useSelector((state) => state.listCompanies);

  const handleNumberOfStepForSendCv = async (e) => {
    e.preventDefault();

    try {
      await dispatch(listCompanies("", 1, e.target.value, 10_000));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeof totalCompanies === "number" && totalCompanies >= 0) {
      let steps = Math.ceil(totalCompanies / 100);
      setStepsFromCategory(steps);
      localStorage.setItem("maxStep", JSON.stringify(steps));
    } else {
      console.error("Invalid totalCompanies value:", totalCompanies);
    }
  }, [totalCompanies]);

  useEffect(() => {
    if (success) {
      dispatch(sendCvReset());
      const currentStepFromLocalStorage = JSON.parse(
        localStorage.getItem("step")
      );
      const maxStepsFromLocalStorage = JSON.parse(
        localStorage.getItem("maxStep")
      );
      if (currentStepFromLocalStorage < maxStepsFromLocalStorage) {
        toast.success(CV_IS_SENDED, { autoClose: false });
      } else if (currentStepFromLocalStorage == maxStepsFromLocalStorage) {
        toast.success(CV_IS_SENDED_COMPLETED, { autoClose: false });
        currentForm.current.reset();
        localStorage.removeItem("step");
        localStorage.removeItem("maxStep");
        setIsPdfUploaded(false);
      }
    } else if (error) {
      toast.error(error);
      dispatch(sendCvReset());
    }
  }, [success, error, navigateTo, totalCompanies]);

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
          <FormRow
            type="text"
            name="jobTitle"
            labelText={JOBTITLE}
            defaultValue="MERN Stack developer"
          />
          <FormRow
            type="number"
            name="phone"
            labelText={PHONE}
            defaultValue="201211076875"
          />
          <FormRow
            type="email"
            name="email"
            labelText={EMAIL}
            defaultValue="AnasAbdallahNady@gmail.com"
          />
          <FormRow
            type="number"
            name="yearsOfExperience"
            labelText={YEARS_OF_EXPERIENCE}
            defaultValue="1"
          />
          <FormRow
            type="text"
            name="qualification"
            labelText={TITLE}
            defaultValue="Bachelor of Computer Science"
          />
          <FormRow
            type="text"
            name="specific"
            labelText={SPECIFIC}
            defaultValue="Software Engineering"
          />
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
              className="form-input englishFont"
              accept="application/pdf"
              onChange={handleFileUpload}
              required
            />
            {isPdfUploaded ? (
              <img
                src={trueImage}
                width={"20px"}
                alt="success"
                className="absolute my-1"
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
              className="form-input textarea-content default-message englishFont"
              defaultValue={MESSAGE_CONTENT}
              dir="ltr"
            />
          </div>
          <button
            type="submit"
            className={`btn btn-block form-btn ${
              loading && "opacity-40 cursor-not-allowed"
            }`}
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
