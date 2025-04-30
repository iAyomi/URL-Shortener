import classNames from "classnames";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
}

const backgroundColor = {
  button: "bg-gray-300 text-black",
  submit: "bg-blue-500 text-white",
  reset: null,
};

const Button = ({ type, children }: ButtonProps) => {
  return (
    <button
      type={type}
      className={classNames(
        "font-medium p-2 rounded cursor-pointer",
        backgroundColor[type]
      )}
    >
      {children}
    </button>
  );
};

export default Button;
