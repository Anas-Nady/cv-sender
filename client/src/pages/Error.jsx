import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/imgs/not-found.svg";
import {
  NOT_FOUNDED,
  BACK_HOME,
  UNEXPECTED_ERROR,
} from "./../constants/ERROR.js";
import { Helmet } from "react-helmet";

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <Helmet>
          <title>{UNEXPECTED_ERROR}</title>
        </Helmet>
        <div>
          <img src={img} alt="not found" />
          <h3>{NOT_FOUNDED}</h3>
          <Link to="/">{BACK_HOME}</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>{UNEXPECTED_ERROR}</h3>
      </div>
    </Wrapper>
  );
};
export default Error;
