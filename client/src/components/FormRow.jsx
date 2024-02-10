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
      <label htmlFor={name} className="form-label text-xl font-semibold">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ""}
        onChange={onChange}
        required
        disabled={isDisabled}
      />
    </div>
  );
};
export default FormRow;
