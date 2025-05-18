const Option = ({ id, name, onClick }: OptionProps) => {
  return (
    <span
      key={id}
      className="py-1 px-3 border-1 border-gray-600 rounded-md cursor-pointer"
      onClick={() => onClick(name.trim())}
    >
      {name.trim()}
    </span>
  );
};

export default Option;

interface OptionProps {
  id: string;
  name: string;
  onClick: (name: string) => void;
}
