import { LABEL_TEXT, DEFAULT_OPTION } from "../constants/FORM_SELECT";

const FormSelect = ({ numberOfSteps, name }) => {
  let steps = numberOfSteps;

  function createNumberArray(steps) {
    return Array.from(Array(steps), (_, index) => index + 1);
  }

  const numberArray = createNumberArray(steps);
  const stepFromLocalStorage = JSON.parse(localStorage.getItem("step")) || 0;

  return (
    <div className="form-row">
      <label htmlFor="" className="form-label">
        {LABEL_TEXT}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue=""
        required
      >
        <option disabled value="">
          {DEFAULT_OPTION}
        </option>
        {numberArray.map((value, index) => (
          <option
            key={index}
            value={index}
            disabled={stepFromLocalStorage > index}
          >
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
