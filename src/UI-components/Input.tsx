import React, { useState } from "react";

interface InputProps {
  field: Field;
  setSubmitAction: (value: boolean) => void;
  submitAction: boolean;
  onInputChange: (value: string, error: boolean) => void;
  fillRequiredState: (id: string, value: boolean) => void;
}

interface Field {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  field,
  setSubmitAction,
  submitAction,
  onInputChange,
  fillRequiredState,
}) => {
  const {
    id,
    type,
    // label,
    required,
    placeholder,
    maxlength,
    minlength,
    pattern,
  } = field;
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // REQUIRE FILL LOGIC
    if (required) {
      fillRequiredState(id, value !== "" ? true : false);
    }
    setInputValue(value);

    let inputError = "";

    if (minlength && value.length < minlength) {
      inputError = `Input must be at least ${minlength} characters long.`;
    } else if (maxlength && value.length > maxlength) {
      inputError = `Input cannot exceed ${maxlength} characters.`;
    } else if (pattern) {
      const regex = new RegExp(pattern);
      const isValid = regex.test(value);

      if (!isValid) {
        inputError = `Please enter a valid password.\n It should be 8 to 50 characters long and contain at least one letter, one number, and one special character (!@#$%^&*()).
        `;
      }
    }

    setError(inputError);
    console.log(`${id} field error: `, error);
    const inputHasError = inputError !== "";
    onInputChange(value, inputHasError);
  };

  return (
    <div className="input-container relative">
      <input
        onFocus={() => setSubmitAction(false)}
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        maxLength={maxlength}
        minLength={minlength}
        pattern={pattern}
        value={inputValue}
        onChange={handleChange}
        className={`shadow p-4 w-full rounded-md ${
          error && submitAction ? "bg-red-girl" : ""
        }`}
        autoComplete="off"
      />
      {error && submitAction && (
        <div className="error-container max-w-56">
          <span className="error text-base text-red mt-1">{error}</span>
        </div>
      )}
      {inputValue.length > 0 && (
        <span className="placeholder absolute left-4 top-[6px] text-gray-s text-xs font-normal ">
          {placeholder}
        </span>
      )}
    </div>
  );
};

export default Input;
