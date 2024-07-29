import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import { ImListNumbered } from "react-icons/im";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Company";
import InvoiceInfo from "./InvoiceInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useDispatch } from "react-redux";
import { deleteInvoice } from "../redux/actions/invoiceAction";
import { toast } from "react-toastify";
import { INVOICE_IS_DELETED } from "../constants/TOAST.JS";
import { SHOW, DELETE } from "../constants/PUBLIC_CONSTANTS";
day.extend(advancedFormat);

const Invoice = ({
  _id,
  invoiceNumber,
  customerName,
  customerEmail,
  packageType,
  createdAt,
}) => {
  const dispatch = useDispatch();
  const date = day(createdAt).format("MMM Do, YYYY");

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleDeleteInvoice = () => {
    dispatch(deleteInvoice(_id));
    toast.success(INVOICE_IS_DELETED);
  };

  return (
    <Wrapper dir="rtl" className="border border-slate-200">
      <header>
        <div className="info">
          <h5>{customerName}</h5>
          <p className="englishFont">{customerEmail}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center englishFont">
          <InvoiceInfo icon={<FaLocationArrow />} text={packageType} />
          <InvoiceInfo icon={<FaCalendarAlt />} text={date} />
          <InvoiceInfo
            icon={<ImListNumbered />}
            text={formatNumber(invoiceNumber)}
          />
        </div>
        <footer className="actions">
          <Link to={`../show-invoice/${_id}`} className="btn edit-btn">
            {SHOW}
          </Link>
          <button
            type="submit"
            className="btn delete-btn"
            onClick={handleDeleteInvoice}
          >
            {DELETE}
          </button>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Invoice;
