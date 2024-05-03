import React, { MouseEvent, ReactNode } from "react";

interface SecondaryButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  disabled: boolean;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  onClick,
  children,
  disabled,
}) => {
  return (
    <button
      className={`font-normal w-full sm:w-auto rounded-md px-[20px] py-[10px] border border-primary active:border-active hover:border-hover text-base text-primary hover:text-hover font-bold py-2 px-4 rounded ${
        disabled ? "border-gray-300 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
