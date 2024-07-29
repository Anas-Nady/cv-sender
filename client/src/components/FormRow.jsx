const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  onChange,
  isDisabled,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="text-xl font-semibold form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input englishFont"
        defaultValue={defaultValue || ""}
        onChange={onChange}
        required
        disabled={isDisabled}
      />
    </div>
  );
};
export default FormRow;
