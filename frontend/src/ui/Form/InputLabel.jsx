function InputLabel({ fieldName }) {
  return (
    <label htmlFor={fieldName} className="text-sm text-slate-500 font-normal">
      {fieldName !== "passwordConfirm"
        ? fieldName[0].toUpperCase() + fieldName.slice(1)
        : "Password Confirmation"}
    </label>
  );
}

export default InputLabel;
