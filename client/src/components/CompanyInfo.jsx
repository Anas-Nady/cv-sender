import Wrapper from "../assets/wrappers/CompanyInfo";

const CompanyInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="company-icon englishFont">{icon}</span>
      <span className="company-text englishFont">{text}</span>
    </Wrapper>
  );
};

export default CompanyInfo;
