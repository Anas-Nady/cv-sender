import Wrapper from "../assets/wrappers/CompanyInfo";

const InvoiceInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="company-icon">{icon}</span>
      <span className="company-text">{text}</span>
    </Wrapper>
  );
};

export default InvoiceInfo;
