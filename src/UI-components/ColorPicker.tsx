import React, { useState, useEffect, useRef } from "react";

interface ColorPickerProps {
  id: string;
  label: string;
  required: boolean;
  options: string[];
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  options,
  onColorChange,
}) => {
  const [selectedColor, setSelectedColor] = useState(options[0]);
  const [containerVisible, setContainerVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onColorChange(color);
    setContainerVisible(false); // Close the color options div when a color is picked
  };

  const toggleContainer = () => {
    setContainerVisible((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setContainerVisible(false); // Close the color options div when clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline">
      <div
        className="p-2 inline-flex gap-1 shadow w-auto cursor-pointer justify-center items-center"
        onClick={toggleContainer}
      >
        <div
          className="color-container w-10 h-10 rounded-sm"
          style={{ backgroundColor: selectedColor }}
        ></div>
        <div className="dropdown-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${containerVisible ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {containerVisible && (
        <div
          className="absolute left-0 z-40 bg-white shadow-md flex top-10 rounded-md"
          ref={containerRef}
        >
          {options.map((color, index) => (
            <div
              key={index}
              className="p-1 m-1 rounded-full cursor-pointer"
              style={{
                backgroundColor: color,
                width: "40px",
                height: "40px",
              }}
              onClick={() => handleColorChange(color)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
