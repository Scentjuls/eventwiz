import React from "react";
import classNames from "classnames";

type ButtonProps = {
  name: string;
  handleClick(): void;
  buttonClass: string;
  buttonType: "button" | "submit" | "reset" | undefined;
  form?: string;
  testId?: string;
};

export const Button = (props: ButtonProps) => {
  const { name, handleClick, buttonClass, buttonType, form, testId } = props;

  const buttonClasses = classNames(
    "focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded",
    {
      "bg-slate-500 hover:bg-slate-400": buttonClass === "close",
      "btn-background-red hover:bg-red-500": buttonClass === "delete",
      "btn-background-purple  hover:bg-purple-400": buttonClass === "normal",
    }
  );
  return (
    <button
      onClick={handleClick}
      className={buttonClasses}
      type={buttonType}
      form={form}
      data-testid={`delete-btn-${testId}`}
    >
      {name}
    </button>
  );
};
