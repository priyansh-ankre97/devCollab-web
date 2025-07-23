import React from "react";
import CustInput from "./CustInput";

const Form = ({
  fields = [],
  onSubmit,
  title,
  submitBtnLabel = title,
  error,
  helperText,
  onClickHelperText,
}) => {
  return (
    <div className="flex justify-center my-10">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          {fields?.map((field) => {
            const { label, placeholder, setValue, value } = field;
            return (
              <CustInput
                key={label}
                label={label}
                placeholder={placeholder}
                setValue={setValue}
                value={value}
              />
            );
          })}
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={onSubmit}>
              {submitBtnLabel}
            </button>
          </div>
          {helperText && (
            <p
              className="text-xs text-center py-2 cursor-pointer"
              onClick={onClickHelperText}
              role="button"
            >
              {helperText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
