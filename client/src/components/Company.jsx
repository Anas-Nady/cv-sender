import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Company";
import CompanyInfo from "./CompanyInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useDispatch } from "react-redux";
import { deleteCompany } from "../redux/actions/companyAction";
import { toast } from "react-toastify";
import { COMPANY_IS_DELETED } from "../constants/TOAST.JS";
import { EDIT, DELETE } from "../constants/PUBLIC_CONSTANTS";

day.extend(advancedFormat);

const company = ({ _id, name, email, category, createdAt }) => {
  const dispatch = useDispatch();
  const date = day(createdAt).format("MMM Do, YYYY");

  const handleDeleteCompany = () => {
    dispatch(deleteCompany(_id));
    toast.success(COMPANY_IS_DELETED);
  };

  return (
    <Wrapper dir="rtl" className="border border-gray-200">
      <header>
        <div className="info">
          <h5>{name}</h5>
          <p className="englishFont">{email}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <CompanyInfo icon={<FaLocationArrow />} text={category} />
          <CompanyInfo icon={<FaCalendarAlt />} text={date} />
        </div>
        <footer className="actions">
          <Link to={`../edit-company/${_id}`} className="btn edit-btn">
            {EDIT}
          </Link>
          <button
            type="submit"
            className="btn delete-btn"
            onClick={handleDeleteCompany}
          >
            {DELETE}
          </button>
        </footer>
      </div>
    </Wrapper>
  );
};

export default company;
