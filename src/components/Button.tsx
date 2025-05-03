import classNames from "classnames";

const backgroundColor = {
  button: "bg-gray-300 text-black",
  submit: "bg-blue-500 text-white",
  reset: null,
};

const Button = ({ type, onClick, children }: ButtonProps) => {
  return (
    <button
      type={type}
      className={classNames(
        "text-xs font-medium p-2 rounded cursor-pointer md:text-sm",
        backgroundColor[type]
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: (e: React.FormEvent) => void;
  children: React.ReactNode;
}
