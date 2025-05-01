interface TypographyProps {
  children: React.ReactNode;
}

export const Header = ({ children }: TypographyProps) => {
  return <h1 className="text-xl font-extrabold md:text-3xl">{children}</h1>;
};

export const SubHeader = ({ children }: TypographyProps) => {
  return <h2 className="text-sm font-bold md:text-lg">{children}</h2>;
};

export const Text = ({ children }: TypographyProps) => {
  return <p className="text-sm md:text-normal">{children}</p>;
};

export const BorderedText = ({ children }: TypographyProps) => {
  return (
    <p className="p-2 border-2 border-gray-600 rounded-md text-xs md:text-sm">
      {children}
    </p>
  );
};
