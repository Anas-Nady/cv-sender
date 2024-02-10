import {
  DEFAULT_OPTION,
  ALL_COMPANIES,
  LIST_OF_PACKAGES,
  ALL_COMPANIES_VALUE,
  LIST_OF_VALUES,
} from "../constants/PUBLIC_CONSTANTS";

const FormRowSelect = ({ name, labelText, list, defaultValue, onChange }) => {
  let index = 0;

  const handleList = () => {
    const options = [];
    if (list) {
      options.push(
        <option key={ALL_COMPANIES} value={ALL_COMPANIES_VALUE}>
          {ALL_COMPANIES}
        </option>
      );
    }
    LIST_OF_VALUES.map((itemValue) => {
      options.push(
        <option key={itemValue} value={itemValue}>
          {LIST_OF_PACKAGES[index++]}
        </option>
      );
    });
    return options;
  };

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue || ""}
        onChange={onChange}
        required
      >
        <option disabled value="">
          {DEFAULT_OPTION}
        </option>
        {handleList()}
      </select>
    </div>
  );
};
export default FormRowSelect;
