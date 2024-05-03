import React, { useState } from "react";

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  error?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  disabled = false,
  indeterminate = false,
  error = false,
  onChange,
  label,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleChange = () => {
    if (!disabled) {
      setIsChecked(!isChecked);
    }
  };

  const renderIcon = () => {
    if (indeterminate) {
      return (
        <svg
          width="12"
          height="2"
          viewBox="0 0 12 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="12" height="2" rx="1" fill="white" />
        </svg>
      );
    }
    if (isChecked) {
      return (
        <svg
          width="11"
          height="10"
          viewBox="0 0 11 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.71996 5.00006C1.5323 4.8313 1.28778 4.73973 1.03543 4.74373C0.783082 4.74773 0.541579 4.84699 0.359365 5.02162C0.17715 5.19624 0.0677025 5.4333 0.0529749 5.68525C0.0382473 5.9372 0.119329 6.1854 0.279957 6.38006L2.49996 8.71006C2.5929 8.80756 2.70459 8.88528 2.82832 8.93855C2.95204 8.99182 3.08525 9.01955 3.21996 9.02006C3.35395 9.02084 3.48673 8.99469 3.61041 8.94315C3.7341 8.89162 3.84616 8.81575 3.93996 8.72006L10.72 1.72006C10.8119 1.62551 10.8843 1.51378 10.933 1.39124C10.9818 1.26871 11.0059 1.13778 11.004 1.00592C11.0022 0.874059 10.9744 0.743857 10.9222 0.622745C10.87 0.501634 10.7945 0.391986 10.7 0.300061C10.6054 0.208135 10.4937 0.135733 10.3711 0.0869889C10.2486 0.0382443 10.1177 0.0141116 9.98581 0.0159687C9.85396 0.0178259 9.72375 0.0456365 9.60264 0.0978126C9.48153 0.149989 9.37188 0.225509 9.27996 0.320061L3.22996 6.58006L1.71996 5.00006Z"
            fill="white"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <label
      className={`checkbox relative flex gap-1 ${disabled ? "disabled" : ""} ${
        error ? "error" : ""
      }`}
    >
      <span className="icon absolute top-[8px] left-[7px] z-50">
        {renderIcon()}
      </span>
      <input
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        className={`w-6 h-6 appearance-none focus:border-2 focus:border-gray border border-gray-s rounded-md ${
          isChecked
            ? "bg-primary hover:bg-hover border-none"
            : error
            ? "bg-red-100 hover:bg-red-200 border-red-300"
            : "hover:bg-gray-m"
        }`}
      />
      <span className="label">{label}</span>
    </label>
  );
};

export default Checkbox;
