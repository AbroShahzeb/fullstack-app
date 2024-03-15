function InputError({ errors, fieldName }) {
  return (
    <>
      {errors[fieldName] && (
        <p className="text-sm text-red-500 font-normal">
          {errors[fieldName].message}
        </p>
      )}
    </>
  );
}

export default InputError;
