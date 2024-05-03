import React, { MouseEvent, ReactNode } from "react";

interface PrimaryButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  children,
  disabled,
}) => {
  return (
    <button
      className={`font-normal w-full  rounded-md px-[20px] py-[10px] text-base text-white font-bold py-2 px-4 rounded ${
        disabled
          ? "bg-disabled cursor-not-allowed"
          : "bg-primary active:bg-active hover:bg-hover "
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
