import React, { useState } from "react";
import dropdown from "../assets/icons/dropdownMenu.svg";

interface Option {
  value: string;
}

interface SelectProps {
  onSelectChange: (value: string) => void;
  field: {
    id: string;
    required: boolean;
    multiple: boolean;
    options: Option[];
  };
}

const Select: React.FC<SelectProps> = ({ field, onSelectChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = (option: Option) => {
    onSelectChange(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="w-full shadow p-4 rounded-md relative  z-10 appearance-none cursor-pointer"
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption : "Select an option"}
        {isOpen && (
          <div className="option-menu absolute bg-white w-full left-0 top-16 flex flex-col gap-2 px-4 py-2 rounded-md shadow">
            {field.options.map((option, index) => (
              <div
                key={index}
                className="w-full cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      <img
        src={dropdown}
        alt=""
        className="absolute top-6 right-3 z-20 pointer-events-none"
        style={isOpen ? { transform: "rotate(180deg)" } : undefined}
      />
    </div>
  );
};

export default Select;
