export const Header = ({ children }: TypographyProps) => {
  return <h1 className="text-xl font-extrabold md:text-3xl">{children}</h1>;
};

export const SubHeader = ({ children }: TypographyProps) => {
  return <h2 className="w-fit text-sm font-bold md:text-lg">{children}</h2>;
};

export const Text = ({ children }: TypographyProps) => {
  return <p className="text-sm md:text-normal">{children}</p>;
};

export const BorderedText = ({ text }: { text: string }) => {
  return (
    <input
      type="text"
      readOnly
      value={text}
      className="w-[70%] p-2 border-2 border-gray-600 rounded-md text-xs cursor-pointer md:text-sm"
      title="Disabled Input"
    />
  );
};

interface TypographyProps {
  children: React.ReactNode;
}
